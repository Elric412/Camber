import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TelemetryStrip } from './components/TelemetryStrip';
import { BentoGrid } from './components/BentoGrid';
import { SVGSchematic } from './components/SVGSchematic';
import { GitHubSync } from './components/GitHubSync';
import { TimelineCollage } from './components/TimelineCollage';
import { SpeedComparison } from './components/SpeedComparison';
import { CtaOrb } from './components/CtaOrb';
import { SoundManager } from './utils/SoundManager';

// Register GSAP ScrollTrigger plugin (Law 6 & GSAP clean import rules)
gsap.registerPlugin(ScrollTrigger);

/* ui-components: Others/lenis — router=COMPONENTS-ROUTER §0, catalog=INDEX §5: Lenis scroll configuration with prefers-reduced-motion gating */

export const App: React.FC = () => {

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const lenis = new Lenis({
      duration: 1.2,
      lerp: isReduced ? 1.0 : 0.1, // reduced-motion: lerp 1 to disable smooth scrolling lags
      smoothWheel: !isReduced,
    });

    // One RAF owner loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Refresh ScrollTrigger after Lenis scroll events
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // 2. Setup GSAP ScrollTrigger fade-up transitions for Awwwards structural pacing
    const ctx = gsap.context(() => {
      const scrollElements = gsap.utils.toArray('.reveal-scroll-section') as HTMLElement[];
      scrollElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    // Cleanup scrolling references on unmount
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div id="main-content" className="w-full bg-canvas-dark text-ink-light overflow-x-hidden selection:bg-primary-amber selection:text-ink-light">
      
      {/* 1. Header (Navigation bar) */}
      <Header />

      {/* 2. Hero Deck & Terminal (Slice 1) */}
      <Hero />

      {/* 3. Telemetry HUD Strip */}
      <TelemetryStrip />

      {/* 
        Huly Cadence: Banded cadence.
        Bands alternate cleanly from Canvas Dark to Canvas Cream to Dark to Cream.
      */}
      
      {/* 4. Bento Grid (Cream band transition) */}
      <div className="reveal-scroll-section">
        <BentoGrid />
      </div>

      {/* 5. SVG Schematic Leader diagram (Cream band pacing) */}
      <div className="reveal-scroll-section">
        <SVGSchematic />
      </div>

      {/* 6. Dual-way GitHub Sync (Dark band transition) */}
      <div className="reveal-scroll-section">
        <GitHubSync />
      </div>

      {/* 7. MetaBrain Timeline Collage (Cream band transition) */}
      <div className="reveal-scroll-section">
        <TimelineCollage />
      </div>

      {/* 8. Telemetry Performance Metrics (Dark band transition) */}
      <div className="reveal-scroll-section">
        <SpeedComparison />
      </div>

      {/* 9. Closing Cta Orb Inviter (Canvas Deep true black floor) */}
      <CtaOrb />

      {/* 10. Footnote / Footer */}
      <footer className="w-full bg-canvas-dark border-t border-hairline-dark/60 py-xl select-none">
        <div className="mx-auto max-w-[1280px] px-lg md:px-xl flex flex-col md:flex-row items-center justify-between gap-md text-ink-mute font-mono text-[11px]">
          
          {/* Horizontal links divided by interpunct dots (Huly specs) */}
          <div className="flex flex-wrap items-center justify-center gap-sm">
            <span>Team Planner</span>
            <span className="text-primary-amber">•</span>
            <span>Project Management</span>
            <span className="text-primary-amber">•</span>
            <span>Virtual Office</span>
            <span className="text-primary-amber">•</span>
            <span>Chat</span>
            <span className="text-primary-amber">•</span>
            <span>Documents</span>
            <span className="text-primary-amber">•</span>
            <span>Inbox</span>
          </div>

          <div className="flex items-center gap-xs">
            <span>© 2026 CAMBER SYSTEMS INC.</span>
            <span className="text-primary-amber">•</span>
            <span>VERDICT: SECURE [v0.1.0]</span>
          </div>

        </div>
      </footer>

    </div>
  );
};
export default App;
