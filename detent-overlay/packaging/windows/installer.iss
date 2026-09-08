#ifndef MyAppVersion
  #error MyAppVersion must be supplied
#endif
#ifndef MyNumericVersion
  #define MyNumericVersion "0.0.0.0"
#endif
#ifndef PayloadDir
  #error PayloadDir must be supplied
#endif
#ifndef OutputDir
  #define OutputDir "."
#endif
#define MyAppName "Detent Legacy"
#define MyPublisher "Detent"
#define MyAppId "{{C492BC37-0F1A-4CE2-BCB7-3F72A6D16F50}"
[Setup]
AppId={#MyAppId}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyPublisher}
DefaultDirName={localappdata}\DetentLegacy\app
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
MinVersion=10.0.17763
OutputDir={#OutputDir}
OutputBaseFilename=DetentLegacy-Setup-{#MyAppVersion}-x64
Compression=lzma2/ultra64
SolidCompression=yes
WizardStyle=modern
UninstallDisplayName=Detent Legacy
UninstallDisplayIcon={app}\bin\detent-legacy.exe
VersionInfoVersion={#MyNumericVersion}
VersionInfoCompany={#MyPublisher}
VersionInfoDescription=Detent Legacy Windows Installer
VersionInfoProductName={#MyAppName}
VersionInfoProductVersion={#MyAppVersion}
ChangesEnvironment=yes
CloseApplications=yes
RestartApplications=no
UsePreviousAppDir=yes
SetupLogging=yes
[Files]
Source: "{#PayloadDir}\bin\*.exe"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "{#PayloadDir}\versions\{#MyAppVersion}\*"; DestDir: "{app}\versions\{#MyAppVersion}"; Flags: ignoreversion recursesubdirs createallsubdirs
[Dirs]
Name: "{userappdata}\DetentLegacy"; Flags: uninsneveruninstall
Name: "{localappdata}\DetentLegacy\data"; Flags: uninsneveruninstall
Name: "{localappdata}\DetentLegacy\logs"; Flags: uninsneveruninstall
Name: "{localappdata}\DetentLegacy\cache"; Flags: uninsneveruninstall
Name: "{localappdata}\DetentLegacy\state"; Flags: uninsneveruninstall
[Registry]
Root: HKCU; Subkey: "Software\DetentLegacy\Install"; ValueType: string; ValueName: "InstallRoot"; ValueData: "{app}"; Flags: uninsdeletevalue uninsdeletekeyifempty
Root: HKCU; Subkey: "Software\DetentLegacy\Install"; ValueType: string; ValueName: "CurrentVersion"; ValueData: "{#MyAppVersion}"; Flags: uninsdeletevalue uninsdeletekeyifempty
[UninstallDelete]
Type: filesandordirs; Name: "{app}\versions"
Type: filesandordirs; Name: "{app}\bin"
Type: filesandordirs; Name: "{localappdata}\DetentLegacy\updates"
Type: dirifempty; Name: "{app}"
[Code]
function StripQuotesAndSlash(Value: String): String;
begin
  Result := Trim(Value);
  if (Length(Result) >= 2) and (Result[1] = '"') and (Result[Length(Result)] = '"') then Result := Copy(Result, 2, Length(Result) - 2);
  while (Length(Result) > 3) and ((Result[Length(Result)] = '\') or (Result[Length(Result)] = '/')) do Delete(Result, Length(Result), 1);
end;
function PathsEqual(Left, Right: String): Boolean;
begin Result := CompareText(StripQuotesAndSlash(Left), StripQuotesAndSlash(Right)) = 0; end;
function RebuildPath(ExistingPath, OwnedPath: String; AddOwned: Boolean): String;
var Remaining, Item, Cleaned: String; Separator: Integer;
begin
  Result := ''; Remaining := ExistingPath;
  while Length(Remaining) > 0 do begin
    Separator := Pos(';', Remaining);
    if Separator = 0 then begin Item := Remaining; Remaining := ''; end else begin Item := Copy(Remaining, 1, Separator - 1); Delete(Remaining, 1, Separator); end;
    Cleaned := Trim(Item);
    if (Cleaned <> '') and (not PathsEqual(Cleaned, OwnedPath)) then begin if Result <> '' then Result := Result + ';'; Result := Result + Cleaned; end;
  end;
  if AddOwned then begin if Result = '' then Result := OwnedPath else Result := OwnedPath + ';' + Result; end;
end;
procedure SetOwnedUserPath(AddOwned: Boolean);
var ExistingPath, NewPath, OwnedPath: String;
begin
  OwnedPath := ExpandConstant('{app}\bin');
  if not RegQueryStringValue(HKCU, 'Environment', 'Path', ExistingPath) then ExistingPath := '';
  NewPath := RebuildPath(ExistingPath, OwnedPath, AddOwned);
  if NewPath <> ExistingPath then RegWriteExpandStringValue(HKCU, 'Environment', 'Path', NewPath);
end;
procedure CurStepChanged(CurStep: TSetupStep);
begin if CurStep = ssPostInstall then SetOwnedUserPath(True); end;
procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
var RemoveData: Integer;
begin
  if CurUninstallStep = usUninstall then begin
    SetOwnedUserPath(False);
    if not UninstallSilent then begin
      RemoveData := SuppressibleMsgBox('Remove Detent Legacy settings, cache, logs, and local data too?' + #13#10 + #13#10 + 'Choosing No keeps your configuration and local data. User projects are never removed.', mbConfirmation, MB_YESNO, IDNO);
      if RemoveData = IDYES then begin
        DelTree(ExpandConstant('{userappdata}\DetentLegacy'), True, True, True);
        DelTree(ExpandConstant('{localappdata}\DetentLegacy\data'), True, True, True);
        DelTree(ExpandConstant('{localappdata}\DetentLegacy\logs'), True, True, True);
        DelTree(ExpandConstant('{localappdata}\DetentLegacy\cache'), True, True, True);
        DelTree(ExpandConstant('{localappdata}\DetentLegacy\state'), True, True, True);
      end;
    end;
  end;
end;
