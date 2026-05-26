/* skill: create-sound — "Before choosing layers, write an internal 'SOUND_PLACEMENT_PLAN'. The plan decides **where sound belongs** and where silence is the premium choice." */

export class SoundManager {
  private static audioCtx: AudioContext | null = null;
  private static isMuted: boolean = false;

  private static init() {
    if (!this.audioCtx) {
      // Reuse a single AudioContext node (context-reuse-single rule)
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    
    // Resume suspended context (context-resume-suspended rule)
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public static toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public static getMuteStatus() {
    return this.isMuted;
  }

  /**
   * Procedural Click Sound (sine + frequency sweep + short FM)
   * param-click-duration: 5-15ms, param-filter-frequency-range: 3000-6000Hz
   */
  public static playClick() {
    if (this.isMuted) return;
    
    try {
      this.init();
      if (!this.audioCtx) return;

      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Core: Sine oscillator
      osc.type = 'sine';
      
      // Pitch Sweep: start at 800Hz, sweep down to 300Hz in 60ms
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);

      // Lowpass filter to shape character (design-filter-for-character)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(4000, now);

      // Envelope: 60ms exponential decay (envelope-exponential-decay)
      gainNode.gain.setValueAtTime(0.18, now); // impl-default-subtle (gain under 0.25)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      // Routing
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);

      // Cleanup nodes (context-cleanup-nodes rule)
      setTimeout(() => {
        osc.disconnect();
        filter.disconnect();
        gainNode.disconnect();
      }, 100);
    } catch {
      // Graceful fallback if audio context blocked or unsupported
    }
  }

  /**
   * Procedural Tick Sound (ultra-short micro click for minor elements)
   */
  public static playTick() {
    if (this.isMuted) return;
    
    try {
      this.init();
      if (!this.audioCtx) return;

      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      
      // Faint high-frequency tick
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(3500, now);

      // Decay under 15ms
      gainNode.gain.setValueAtTime(0.06, now); // ultra-subtle tick
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);

      setTimeout(() => {
        osc.disconnect();
        gainNode.disconnect();
      }, 50);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Procedural Success Chord (three ascending notes cascading delay)
   */
  public static playSuccess() {
    if (this.isMuted) return;

    try {
      this.init();
      if (!this.audioCtx) return;

      const ctx = this.audioCtx;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 arpeggio
      const delays = [0, 0.07, 0.14];

      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delays[idx]);
        
        // Slight resolving upward pitch sweep on the top G5 note
        if (idx === 2) {
          osc.frequency.exponentialRampToValueAtTime(880.00, now + delays[idx] + 0.2); // G5 -> A5
        }

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3000, now + delays[idx]);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.setValueAtTime(0.12, now + delays[idx]);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + delays[idx] + 0.25);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now + delays[idx]);
        osc.stop(now + delays[idx] + 0.3);

        setTimeout(() => {
          osc.disconnect();
          filter.disconnect();
          gainNode.disconnect();
        }, 500);
      });
    } catch {
      // Graceful fallback
    }
  }
}
