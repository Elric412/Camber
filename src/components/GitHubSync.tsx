import React, { useState } from 'react';
import { GitPullRequest, ArrowRightLeft, Check, RefreshCw, Github } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

/* ui-components: 21st-dev/AI prompt box — router=COMPONENTS-ROUTER §3, catalog=INDEX §2: synchronous sync box with electric-blue glow reskinning */

export const GitHubSync: React.FC = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('REPOSITORY STATUS: DESYNCHRONIZED [DELTA 14]');

  const executeSync = () => {
    if (isSyncing) return;
    
    SoundManager.playClick();
    setIsSyncing(true);
    setSyncStatus('>> REMOTING DELTAS TO GITHUB BRANCHES...');
    
    setTimeout(() => {
      setSyncStatus('>> RECONCILING COMMITS... [OK]');
      SoundManager.playTick();
    }, 800);

    setTimeout(() => {
      setSyncStatus('// REPOSITORY SYNCHRONIZED SUCCESSFULLY');
      SoundManager.playSuccess();
      setIsSyncing(false);
    }, 1800);
  };

  return (
    <section id="integrations" className="w-full bg-canvas-dark py-section text-ink-light relative select-none">
      
      {/* 
        Huly Electric Blue Scoped Accent:
        This glow is permitted exclusively inside the "Sync with GitHub" band.
      */}
      <div className="absolute inset-x-0 top-1/4 h-[240px] bg-gradient-to-b from-accent-blue/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-lg md:px-xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
          
          {/* Left Column: Descriptive texts */}
          <div className="lg:col-span-5 flex flex-col items-start text-left gap-md">
            
            <div className="flex items-center gap-xs text-accent-blue font-mono text-xs uppercase">
              <Github className="h-4 w-4" />
              <span>[ Git Integration Subsystem ]</span>
            </div>

            <h3 className="font-display font-extrabold text-[36px] sm:text-[48px] md:text-[56px] leading-[1.08] letter-spacing-[-0.025em] text-ink-light tracking-tighter">
              Sync with GitHub. Both ways.
            </h3>

            <p className="font-sans text-[16px] md:text-[18px] font-normal leading-[1.55] text-ink-soft">
              Sync issues and anomalous stack frames automatically. Resolve execution bugs in local terminals and commit fixes back to GitHub branches seamlessly in real time.
            </p>

            {/* Sync Action Trigger */}
            <button
              onClick={executeSync}
              disabled={isSyncing}
              className="flex h-11 items-center justify-center gap-xs px-lg rounded-full bg-surface-elevatedDark text-ink-light font-semibold hover:bg-surface-cardDark border border-hairline-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-blue active-press-trigger transition-colors mt-xs"
            >
              <RefreshCw className={`h-4 w-4 text-accent-blue ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronizing Commit Logs...' : 'Reconcile GitHub Deltas'}</span>
            </button>

          </div>

          {/* Right Column: Code Editor Mockup wrapped in Neon Blue Outline Glow */}
          <div className="lg:col-span-7 w-full relative">
            
            {/* Scoped blue outline lens flare backing the editor */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent-blue/20 via-transparent to-transparent blur-[60px] rounded-lg pointer-events-none" />

            {/* Editor Container (16px radius, custom outline color) */}
            <div className="relative w-full rounded-lg border border-accent-blue/30 bg-canvas-deep shadow-2xl overflow-hidden">
              
              {/* Editor Header */}
              <div className="flex h-11 items-center justify-between border-b border-hairline-dark bg-canvas-dark px-base">
                <div className="flex items-center gap-xs">
                  <GitPullRequest className="h-3.5 w-3.5 text-accent-blue" />
                  <span className="font-mono text-[11px] font-medium text-ink-mute tracking-wider uppercase">
                    camber-sync-hook.ts
                  </span>
                </div>
                <div className="flex items-center gap-xs font-mono text-[10px] text-accent-blue">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse" />
                  <span className="tracking-wider uppercase">BRANCH: MAIN</span>
                </div>
              </div>

              {/* Editor Mockup Code (Tabular numeric variables, slashed zero details) */}
              <div className="p-base font-mono text-[12px] leading-[1.6] text-ink-soft bg-canvas-deep bg-dot-grid text-left h-[200px] overflow-y-auto">
                <div className="text-ink-dim">// Camber auto-reconciliation hook</div>
                <div><span className="text-accent-blue">import</span> &#123; <span className="text-tag-research">useTelemetrySync</span> &#125; <span className="text-accent-blue">from</span> <span className="text-tag-devops">"@camber/sync"</span>;</div>
                <br />
                <div><span className="text-accent-blue">export const</span> <span className="text-tag-sales">useGitDelta</span> = () =&gt; &#123;</div>
                <div className="pl-base">
                  <span className="text-accent-blue">const</span> &#123; sync, loading &#125; = <span className="text-tag-research">useTelemetrySync</span>(&#123;
                </div>
                <div className="pl-lg">
                  repo: <span className="text-tag-devops">"github:camber-org/camber-app"</span>,
                </div>
                <div className="pl-lg font-variant-numeric: tabular-nums">
                  syncThreshold: <span className="text-primary-amber">0.002</span>, <span className="text-ink-dim">// exact tolerances</span>
                </div>
                <div className="pl-lg">
                  enableAutoCommit: <span className="text-primary-amber">true</span>
                </div>
                <div className="pl-base">&#125;);</div>
                <div>&#125;;</div>
              </div>

              {/* Synchronous Status Console (Low panel) */}
              <div className="flex h-11 items-center justify-between border-t border-hairline-dark bg-canvas-dark px-base font-mono text-[11px] text-ink-soft">
                <div className="truncate font-bold font-variant-numeric: tabular-nums text-accent-blue uppercase">
                  {syncStatus}
                </div>
                <ArrowRightLeft className="h-3.5 w-3.5 text-accent-blue shrink-0 ml-sm" />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
