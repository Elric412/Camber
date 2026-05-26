import React, { useState } from 'react';
import { Network, Activity, Crosshair, ArrowRight } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

/* ui-components: Others/calligraph-main — router=COMPONENTS-ROUTER §4, catalog=INDEX §4: custom node path illustration */

export const SVGSchematic: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [diagnosticLog, setDiagnosticLog] = useState<string>('SELECT AN EXECUTION NODE TO TRACE');

  const handleNodeHover = (nodeId: string) => {
    SoundManager.playTick();
    setActiveNode(nodeId);
    
    const logs: Record<string, string> = {
      'node-1': 'NODE_01: ENTRYPOINT RESOLVED • ROUTE /API/V1/TELEMETRY',
      'node-2': 'NODE_02: THREAD ALLOCATED • PID: 184A • PARALLEL POOLING',
      'node-3': 'NODE_03: DIAGNOSTIC AUDITOR • RUNNING STACK SCOPE CHECKS',
      'node-4': 'NODE_04: COMPILER RESOLUTION • STATE: NOMINAL • GC PASS'
    };
    
    setDiagnosticLog(logs[nodeId] || 'SELECT AN EXECUTION NODE TO TRACE');
  };

  const handleNodeClick = () => {
    SoundManager.playClick();
  };

  return (
    <section className="w-full bg-canvas-cream pb-section text-ink-dark relative select-none">
      
      <div className="mx-auto max-w-[1280px] px-lg md:px-xl flex flex-col gap-lg">
        
        {/* Layout: Split columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
          
          {/* Left Column: Architectural Drawing / SVG Diagram */}
          <div className="lg:col-span-7 w-full relative">
            <div className="absolute top-4 left-4 font-mono text-[9px] text-ink-mutedLight">[ TELEMETRY DIAGRAM v0.1 ]</div>
            
            {/* SVG Schematic Canvas */}
            <div className="w-full h-[360px] rounded-lg border border-hairline-light bg-canvas-paper/50 flex items-center justify-center p-sm relative shadow-sm">
              <svg 
                viewBox="0 0 500 300" 
                className="w-full h-full font-mono text-[10px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 1px grid backdrop inside SVG */}
                <defs>
                  <pattern id="svg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#svg-grid)" />

                {/* Connecting Path Lines */}
                <path 
                  d="M 50 150 L 160 80 M 50 150 L 160 220 M 160 80 L 320 80 M 160 220 L 320 220 M 320 80 L 440 150 M 320 220 L 440 150" 
                  fill="none" 
                  stroke={activeNode ? 'var(--color-primary-amber)' : 'var(--color-hairline-light)'} 
                  strokeWidth="1" 
                  className="transition-colors duration-300"
                  strokeDasharray="4 4"
                />

                {/* Active connecting highlight path */}
                {activeNode === 'node-1' && (
                  <path d="M 50 150 L 160 80 M 50 150 L 160 220" fill="none" stroke="var(--color-primary-amber)" strokeWidth="2.5" className="trace-path-pulse-fast" />
                )}
                {activeNode === 'node-2' && (
                  <path d="M 160 80 L 320 80" fill="none" stroke="var(--color-primary-amber)" strokeWidth="2.5" className="trace-path-pulse" />
                )}
                {activeNode === 'node-3' && (
                  <path d="M 160 220 L 320 220" fill="none" stroke="var(--color-primary-amber)" strokeWidth="2.5" className="trace-path-pulse-fast" />
                )}
                {activeNode === 'node-4' && (
                  <path d="M 320 80 L 440 150 M 320 220 L 440 150" fill="none" stroke="var(--color-primary-amber)" strokeWidth="2.5" className="trace-path-pulse" />
                )}

                {/* Nodes */}
                {/* Node 1: Entry */}
                <g 
                  className="cursor-pointer group"
                  onMouseEnter={() => handleNodeHover('node-1')}
                  onClick={handleNodeClick}
                >
                  <circle cx="50" cy="150" r="12" fill={activeNode === 'node-1' ? 'var(--color-primary-amber)' : 'var(--color-surface-cardDark)'} stroke="var(--color-ink-dark)" strokeWidth="2" className="transition-colors" />
                  <text x="50" y="154" textAnchor="middle" fill={activeNode === 'node-1' ? '#fff' : 'var(--color-ink-light)'} className="font-bold text-[9px]">01</text>
                  <text x="50" y="172" textAnchor="middle" fill="var(--color-ink-dark)" className="font-semibold text-[8px] tracking-wide">ENTRYPOINT</text>
                </g>

                {/* Node 2: Thread pool */}
                <g 
                  className="cursor-pointer group"
                  onMouseEnter={() => handleNodeHover('node-2')}
                  onClick={handleNodeClick}
                >
                  <circle cx="160" cy="80" r="12" fill={activeNode === 'node-2' ? 'var(--color-primary-amber)' : 'var(--color-surface-cardDark)'} stroke="var(--color-ink-dark)" strokeWidth="2" className="transition-colors" />
                  <text x="160" y="84" textAnchor="middle" fill={activeNode === 'node-2' ? '#fff' : 'var(--color-ink-light)'} className="font-bold text-[9px]">02</text>
                  <text x="160" y="62" textAnchor="middle" fill="var(--color-ink-dark)" className="font-semibold text-[8px] tracking-wide">THREADS</text>
                </g>

                {/* Node 3: Auditor */}
                <g 
                  className="cursor-pointer group"
                  onMouseEnter={() => handleNodeHover('node-3')}
                  onClick={handleNodeClick}
                >
                  <circle cx="160" cy="220" r="12" fill={activeNode === 'node-3' ? 'var(--color-primary-amber)' : 'var(--color-surface-cardDark)'} stroke="var(--color-ink-dark)" strokeWidth="2" className="transition-colors" />
                  <text x="160" y="224" textAnchor="middle" fill={activeNode === 'node-3' ? '#fff' : 'var(--color-ink-light)'} className="font-bold text-[9px]">03</text>
                  <text x="160" y="242" textAnchor="middle" fill="var(--color-ink-dark)" className="font-semibold text-[8px] tracking-wide">AUDITOR</text>
                </g>

                {/* Node 4: Resolve */}
                <g 
                  className="cursor-pointer group"
                  onMouseEnter={() => handleNodeHover('node-4')}
                  onClick={handleNodeClick}
                >
                  <circle cx="320" cy="80" r="12" fill={activeNode === 'node-4' ? 'var(--color-primary-amber)' : 'var(--color-surface-cardDark)'} stroke="var(--color-ink-dark)" strokeWidth="2" className="transition-colors" />
                  <text x="320" y="84" textAnchor="middle" fill={activeNode === 'node-4' ? '#fff' : 'var(--color-ink-light)'} className="font-bold text-[9px]">04</text>
                  <text x="320" y="62" textAnchor="middle" fill="var(--color-ink-dark)" className="font-semibold text-[8px] tracking-wide">COMPILER</text>
                </g>

                <circle cx="440" cy="150" r="6" fill="var(--color-hairline-dark)" />
                <text x="440" y="168" textAnchor="middle" fill="var(--color-ink-dark)" className="font-semibold text-[8px]">OUT</text>

                {/* Angle Leader-lines / dimensions */}
                <line x1="160" y1="80" x2="160" y2="105" stroke="var(--color-ink-dim)" strokeWidth="0.5" strokeDasharray="2 2" />
                <text x="165" y="100" fill="var(--color-ink-dim)" className="text-[7px]">Y_TOLERANCE: 80px</text>
              </svg>

              {/* HUD Coordinates brackets overlay */}
              <div className="absolute top-2 right-2 text-ink-mutedLight font-mono text-[8px]">[ PLOT_AREA: 500x300 ]</div>
            </div>
          </div>

          {/* Right Column: Descriptions & Live Diagnostic Feed */}
          <div className="lg:col-span-5 flex flex-col items-start text-left gap-md">
            <div className="flex items-center gap-xs text-primary-amber font-mono text-xs uppercase">
              <Network className="h-4 w-4" />
              <span>[ Path-Tracing Telemetry ]</span>
            </div>
            
            <h3 className="font-display font-bold text-[24px] md:text-[32px] text-ink-dark tracking-tight leading-tight">
              Interactive structural blueprints.
            </h3>
            
            <p className="font-sans text-[15px] text-ink-body leading-[1.6]">
              Observe code path compilation visually. Hover over nodes to trace thread vectors, measure execution delays, and stream operational diagnostics.
            </p>

            {/* Live Diagnostic Console display */}
            <div className="w-full rounded-lg border border-hairline-light bg-canvas-paper p-base shadow-inner font-mono text-[12px] text-ink-dark flex flex-col justify-between h-[100px]">
              <div className="flex items-center justify-between border-b border-hairline-light pb-xs mb-xs select-none">
                <div className="flex items-center gap-xs">
                  <Activity className="h-3 w-3 text-primary-amber animate-pulse" />
                  <span className="text-[10px] text-ink-mutedLight uppercase">TELEMETRY_LOG // SCOPE_ACTIVE</span>
                </div>
                <Crosshair className="h-3.5 w-3.5 text-ink-mutedLight" />
              </div>
              <div className="text-ink-dark font-bold font-variant-numeric: tabular-nums text-[11px] truncate uppercase">
                {diagnosticLog}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
