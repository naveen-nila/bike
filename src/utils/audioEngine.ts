/**
 * Synthesizes realistic motorcycle engine sounds (idle rumble, rev pitch, exhaust pops)
 * using the Web Audio API without requiring external audio files.
 */
class EngineSoundSimulator {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isRunning = false;
  private currentRpm = 1400;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start() {
    if (this.isRunning) return;
    this.initContext();
    if (!this.ctx) return;

    this.isRunning = true;
    this.currentRpm = 1400;

    // Master Gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 0.3);

    // Lowpass filter for deep exhaust thump
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);

    // Primary firing pulse (sawtooth for aggressive exhaust harmonics)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(this.rpmToFrequency(this.currentRpm), this.ctx.currentTime);

    // Secondary sub-bass rumble
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(this.rpmToFrequency(this.currentRpm) * 0.5, this.ctx.currentTime);

    this.osc1.connect(this.filterNode);
    this.osc2.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.osc1.start();
    this.osc2.start();
  }

  public setRpm(rpm: number) {
    if (!this.isRunning || !this.ctx || !this.osc1 || !this.osc2 || !this.filterNode) return;
    this.currentRpm = rpm;
    const freq = this.rpmToFrequency(rpm);
    const now = this.ctx.currentTime;

    this.osc1.frequency.setTargetAtTime(freq, now, 0.04);
    this.osc2.frequency.setTargetAtTime(freq * 0.5, now, 0.04);

    // Filter opens up as RPM climbs for that screaming high-rev roar
    const filterCutoff = Math.min(2200, 300 + (rpm / 10000) * 1600);
    this.filterNode.frequency.setTargetAtTime(filterCutoff, now, 0.05);

    // Pop effect if dropping throttle rapidly
    if (rpm > 8500) {
      this.gainNode?.gain.setValueAtTime(0.25, now);
    }
  }

  public stop() {
    if (!this.isRunning || !this.ctx) return;
    if (this.gainNode) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    }
    setTimeout(() => {
      try {
        this.osc1?.stop();
        this.osc2?.stop();
        this.osc1?.disconnect();
        this.osc2?.disconnect();
      } catch {
        // Safe disconnect
      }
      this.isRunning = false;
    }, 220);
  }

  public getIsRunning() {
    return this.isRunning;
  }

  private rpmToFrequency(rpm: number): number {
    // 4-stroke 1-cylinder fires every 2 revolutions: (rpm / 60) / 2
    // Scaled for acoustic presence
    return Math.max(22, (rpm / 60) * 1.5);
  }
}

export const engineSound = new EngineSoundSimulator();
