import React from 'react';
import { Keyboard, Layers, Cpu, Eye, Check } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

/* ui-components: Magic UI/bento-grid — router=COMPONENTS-ROUTER §1, catalog=INDEX §6: bento composition with Huly and Industrial reskinning */

export const BentoGrid: React.FC = () => {

  const handleCardHover = () => {
    SoundManager.playTick();
  };

  const handleInteraction = () => {
    SoundManager.playClick();
  };

  return (
    <section className="w-full bg-canvas-cream py-section text-ink-dark relative">
      
      {/* HUD Edge Label and Annotations */}
      <div className="absolute top-4 left-8 text-ink-mutedLight font-mono text-[10px] tracking-widest hidden md:block">
        GRID_METRIC: DENSITY_FACTOR // LEVEL_03
      </div>

      <div className="mx-auto max-w-[1280px] px-lg md:px-xl flex flex-col gap-xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-start text-left gap-xs max-w-[580px]">
          <div className="font-mono text-xs text-primary-amber tracking-widest uppercase">
            [ 02 / ANALYSIS INFRASTRUCTURE ]
          </div>
          <h2 className="font-display font-extrabold text-[36px] sm:text-[48px] md:text-[56px] leading-[1.08] letter-spacing-[-0.025em] text-ink-dark tracking-tighter">
            Unmatched productivity. Made tactical.
          </h2>
          <p className="font-sans text-[16px] md:text-[18px] font-normal leading-[1.6] text-ink-body mt-xs">
            Every panel in Camber acts as a dedicated modular cockpit tool, designed to let you observe complex execution timelines with absolute clarity and control.
          </p>
        </div>

        {/* Asymmetric Bento Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg mt-sm">
          
          {/* Card 1: Wide Layout (Keyboard Shortcut Map) */}
          <div 
            onMouseEnter={handleCardHover}
            className="md:col-span-8 flex flex-col justify-between rounded-xl bg-surface-cardDark bg-hatch-pattern text-ink-light p-xl border border-hairline-dark relative overflow-hidden transition-all duration-300 hover:border-primary-amber/40 hover:shadow-[0_0_20px_rgba(255,122,47,0.06)] group"
          >
            <div className="flex flex-col gap-xs text-left z-10">
              <div className="flex items-center gap-xs text-primary-amber font-mono text-xs uppercase">
                <Keyboard className="h-4 w-4" />
                <span>[ Control Deck Bindings ]</span>
              </div>
              <h3 className="font-display font-bold text-[20px] text-ink-light tracking-tight mt-xxs">
                Keyboard-first stack traversal.
              </h3>
              <p className="font-sans text-[14px] text-ink-soft leading-[1.5] max-w-[420px]">
                Navigate code paths using standard editor bindings. Walk call stacks, jump frame scopes, and inspect arguments without a cursor click.
              </p>
            </div>

            {/* Keyboard Shortcuts Layout Deck */}
            <div className="mt-lg flex flex-wrap gap-sm justify-start items-center">
              {[
                { label: 'Step Over', keys: ['⌥ Opt', 'F10'] },
                { label: 'Step Into', keys: ['⌥ Opt', 'F11'] },
                { label: 'Remediate Anomaly', keys: ['⌘ Cmd', '⇧ Shift', 'R'] },
                { label: 'Sync Workspace', keys: ['⌘ Cmd', 'S'] }
              ].map((shortcut) => (
                <div 
                  key={shortcut.label}
                  onClick={handleInteraction}
                  className="flex items-center justify-between gap-md px-base py-sm rounded-lg bg-surface-elevatedDark border border-hairline-dark hover:border-primary-amber/40 transition-colors cursor-pointer select-none active-press-trigger"
                >
                  <span className="text-[13px] text-ink-soft font-medium">{shortcut.label}</span>
                  <div className="flex gap-xs">
                    {shortcut.keys.map((k) => (
                      <kbd 
                        key={k}
                        className="px-sm py-xxs text-[10px] font-mono font-bold bg-canvas-dark text-primary-amber rounded border border-hairline-dark"
                      >
                        {k}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Tall Layout (Live Variable Scope Tree) */}
          <div 
            onMouseEnter={handleCardHover}
            className="md:col-span-4 flex flex-col justify-between rounded-xl bg-surface-cardDark bg-hatch-pattern text-ink-light p-xl border border-hairline-dark relative overflow-hidden transition-all duration-300 hover:border-primary-amber/40 hover:shadow-[0_0_20px_rgba(255,122,47,0.06)]"
          >
            <div className="flex flex-col gap-xs text-left z-10">
              <div className="flex items-center gap-xs text-primary-amber font-mono text-xs uppercase">
                <Layers className="h-4 w-4" />
                <span>[ Variable Inspector ]</span>
              </div>
              <h3 className="font-display font-bold text-[20px] text-ink-light tracking-tight mt-xxs">
                Scope telemetry.
              </h3>
              <p className="font-sans text-[14px] text-ink-soft leading-[1.5]">
                Observe executing thread contexts and scope boundaries. Category tag colors remain soft and desaturated.
              </p>
            </div>

            {/* Simulated Scope Variables (desaturated tag pills matching Huly specs) */}
            <div className="mt-lg space-y-sm text-left">
              {[
                { name: 'process.env.PORT', val: '5173', tag: 'Devops', tagBg: 'bg-tag-devops/10 text-tag-devops' },
                { name: 'db_connection.pool', val: '14/30', tag: 'Research', tagBg: 'bg-tag-research/10 text-tag-research' },
                { name: 'anomaly_tolerance', val: '0.002%', tag: 'QA', tagBg: 'bg-tag-qa/10 text-tag-qa' }
              ].map((item) => (
                <div key={item.name} className="flex flex-col gap-xxs p-sm rounded-lg bg-surface-elevatedDark border border-hairline-dark/60 font-mono text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-mute truncate">{item.name}</span>
                    <span className={`px-sm py-xxs text-[9px] font-bold rounded uppercase ${item.tagBg}`}>
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-ink-light font-semibold font-variant-numeric: tabular-nums mt-xxs">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Normal Layout (Telemetry Memory Heap) */}
          <div 
            onMouseEnter={handleCardHover}
            className="md:col-span-6 flex flex-col justify-between rounded-xl bg-surface-cardDark bg-hatch-pattern text-ink-light p-xl border border-hairline-dark relative overflow-hidden transition-all duration-300 hover:border-primary-amber/40 hover:shadow-[0_0_20px_rgba(255,122,47,0.06)]"
          >
            <div className="flex flex-col gap-xs text-left z-10">
              <div className="flex items-center gap-xs text-primary-amber font-mono text-xs uppercase">
                <Cpu className="h-4 w-4" />
                <span>[ Hardware Tolerances ]</span>
              </div>
              <h3 className="font-display font-bold text-[20px] text-ink-light tracking-tight mt-xxs">
                Microsecond runtime precision.
              </h3>
              <p className="font-sans text-[14px] text-ink-soft leading-[1.5]">
                Observe micro-allocation steps in the JS virtual machine. Tabular metrics prevent layout shift and trace GC execution cycles.
              </p>
            </div>

            {/* Heap allocations */}
            <div className="mt-lg grid grid-cols-2 gap-sm text-left">
              <div className="p-sm rounded-lg bg-surface-elevatedDark border border-hairline-dark font-mono">
                <span className="text-[10px] text-ink-mute block uppercase">ALLOCATED HEAP:</span>
                <span className="text-[20px] font-extrabold text-ink-light font-variant-numeric: tabular-nums block mt-xxs">24.5MB</span>
              </div>
              <div className="p-sm rounded-lg bg-surface-elevatedDark border border-hairline-dark font-mono">
                <span className="text-[10px] text-ink-mute block uppercase">GC CYCLE DURATION:</span>
                <span className="text-[20px] font-extrabold text-primary-amber font-variant-numeric: tabular-nums block mt-xxs">1.12ms</span>
              </div>
            </div>
          </div>

          {/* Card 4: Normal Layout (Telemetry Threads) */}
          <div 
            onMouseEnter={handleCardHover}
            className="md:col-span-6 flex flex-col justify-between rounded-xl bg-surface-cardDark bg-hatch-pattern text-ink-light p-xl border border-hairline-dark relative overflow-hidden transition-all duration-300 hover:border-primary-amber/40 hover:shadow-[0_0_20px_rgba(255,122,47,0.06)]"
          >
            <div className="flex flex-col gap-xs text-left z-10">
              <div className="flex items-center gap-xs text-primary-amber font-mono text-xs uppercase">
                <Eye className="h-4 w-4" />
                <span>[ Thread Diagnostics ]</span>
              </div>
              <h3 className="font-display font-bold text-[20px] text-ink-light tracking-tight mt-xxs">
                Concurrent path tracking.
              </h3>
              <p className="font-sans text-[14px] text-ink-soft leading-[1.5]">
                Track all concurrent execution branches side-by-side. Isolate deadlock channels instantly using active-state indicators.
              </p>
            </div>

            {/* Threads stack */}
            <div className="mt-lg flex flex-col gap-xs text-left">
              {[
                { id: 'Thread_A', desc: 'Polling database connection pool', status: 'ACTIVE' },
                { id: 'Thread_B', desc: 'Syncing local git delta', status: 'IDLE' }
              ].map((t) => (
                <div key={t.id} className="flex items-center justify-between p-sm rounded-lg bg-surface-elevatedDark border border-hairline-dark font-mono text-[12px]">
                  <div className="flex flex-col">
                    <span className="text-ink-light font-semibold">{t.id}</span>
                    <span className="text-[11px] text-ink-mute mt-xxs">{t.desc}</span>
                  </div>
                  <span className={`text-[10px] font-bold ${t.status === 'ACTIVE' ? 'text-primary-amber' : 'text-ink-mute'}`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
