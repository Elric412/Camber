import React, { useEffect, useState } from 'react';
import { Cpu, Server, Shield, Radio, Flame } from 'lucide-react';
import { SoundManager } from '../utils/SoundManager';

export const TelemetryStrip: React.FC = () => {
  const [metrics, setMetrics] = useState({
    cpu: 14.8,
    memory: 2.45,
    ioSpeed: 894,
    errors: 0
  });

  useEffect(() => {
    // Generate natural fluctuation in telemetry values (Doherty threshold feeling)
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: parseFloat((14.2 + Math.random() * 1.5).toFixed(1)),
        memory: parseFloat((2.42 + Math.random() * 0.08).toFixed(2)),
        ioSpeed: Math.floor(880 + Math.random() * 30),
        errors: 0
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="diagnostics" className="w-full bg-canvas-dark border-y border-hairline-dark/80 py-md relative overflow-hidden select-none">
      
      {/* Structural Variety: exposed 1px grid background overlay */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-50" />

      <div className="mx-auto max-w-[1280px] px-lg md:px-xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-md">
        
        {/* Left: Active Status Diagnostic Strip */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-lg font-mono text-[12px] text-ink-soft">
          
          <div className="flex items-center gap-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981] led-indicator-pulse shadow-[0_0_8px_#10B981]"></span>
            </span>
            <span className="text-ink-mute uppercase tracking-wider ml-xxs">SYSTEM STATUS:</span>
            <span className="text-[#10B981] font-semibold tracking-wide ml-xxs">NOMINAL</span>
          </div>

          <div className="flex items-center gap-xs">
            <Cpu className="h-3.5 w-3.5 text-primary-amber" />
            <span className="text-ink-mute">CPU LOAD:</span>
            <span className="text-ink-light font-semibold font-variant-numeric: tabular-nums w-[48px]">
              {metrics.cpu}%
            </span>
          </div>

          <div className="flex items-center gap-xs">
            <Server className="h-3.5 w-3.5 text-primary-amber" />
            <span className="text-ink-mute">HEAP USE:</span>
            <span className="text-ink-light font-semibold font-variant-numeric: tabular-nums w-[56px]">
              {metrics.memory}GB
            </span>
          </div>

          <div className="flex items-center gap-xs">
            <Radio className="h-3.5 w-3.5 text-primary-amber" />
            <span className="text-ink-mute">IO REACH:</span>
            <span className="text-ink-light font-semibold font-variant-numeric: tabular-nums w-[56px]">
              {metrics.ioSpeed}MB/s
            </span>
          </div>

          <div className="flex items-center gap-xs">
            <Shield className="h-3.5 w-3.5 text-primary-amber" />
            <span className="text-ink-mute">VIOLATIONS:</span>
            <span className="text-ink-light font-semibold font-variant-numeric: tabular-nums">
              {metrics.errors}
            </span>
          </div>

        </div>

        {/* Right: Linear Scrolling Marquee (Constant velocity ticker loop) */}
        <div className="w-full lg:w-[320px] h-6 relative overflow-hidden border border-hairline-dark bg-canvas-dark rounded px-sm flex items-center justify-between">
          <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-canvas-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-canvas-dark to-transparent z-10 pointer-events-none" />
          
          <div className="flex items-center gap-xs font-mono text-[10px] tracking-wider text-primary-soft uppercase whitespace-nowrap animate-marquee">
            <span>[ CONNECTED: CAMBER_HUB_US_EAST ] • [ STACK FRAME OVERFLOW PROTECTION ACTIVE ] • [ MEMORY PROFILE: CONCURRENT_COLLECTOR ] • [ CONNECTION: 0x48FA-λ SECURE ] • [ CONNECTED: CAMBER_HUB_US_EAST ] • [ STACK FRAME OVERFLOW PROTECTION ACTIVE ]</span>
          </div>
        </div>

      </div>
    </div>
  );
};
