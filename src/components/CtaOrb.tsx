import React, { useState } from 'react';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SoundManager } from '../utils/SoundManager';

export const CtaOrb: React.FC = () => {
  const [successTriggered, setSuccessTriggered] = useState(false);

  const handleCtaClick = () => {
    if (successTriggered) return;
    
    // Tactile sound trigger (Law 6 click + arpeggio success)
    SoundManager.playClick();
    SoundManager.playSuccess();
    setSuccessTriggered(true);

    // Fire canvas-confetti (Awwwards wow moment!)
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF7A2F', '#FFB15C', '#E8E2DA']
    });

    setTimeout(() => {
      setSuccessTriggered(false);
    }, 4000);
  };

  const handleCtaHover = () => {
    SoundManager.playTick();
  };

  return (
    <section className="w-full bg-canvas-deep py-hero text-ink-light relative overflow-hidden flex flex-col justify-center items-center select-none min-h-[440px]">
      
      {/* 
        Huly Closing Orb:
        Luminous radial gradient orb of ~400px diameter over the deep-black floor.
        Creates visual depth and act as the epic final page beat.
      */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[480px] h-[320px] md:h-[480px] rounded-full bg-radial bg-gradient-to-b from-primary-amber/25 via-primary-soft/5 to-transparent blur-[80px] md:blur-[120px] pointer-events-none select-none animate-pulse-glow" />

      {/* Exposed HUD grid lines intersecting behind */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-lg md:px-xl relative z-10 flex flex-col items-center text-center gap-md max-w-[640px]">
        
        {/* Section eyebrow */}
        <div className="flex items-center justify-center gap-xs font-mono text-xs text-primary-amber uppercase">
          <Terminal className="h-4 w-4" />
          <span>[ System Closeout // Endpoint ]</span>
        </div>

        <h3 className="font-display font-extrabold text-[32px] sm:text-[40px] md:text-[56px] leading-[1.08] letter-spacing-[-0.025em] text-ink-light tracking-tighter">
          Join the precision era.
        </h3>

        <p className="font-sans text-[16px] md:text-[18px] font-normal leading-[1.55] text-ink-soft max-w-[480px]">
          Initialize your own diagnostic control deck. Map execution timelines, secure thread branches, and trace compiler metrics down to the microsecond.
        </p>

        {/* Closing primary CTA pill, floating in the center of the illuminated orb */}
        <div className="mt-sm relative group">
          <button
            onMouseEnter={handleCtaHover}
            onClick={handleCtaClick}
            disabled={successTriggered}
            className="relative z-10 flex h-[44px] items-center justify-center gap-xs px-lg rounded-full bg-canvas-pill text-primary-cocoa font-display font-bold text-[13px] tracking-button-track uppercase shadow-2xl active-press-trigger hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-amber cursor-pointer"
          >
            {successTriggered ? <Sparkles className="h-4 w-4 text-primary-amber" /> : <ArrowRight className="h-4 w-4" />}
            <span>{successTriggered ? 'Control Deck Active!' : 'Get Started For Free'}</span>
          </button>
        </div>

        {/* Small operational notice beneath */}
        <span className="font-mono text-[9px] text-ink-dim tracking-widest uppercase mt-xs select-none">
          SYSTEM_VERDICT: SECURE // NO_INSTRUMENTATION_OVERHEAD
        </span>

      </div>
    </section>
  );
};
