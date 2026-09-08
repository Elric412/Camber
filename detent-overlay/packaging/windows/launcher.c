// Detent Legacy's Windows console launcher.
//
// This process intentionally does not emulate a shell or proxy stdio. It starts
// the private CPython runtime in the same console with inherited handles, then
// returns the child's exit code. A kill-on-close Job Object owns the child tree
// so cancellation, launcher failure, and uninstall do not strand descendants.
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <wchar.h>

#define DETENT_MAX_PATH 32768
#define DETENT_REG_KEY L"Software\\DetentLegacy\\Install"

static BOOL WINAPI launcher_ctrl_handler(DWORD type) {
    if (type == CTRL_C_EVENT || type == CTRL_BREAK_EVENT) {
        return TRUE;
    }
    return FALSE;
}

static int fail_last_error(const wchar_t *message) {
    DWORD error = GetLastError();
    wchar_t *text = NULL;
    FormatMessageW(FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS,
        NULL, error, 0, (LPWSTR)&text, 0, NULL);
    fwprintf(stderr, L"detent-legacy: %ls (Windows error %lu%ls%ls)\n", message, error, text ? L": " : L"", text ? text : L"");
    if (text) LocalFree(text);
    return 1;
}

static BOOL parent_directory(wchar_t *path) {
    wchar_t *slash = wcsrchr(path, L'\\');
    if (!slash) return FALSE;
    *slash = L'\0';
    return TRUE;
}

static const wchar_t *module_for_launcher(const wchar_t *launcher) {
    const wchar_t *name = wcsrchr(launcher, L'\\');
    name = name ? name + 1 : launcher;
    if (_wcsicmp(name, L"detent-auth.exe") == 0) return L"detent.cli.auth_cmds";
    if (_wcsicmp(name, L"detent-acp.exe") == 0) return L"detent.acp";
    if (_wcsicmp(name, L"detent-mcp.exe") == 0) return L"detent.mcp";
    if (_wcsicmp(name, L"detent-remote.exe") == 0) return L"detent.remote";
    if (_wcsicmp(name, L"detent-plugins.exe") == 0) return L"detent.plugins";
    if (_wcsicmp(name, L"detent-share.exe") == 0) return L"detent.ecosystem";
    return L"detent";
}

static BOOL read_current_version(wchar_t *version, DWORD capacity) {
    HKEY key = NULL;
    if (RegOpenKeyExW(HKEY_CURRENT_USER, DETENT_REG_KEY, 0, KEY_READ, &key) != ERROR_SUCCESS) return FALSE;
    DWORD type = 0; DWORD bytes = capacity * sizeof(wchar_t);
    LONG result = RegQueryValueExW(key, L"CurrentVersion", NULL, &type, (LPBYTE)version, &bytes);
    RegCloseKey(key);
    if (result != ERROR_SUCCESS || (type != REG_SZ && type != REG_EXPAND_SZ)) return FALSE;
    version[capacity - 1] = L'\0';
    if (!version[0]) return FALSE;
    for (const wchar_t *p = version; *p; ++p) {
        if (*p == L'\\' || *p == L'/' || *p == L':' || *p == L'\r' || *p == L'\n') return FALSE;
        if (*p == L'.' && p[1] == L'.') return FALSE;
    }
    return TRUE;
}

static void set_default_joined_environment(const wchar_t *name, const wchar_t *base_name, const wchar_t *suffix) {
    if (GetEnvironmentVariableW(name, NULL, 0) != 0) return;
    DWORD needed = GetEnvironmentVariableW(base_name, NULL, 0);
    if (needed == 0) return;
    size_t suffix_length = wcslen(suffix);
    size_t capacity = (size_t)needed + suffix_length + 2;
    wchar_t *value = (wchar_t *)calloc(capacity, sizeof(wchar_t));
    if (!value) return;
    if (GetEnvironmentVariableW(base_name, value, needed + 1)) {
        size_t length = wcslen(value);
        if (length && value[length - 1] != L'\\') { value[length++] = L'\\'; value[length] = L'\0'; }
        wcscat_s(value, capacity, suffix);
        SetEnvironmentVariableW(name, value);
    }
    free(value);
}

typedef struct { wchar_t *data; size_t length; size_t capacity; } command_buffer;
static BOOL reserve(command_buffer *buffer, size_t extra) {
    size_t wanted = buffer->length + extra + 1;
    if (wanted <= buffer->capacity) return TRUE;
    size_t capacity = buffer->capacity ? buffer->capacity : 512;
    while (capacity < wanted) capacity *= 2;
    wchar_t *next = (wchar_t *)realloc(buffer->data, capacity * sizeof(wchar_t));
    if (!next) return FALSE;
    buffer->data = next; buffer->capacity = capacity; return TRUE;
}
static BOOL append_char(command_buffer *buffer, wchar_t value) {
    if (!reserve(buffer, 1)) return FALSE;
    buffer->data[buffer->length++] = value; buffer->data[buffer->length] = L'\0'; return TRUE;
}
static BOOL append_text(command_buffer *buffer, const wchar_t *value) {
    size_t count = wcslen(value); if (!reserve(buffer, count)) return FALSE;
    memcpy(buffer->data + buffer->length, value, count * sizeof(wchar_t)); buffer->length += count; buffer->data[buffer->length] = L'\0'; return TRUE;
}
static BOOL append_argument(command_buffer *buffer, const wchar_t *argument) {
    if (buffer->length && !append_char(buffer, L' ')) return FALSE;
    BOOL quote = argument[0] == L'\0' || wcspbrk(argument, L" \t\n\v\"") != NULL;
    if (!quote) return append_text(buffer, argument);
    if (!append_char(buffer, L'\"')) return FALSE;
    size_t slashes = 0;
    for (const wchar_t *p = argument;; ++p) {
        wchar_t ch = *p;
        if (ch == L'\\') { ++slashes; continue; }
        if (ch == L'\"') {
            for (size_t i = 0; i < slashes * 2 + 1; ++i) if (!append_char(buffer, L'\\')) return FALSE;
            if (!append_char(buffer, L'\"')) return FALSE; slashes = 0; continue;
        }
        if (ch == L'\0') { for (size_t i = 0; i < slashes * 2; ++i) if (!append_char(buffer, L'\\')) return FALSE; break; }
        for (size_t i = 0; i < slashes; ++i) if (!append_char(buffer, L'\\')) return FALSE;
        slashes = 0; if (!append_char(buffer, ch)) return FALSE;
    }
    return append_char(buffer, L'\"');
}
static HANDLE create_kill_on_close_job(void) {
    HANDLE job = CreateJobObjectW(NULL, NULL); if (!job) return NULL;
    JOBOBJECT_EXTENDED_LIMIT_INFORMATION limits; ZeroMemory(&limits, sizeof(limits));
    limits.BasicLimitInformation.LimitFlags = JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE;
    if (!SetInformationJobObject(job, JobObjectExtendedLimitInformation, &limits, sizeof(limits))) { CloseHandle(job); return NULL; }
    return job;
}

int wmain(int argc, wchar_t **argv) {
    wchar_t launcher[DETENT_MAX_PATH]; DWORD length = GetModuleFileNameW(NULL, launcher, DETENT_MAX_PATH);
    if (!length || length >= DETENT_MAX_PATH) return fail_last_error(L"cannot locate the Detent Legacy launcher");
    const wchar_t *module = module_for_launcher(launcher);
    wchar_t root[DETENT_MAX_PATH]; wcscpy_s(root, DETENT_MAX_PATH, launcher);
    if (!parent_directory(root) || !parent_directory(root)) { fwprintf(stderr, L"detent-legacy: invalid installation layout\n"); return 1; }
    wchar_t version[256] = {0};
    if (!read_current_version(version, 256)) { fwprintf(stderr, L"detent-legacy: installation metadata is missing; run DetentLegacy Setup again to repair the installation\n"); return 1; }
    wchar_t python[DETENT_MAX_PATH];
    if (swprintf_s(python, DETENT_MAX_PATH, L"%ls\\versions\\%ls\\runtime\\python.exe", root, version) < 0) { fwprintf(stderr, L"detent-legacy: installation path is too long\n"); return 1; }
    if (GetFileAttributesW(python) == INVALID_FILE_ATTRIBUTES) { fwprintf(stderr, L"detent-legacy: runtime %ls is missing; run DetentLegacy Setup again to repair the installation\n", version); return 1; }
    SetDefaultDllDirectories(LOAD_LIBRARY_SEARCH_SYSTEM32 | LOAD_LIBRARY_SEARCH_USER_DIRS);
    set_default_joined_environment(L"DETENT_HOME", L"APPDATA", L"DetentLegacy");
    set_default_joined_environment(L"DETENT_AUTH_FILE", L"APPDATA", L"DetentLegacy\\auth.json");
    set_default_joined_environment(L"DETENT_SECRET_FILE", L"APPDATA", L"DetentLegacy\\secrets.json");
    set_default_joined_environment(L"DETENT_MCP_AUTH_DIR", L"APPDATA", L"DetentLegacy\\mcp-auth");
    set_default_joined_environment(L"DETENT_DATA_HOME", L"LOCALAPPDATA", L"DetentLegacy\\data");
    set_default_joined_environment(L"DETENT_LOG_HOME", L"LOCALAPPDATA", L"DetentLegacy\\logs");
    set_default_joined_environment(L"DETENT_CACHE_HOME", L"LOCALAPPDATA", L"DetentLegacy\\cache");
    set_default_joined_environment(L"DETENT_STATE_HOME", L"LOCALAPPDATA", L"DetentLegacy\\state");
    SetEnvironmentVariableW(L"DETENT_INSTALL_ROOT", root); SetEnvironmentVariableW(L"DETENT_INSTALL_VERSION", version); SetEnvironmentVariableW(L"DETENT_DISTRIBUTION", L"windows-inno"); SetEnvironmentVariableW(L"DETENT_LAUNCHER", launcher);
    wchar_t pid[32]; swprintf_s(pid, 32, L"%lu", GetCurrentProcessId()); SetEnvironmentVariableW(L"DETENT_LAUNCHER_PID", pid);
    command_buffer command = {0};
    if (!append_argument(&command, python) || !append_argument(&command, L"-I") || !append_argument(&command, L"-B") || !append_argument(&command, L"-X") || !append_argument(&command, L"utf8") || !append_argument(&command, L"-m") || !append_argument(&command, module)) { free(command.data); return 1; }
    for (int i = 1; i < argc; ++i) if (!append_argument(&command, argv[i])) { free(command.data); return 1; }
    HANDLE job = create_kill_on_close_job(); if (!job) { free(command.data); return fail_last_error(L"cannot create the process job boundary"); }
    STARTUPINFOW startup = {0}; startup.cb = sizeof(startup); PROCESS_INFORMATION process = {0};
    BOOL created = CreateProcessW(python, command.data, NULL, NULL, TRUE, CREATE_SUSPENDED | CREATE_UNICODE_ENVIRONMENT, NULL, NULL, &startup, &process);
    free(command.data);
    if (!created) { CloseHandle(job); return fail_last_error(L"cannot start private Python runtime"); }
    if (!AssignProcessToJobObject(job, process.hProcess)) { TerminateProcess(process.hProcess, 1); CloseHandle(process.hThread); CloseHandle(process.hProcess); CloseHandle(job); return fail_last_error(L"cannot attach child process to job boundary"); }
    SetConsoleCtrlHandler(launcher_ctrl_handler, TRUE); ResumeThread(process.hThread); CloseHandle(process.hThread);
    WaitForSingleObject(process.hProcess, INFINITE); DWORD exit_code = 1; GetExitCodeProcess(process.hProcess, &exit_code); CloseHandle(process.hProcess); CloseHandle(job);
    return (int)exit_code;
}
