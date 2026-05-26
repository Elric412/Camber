import React, { useState } from 'react';
import { Play, Terminal, Cpu, ChevronRight, Activity, Zap } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

/* ui-components: 21st-dev/Get Started — router=COMPONENTS-ROUTER §3, catalog=INDEX §3: hero CTA pill reskinned to Huly tokens */

export const Hero: React.FC = () => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '// CAMBER DIAGNOSTIC SUBSTRATE INITIALIZED',
    '// ESTABLISHING CONNECTION TO PROCESS FLOW: 0x8F93-λ',
    '// HEURISTICS: ACTIVE PATH TRACING'
  ]);
  const [isCompiling, setIsCompiling] = useState(false);

  const triggerDiagnostic = () => {
    if (isCompiling) return;
    
    // Tactile sound cues (Law 6 click + success)
    SoundManager.playClick();
    setIsCompiling(true);
    
    setTerminalOutput(prev => [...prev, '>> INITIALIZING TELEMETRY SWEEP...']);
    
    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev,
        '>> SCANNING STACK FRAMES... [OK]',
        '>> THREAD DENSITY ANALYSIS: 14 ACTIVE CHANNELS',
        '>> ERROR TOLERANCE LIMITS: 0.002% [NOMINAL]'
      ]);
      SoundManager.playTick();
    }, 800);

    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev,
        '>> STATE RESOLVED: ZERO ANOMALIES DETECTED.',
        '// PROCESS COMPLETED IN 1.84ms'
      ]);
      SoundManager.playSuccess();
      setIsCompiling(false);
    }, 1800);
  };

  return (
    <section id="telemetry" className="relative w-full bg-canvas-dark pt-hero pb-section overflow-hidden">
      
      {/* Exposed HUD Corner Crosshair Markers */}
      <div className="absolute top-8 left-8 text-ink-dim font-mono text-[10px] select-none tracking-widest hidden lg:block">
        + SYS_COORD: 40.7128° N, 74.0060° W
      </div>
      <div className="absolute top-8 right-8 text-ink-dim font-mono text-[10px] select-none tracking-widest hidden lg:block">
        NEXUS_FEED: ACTIVE [TOLERANCE 99.998%]
      </div>

      <div className="mx-auto max-w-[1280px] px-lg md:px-xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
        
        {/* Left Column: Heading, Subhead, and Huly Amber CTA */}
        <div className="lg:col-span-6 flex flex-col items-start text-left gap-md">
          {/* Section Numeral Label */}
          <div className="font-mono text-xs text-primary-amber tracking-widest uppercase">
            [ 01 / CODE TELEMETRY DECK ]
          </div>

          <h1 className="font-display font-extrabold text-[44px] sm:text-[56px] md:text-[72px] leading-[1.05] letter-spacing-[-0.025em] text-ink-light tracking-tighter max-w-[580px]">
            The debugger is now a control deck.
          </h1>

          <p className="font-sans text-[16px] md:text-[18px] font-normal leading-[1.55] text-ink-soft max-w-[480px]">
            Camber is an engineered diagnostic deck that traces active execution paths and streams real-time code telemetry down to the microsecond. Remediate anomalous states before they manifest.
          </p>

          {/* CTA & Glow Layer Group */}
          <div className="relative flex flex-col sm:flex-row items-center gap-base mt-sm w-full sm:w-auto">
            {/* 
              Huly signature bloom: horizontal radial amber lens-flare behind the CTA.
              Does not fill the button; floats as a light source.
            */}
            <div className="absolute -inset-8 bg-gradient-to-r from-primary-amber/30 via-primary-soft/10 to-transparent blur-[60px] rounded-full w-[280px] h-[80px] pointer-events-none select-none" />
            
            <button
              onClick={triggerDiagnostic}
              disabled={isCompiling}
              className="relative z-10 flex h-11 items-center justify-center gap-xs px-lg rounded-full bg-canvas-pill text-primary-cocoa font-display font-bold text-[13px] tracking-button-track uppercase shadow-lg active-press-trigger hover:brightness-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber w-full sm:w-auto"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{isCompiling ? 'Running Diagnostics...' : 'Initialize Terminal'}</span>
            </button>

            <a
              href="#diagnostics"
              onMouseEnter={() => SoundManager.playTick()}
              onClick={() => SoundManager.playClick()}
              className="relative z-10 flex h-11 items-center justify-center gap-xs px-base rounded-full border border-hairline-dark bg-surface-elevatedDark text-ink-light text-[14px] font-semibold hover:bg-surface-cardDark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-amber active-press-trigger transition-colors w-full sm:w-auto"
            >
              <span>Explore Features</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right Column: High-Fidelity CLI Terminal Debugger Mockup */}
        <div className="lg:col-span-6 w-full relative">
          
          {/* Amber Ambient Flare backing the terminal Mockup */}
          <div className="absolute -inset-16 bg-gradient-to-tr from-primary-amber/15 via-transparent to-transparent blur-[100px] rounded-full pointer-events-none" />

          {/* Terminal Mockup Frame (16px radius, hairline dark border) */}
          <div className="relative w-full rounded-lg border border-hairline-dark bg-surface-cardDark shadow-2xl overflow-hidden">
            
            {/* Terminal Header */}
            <div className="flex h-11 items-center justify-between border-b border-hairline-dark bg-canvas-dark px-base select-none">
              <div className="flex items-center gap-xs">
                {/* Visual indicator dots (no fake browser slop, styled container points) */}
                <div className="h-2 w-2 rounded-full bg-ink-dim" />
                <span className="font-mono text-[11px] font-medium text-ink-mute tracking-wider uppercase">
                  camber_terminal_v0.1.0
                </span>
              </div>
              <div className="flex items-center gap-sm">
                <div className="flex items-center gap-xs font-mono text-[11px] text-ink-mute">
                  <Activity className="h-3 w-3 text-primary-amber animate-pulse" />
                  <span className="font-variant-numeric: tabular-nums">LATENCY: 1.84ms</span>
                </div>
              </div>
            </div>

            {/* Terminal CLI Screen */}
            <div className="p-base font-mono text-[13px] leading-[1.55] text-ink-soft h-[240px] overflow-y-auto bg-canvas-deep bg-dot-grid flex flex-col justify-between">
              
              {/* Output log */}
              <div className="space-y-xxs text-left">
                {terminalOutput.map((line, idx) => (
                  <div key={idx} className={line.startsWith('>>') ? 'text-ink-light font-semibold' : line.startsWith('//') ? 'text-ink-dim' : 'text-primary-soft'}>
                    {line}
                  </div>
                ))}
                {isCompiling && (
                  <div className="text-primary-amber animate-pulse">
                    &gt;&gt; RESOLVING STATES...
                  </div>
                )}
              </div>

              {/* Cursor Command Input bar */}
              <div className="flex items-center gap-xs border-t border-hairline-dark/40 pt-sm mt-sm">
                <span className="text-primary-amber font-semibold">&gt;</span>
                <input
                  type="text"
                  readOnly
                  placeholder="Click 'Initialize Terminal' above to execute diagnostic sequence..."
                  className="bg-transparent text-ink-light placeholder-ink-dim w-full focus:outline-none text-[12px]"
                />
                <div className="h-3.5 w-2 bg-primary-amber animate-pulse" />
              </div>
            </div>
          </div>

          {/* HUD Corner Frames `⌐` and Ticker tape overlays */}
          <div className="absolute -top-3 -left-3 text-ink-dim font-extralight text-[16px] select-none pointer-events-none">⌐</div>
          <div className="absolute -top-3 -right-3 text-ink-dim font-extralight text-[16px] select-none pointer-events-none">¬</div>
          <div className="absolute -bottom-3 -left-3 text-ink-dim font-extralight text-[16px] select-none pointer-events-none">L</div>
          <div className="absolute -bottom-3 -right-3 text-ink-dim font-extralight text-[16px] select-none pointer-events-none">⏌</div>
        </div>

      </div>
    </section>
  );
};
