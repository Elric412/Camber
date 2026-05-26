import React, { useState } from 'react';
import { Terminal, Github, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

/* ui-components: shadcn/navigation-menu — router=COMPONENTS-ROUTER §1, catalog=INDEX §5b.i: custom header navigation */

export const Header: React.FC = () => {
  const [isMuted, setIsMuted] = useState(SoundManager.getMuteStatus());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMuteToggle = () => {
    const status = SoundManager.toggleMute();
    setIsMuted(status);
    if (!status) {
      SoundManager.playClick();
    }
  };

  const handleNavInteraction = () => {
    SoundManager.playTick();
  };

  const handleBtnInteraction = () => {
    SoundManager.playClick();
  };

  return (
    <header className="sticky top-0 z-50 w-full h-[72px] border-b border-hairline-dark/60 glass-nav-blur transition-all duration-300 shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-lg md:px-xl">
        
        {/* Left: Brand Identity */}
        <a 
          href="#" 
          onClick={handleBtnInteraction}
          className="flex items-center gap-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-amber rounded-sm active-press-trigger"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-md border border-hairline-dark bg-surface-cardDark">
            <Terminal className="h-4 w-4 text-primary-amber" />
            <div className="absolute -top-[2px] -right-[2px] h-[6px] w-[6px] bg-primary-amber rounded-full led-indicator-pulse shadow-[0_0_8px_var(--color-primary-amber)]" />
          </div>
          <span className="font-display font-extrabold text-[18px] tracking-tight text-ink-light">
            Camber
          </span>
        </a>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-md">
          {['Telemetry', 'Diagnostics', 'Integrations', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onMouseEnter={handleNavInteraction}
              onClick={handleNavInteraction}
              className="text-nav-link text-[14px] font-medium text-ink-soft hover:text-ink-light transition-colors relative py-xs px-sm rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-amber"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-base">
          {/* Mute/Sound Toggle Controller */}
          <button
            onClick={handleMuteToggle}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline-dark text-ink-soft hover:text-ink-light hover:bg-surface-elevatedDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-amber active-press-trigger"
            aria-label={isMuted ? "Unmute interface sound" : "Mute interface sound"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* GitHub Star Pill */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleNavInteraction}
            onClick={handleBtnInteraction}
            className="flex h-8 items-center gap-xs px-sm rounded-full border border-hairline-dark bg-canvas-dark text-ink-light text-[13px] font-semibold hover:bg-surface-elevatedDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-amber active-press-trigger transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            <span>Star Us</span>
            <span className="text-[11px] font-medium text-primary-amber">4.8k</span>
          </a>

          {/* Huly Sign In / Sign Up CTAs */}
          <a
            href="#signin"
            onClick={handleBtnInteraction}
            className="text-[14px] font-semibold text-ink-light hover:text-ink-soft transition-colors px-sm py-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-amber"
          >
            Sign in
          </a>
          
          <a
            href="#signup"
            onClick={handleBtnInteraction}
            className="flex h-8 items-center justify-center px-base rounded-full bg-surface-elevatedDark text-ink-light text-[14px] font-semibold hover:bg-surface-cardDark border border-hairline-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-amber active-press-trigger transition-colors"
          >
            Sign up
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-sm">
          <button
            onClick={handleMuteToggle}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline-dark text-ink-soft active-press-trigger"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <button
            onClick={() => {
              SoundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline-dark text-ink-soft active-press-trigger"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-canvas-dark border-b border-hairline-dark flex flex-col px-lg py-lg gap-md md:hidden shadow-lg animate-fade-in z-40">
          {['Telemetry', 'Diagnostics', 'Integrations', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => {
                SoundManager.playTick();
                setMobileMenuOpen(false);
              }}
              className="text-[16px] font-medium text-ink-soft hover:text-ink-light py-xs border-b border-hairline-dark/50"
            >
              {item}
            </a>
          ))}
          <div className="flex flex-col gap-sm pt-sm">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => SoundManager.playClick()}
              className="flex h-10 items-center justify-center gap-xs rounded-full border border-hairline-dark text-ink-light text-[14px] font-semibold"
            >
              <Github className="h-4 w-4" />
              <span>Star Us on GitHub</span>
            </a>
            <div className="flex gap-sm mt-xs">
              <a
                href="#signin"
                onClick={() => SoundManager.playClick()}
                className="flex-1 flex h-10 items-center justify-center rounded-full border border-hairline-dark text-ink-light text-[14px] font-semibold"
              >
                Sign in
              </a>
              <a
                href="#signup"
                onClick={() => SoundManager.playClick()}
                className="flex-1 flex h-10 items-center justify-center rounded-full bg-surface-elevatedDark text-ink-light text-[14px] font-semibold border border-hairline-dark"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
