// Web Audio API Sound Generator for Persona 4 UI
class P4SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Persona 4 energetic pop menu cursor hover blip
  playHover() {
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(1318.51, t); // E6
      osc.frequency.setValueAtTime(1760.00, t + 0.02); // A6

      gain.gain.setValueAtTime(0.025, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {}
  }

  // Persona 4 bright signature menu confirm chime
  playSelect() {
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      // P4 energetic two-step major third chord
      osc1.frequency.setValueAtTime(880, t); // A5
      osc1.frequency.setValueAtTime(1320, t + 0.05); // E6
      osc1.frequency.setValueAtTime(1760, t + 0.1); // A6

      osc2.frequency.setValueAtTime(1108.73, t + 0.05); // C#6
      osc2.frequency.setValueAtTime(2217.46, t + 0.1); // C#7

      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t + 0.05);
      osc1.stop(t + 0.18);
      osc2.stop(t + 0.18);
    } catch (e) {}
  }

  // P4 back / cancel sound
  playBack() {
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(659.25, t); // E5
      osc.frequency.exponentialRampToValueAtTime(329.63, t + 0.08); // E4

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch (e) {}
  }

  // Persona 4 Midnight Channel TV static fuzz & channel flip
  playTVStatic() {
    try {
      this.init();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.1; // 100ms noise burst
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {}
  }
}

export const sound = new P4SoundEngine();