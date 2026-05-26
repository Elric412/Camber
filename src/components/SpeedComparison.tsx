import React from 'react';
import { Gauge, Check, BarChart2 } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

export const SpeedComparison: React.FC = () => {

  const handleBarHover = () => {
    SoundManager.playTick();
  };

  const handleBtnClick = () => {
    SoundManager.playClick();
  };

  return (
    <section className="w-full bg-canvas-dark py-section text-ink-light relative select-none">
      
      {/* 1px grid backdrop */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40" />

      <div className="mx-auto max-w-[1280px] px-lg md:px-xl relative z-10 flex flex-col gap-xl">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-md">
          <div className="flex flex-col items-start text-left gap-xs max-w-[580px]">
            <div className="font-mono text-xs text-primary-amber tracking-widest uppercase">
              [ 03 / BENCHMARK COMPARISON ]
            </div>
            <h3 className="font-display font-extrabold text-[36px] sm:text-[48px] md:text-[56px] leading-[1.08] letter-spacing-[-0.025em] text-ink-light tracking-tighter">
              Telemetry speed limits.
            </h3>
            <p className="font-sans text-[16px] md:text-[18px] font-normal leading-[1.55] text-ink-soft">
              Camber traces path compilation, thread locks, and heap mutations with zero instrumentation overhead, maintaining near-zero runtime latency.
            </p>
          </div>

          <button
            onClick={handleBtnClick}
            className="flex h-11 items-center justify-center gap-xs px-lg rounded-full bg-surface-elevatedDark text-ink-light font-semibold hover:bg-surface-cardDark border border-hairline-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-amber active-press-trigger transition-colors"
          >
            <Gauge className="h-4 w-4 text-primary-amber" />
            <span>Verify Benchmarks</span>
          </button>
        </div>

        {/* Telemetry Charts & Data Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg mt-sm">
          
          {/* Left Column: Progress comparison charts */}
          <div className="lg:col-span-7 p-xl rounded-lg bg-surface-cardDark border border-hairline-dark flex flex-col gap-lg text-left">
            <div className="flex items-center gap-xs font-mono text-[11px] text-ink-mute uppercase border-b border-hairline-dark/60 pb-sm select-none">
              <BarChart2 className="h-4 w-4 text-primary-amber" />
              <span>Diagnostic Latency Sweep (Lower is Better)</span>
            </div>

            {/* Chart Rows */}
            <div className="space-y-base">
              
              {/* Camber */}
              <div 
                onMouseEnter={handleBarHover}
                className="flex flex-col gap-xs cursor-pointer group"
              >
                <div className="flex justify-between items-center text-[13px] font-mono select-none">
                  <span className="text-ink-light font-semibold">Camber Telemetry Engine</span>
                  <span className="text-primary-amber font-bold font-variant-numeric: tabular-nums">1.84ms</span>
                </div>
                <div className="w-full h-8 bg-canvas-dark rounded-md border border-hairline-dark overflow-hidden p-[3px]">
                  {/* Progress fill reskinned to warm amber bloom color */}
                  <div className="h-full bg-gradient-to-r from-primary-amber via-primary-soft to-primary-glow rounded-[4px] w-[12%] group-hover:scale-x-105 origin-left transition-transform duration-200" />
                </div>
              </div>

              {/* Competitor A */}
              <div 
                onMouseEnter={handleBarHover}
                className="flex flex-col gap-xs cursor-pointer group"
              >
                <div className="flex justify-between items-center text-[13px] font-mono select-none">
                  <span className="text-ink-mute font-semibold">Generic B2B Debugger</span>
                  <span className="text-ink-soft font-bold font-variant-numeric: tabular-nums">48.20ms</span>
                </div>
                <div className="w-full h-8 bg-canvas-dark rounded-md border border-hairline-dark overflow-hidden p-[3px]">
                  <div className="h-full bg-surface-elevatedDark rounded-[4px] w-[56%] transition-transform duration-200" />
                </div>
              </div>

              {/* Competitor B */}
              <div 
                onMouseEnter={handleBarHover}
                className="flex flex-col gap-xs cursor-pointer group"
              >
                <div className="flex justify-between items-center text-[13px] font-mono select-none">
                  <span className="text-ink-mute font-semibold">Standard Print Logging</span>
                  <span className="text-ink-soft font-bold font-variant-numeric: tabular-nums">124.50ms</span>
                </div>
                <div className="w-full h-8 bg-canvas-dark rounded-md border border-hairline-dark overflow-hidden p-[3px]">
                  <div className="h-full bg-surface-elevatedDark rounded-[4px] w-[95%] transition-transform duration-200" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Comparative telemetry cards */}
          <div className="lg:col-span-5 flex flex-col gap-md text-left justify-between">
            {[
              { title: 'Zero Overhead', desc: 'No compiler wrapper or agent injection. Camber runs directly on VM bytecode with trace compilation scopes.' },
              { title: 'Deterministic Traversal', desc: 'Thread executions are traced deterministically. Replay anomalous logs frame-by-frame with absolute timing parity.' }
            ].map((item) => (
              <div key={item.title} className="p-xl rounded-lg bg-surface-cardDark border border-hairline-dark flex flex-col gap-xs">
                <div className="flex items-center gap-xs font-mono text-[11px] text-primary-amber uppercase select-none">
                  <Check className="h-4 w-4" />
                  <span>[ Verification Check ]</span>
                </div>
                <h4 className="font-display font-bold text-[18px] text-ink-light tracking-tight mt-xxs">
                  {item.title}
                </h4>
                <p className="font-sans text-[14px] text-ink-soft leading-[1.5]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
