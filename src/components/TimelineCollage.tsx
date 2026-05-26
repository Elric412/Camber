import React from 'react';
import { Calendar, FileText, CheckCircle, Lightbulb, HelpCircle } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

export const TimelineCollage: React.FC = () => {

  const handleInteractiveClick = () => {
    SoundManager.playClick();
  };

  const handleMouseEnter = () => {
    SoundManager.playTick();
  };

  return (
    <section className="w-full bg-canvas-cream py-section text-ink-dark relative overflow-hidden select-none">
      
      {/* Structural Variety backdrop annotations */}
      <div className="absolute top-4 left-8 text-ink-mutedLight font-mono text-[10px] tracking-widest hidden md:block">
        COLLAGE_METRIC: ASYMMETRIC_GRID // CONSTELLATION_v0.1
      </div>

      <div className="mx-auto max-w-[1280px] px-lg md:px-xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
          
          {/* Left Column: Asymmetric Constellation Collage */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-base relative">
            
            {/* 1. Dark Date Badge (56x56px, rounded-md, surface-card-dark) */}
            <div 
              onMouseEnter={handleMouseEnter}
              onClick={handleInteractiveClick}
              className="col-span-4 flex flex-col justify-center items-center p-sm rounded-md bg-surface-cardDark text-ink-light border border-hairline-dark cursor-pointer select-none active-press-trigger"
            >
              <Calendar className="h-4 w-4 text-primary-amber mb-xs" />
              <span className="font-mono font-extrabold text-[28px] leading-none font-variant-numeric: tabular-nums">08</span>
              <span className="font-mono text-[10px] text-ink-mute uppercase tracking-widest mt-xxs">MAY</span>
            </div>

            {/* 2. Document Mockup Card (Canvas Paper #FAF9F7, rounded-lg, 24px padding) */}
            <div 
              onMouseEnter={handleMouseEnter}
              onClick={handleInteractiveClick}
              className="col-span-8 p-base rounded-lg bg-canvas-paper border border-hairline-light shadow-sm text-left cursor-pointer active-press-trigger"
            >
              <div className="flex items-center gap-xs border-b border-hairline-light pb-xs mb-sm">
                <FileText className="h-4 w-4 text-primary-amber" />
                <span className="font-mono text-[10px] text-ink-mutedLight uppercase">camber_analysis_report.pdf</span>
              </div>
              <p className="font-sans text-[13px] text-ink-body leading-relaxed font-semibold">
                Anomalous state resolved at frame scope #1804. Thread pool allocation aligned within nominal diagnostic limits.
              </p>
            </div>

            {/* 
              3. Yellow Sticky Note (Scoped Yellow Accent #F5C84C, rounded-md, 16px padding)
              This yellow accent is strictly scoped to this section as a single-moment note.
            */}
            <div 
              onMouseEnter={handleMouseEnter}
              onClick={handleInteractiveClick}
              className="col-span-12 md:col-span-6 p-base rounded-md bg-accent-yellow border border-accent-yellow/40 text-ink-dark text-left shadow-sm cursor-pointer select-none active-press-trigger"
            >
              <div className="flex items-center gap-xs border-b border-ink-dark/15 pb-xs mb-xs font-mono text-[10px] font-bold text-ink-dark/60">
                <Lightbulb className="h-4 w-4" />
                <span>OPERATOR MEMO:</span>
              </div>
              <p className="font-mono text-[12px] leading-relaxed font-semibold">
                * CRITICAL: Thread sync pool latency is capped under 2.0ms. Re-route delta tracing if limits exceed.
              </p>
            </div>

            {/* 4. Mini UI Stat Badge */}
            <div 
              onMouseEnter={handleMouseEnter}
              onClick={handleInteractiveClick}
              className="col-span-12 md:col-span-6 p-base rounded-lg bg-surface-cardDark text-ink-light border border-hairline-dark text-left flex items-center justify-between cursor-pointer active-press-trigger"
            >
              <div className="flex flex-col gap-xxs font-mono">
                <span className="text-[9px] text-ink-mute uppercase">SYNC VERDICT:</span>
                <span className="text-[14px] font-extrabold text-ink-light uppercase">SUCCESSFUL</span>
              </div>
              <CheckCircle className="h-5 w-5 text-status-done" />
            </div>

          </div>

          {/* Right Column: Narrative Descriptions */}
          <div className="lg:col-span-5 flex flex-col items-start text-left gap-md">
            
            <div className="flex items-center gap-xs text-primary-amber font-mono text-xs uppercase">
              <HelpCircle className="h-4 w-4" />
              <span>[ MetaBrain Timeline ]</span>
            </div>

            <h3 className="font-display font-extrabold text-[36px] sm:text-[48px] md:text-[56px] leading-[1.08] letter-spacing-[-0.025em] text-ink-dark tracking-tighter">
              Knowledge at your fingertips.
            </h3>

            <p className="font-sans text-[16px] md:text-[18px] font-normal leading-[1.55] text-ink-body">
              Map and archive every execution session automatically. Maintain a historical audit timeline of thread deltas, heap scopes, and operator annotations inside a single unified knowledge base.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
