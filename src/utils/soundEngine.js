// Web Audio API Tactical Sound Engine & Persona Music Synthesizer
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.musicGain = null;
    this.analyser = null;
    this.isGrooving = false;
    this.musicTimer = null;
    this.currentStep = 0;
    this.volume = 0.18;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 32;
        this.analyser.smoothingTimeConstant = 0.8;

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.musicGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 1. Menu Hover Sound
  playHover() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  // 2. Select Confirm Sound
  playSelect() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.setValueAtTime(659.25, now + 0.06);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.22);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1046.50, now + 0.06);
      gain2.gain.setValueAtTime(0.08, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.06);
      osc2.stop(now + 0.26);
    } catch (e) {}
  }

  // 3. Back Cancel Sound
  playBack() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  // 4. TV Static Channel Flip Noise Burst
  playTVStatic() {
    try {
      this.init();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  // 5. Authentic CRT TV Power-On Boot Sound
  playCRTBootSound() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Part A: High Voltage Coil Whistle
      const flyback = this.ctx.createOscillator();
      const flybackGain = this.ctx.createGain();
      flyback.type = 'sine';
      flyback.frequency.setValueAtTime(12000, now);
      flyback.frequency.exponentialRampToValueAtTime(15734, now + 0.15);
      flybackGain.gain.setValueAtTime(0.04, now);
      flybackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      flyback.connect(flybackGain);
      flybackGain.connect(this.ctx.destination);
      flyback.start(now);
      flyback.stop(now + 0.35);

      // Part B: Degauss Low-Frequency Thump
      const thump = this.ctx.createOscillator();
      const thumpGain = this.ctx.createGain();
      thump.type = 'triangle';
      thump.frequency.setValueAtTime(120, now);
      thump.frequency.exponentialRampToValueAtTime(40, now + 0.25);
      thumpGain.gain.setValueAtTime(0.18, now);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      thump.connect(thumpGain);
      thumpGain.connect(this.ctx.destination);
      thump.start(now);
      thump.stop(now + 0.28);

      // Part C: Static Crackle Burst
      const bufferSize = this.ctx.sampleRate * 0.22;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.22);

      // Part D: Ascending Boot Chime
      [
        { freq: 440, time: 0.12 },
        { freq: 554.37, time: 0.18 },
        { freq: 659.25, time: 0.24 },
        { freq: 880, time: 0.30 }
      ].forEach((note) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, now + note.time);
        g.gain.setValueAtTime(0.1, now + note.time);
        g.gain.exponentialRampToValueAtTime(0.001, now + note.time + 0.35);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(now + note.time);
        osc.stop(now + note.time + 0.35);
      });
    } catch (e) {}
  }

  // 6. Easter Egg Secret Unlock Fanfare Chime
  playUnlockFanfare() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch (e) {}
  }

  // =========================================================================
  // 7. PERSONA JAZZ-FUNK MUSIC SYNTHESIZER ENGINE (Looping Groovy Tribute)
  // =========================================================================
  startGroove() {
    this.init();
    if (!this.ctx || this.isGrooving) return;
    this.isGrooving = true;
    this.currentStep = 0;

    const stepDuration = 0.135; // 16th note at ~112 BPM (classic funk groove)
    
    // Chord voicings (Dmaj7, C#m7, Bm7, A9)
    const chords = [
      [293.66, 369.99, 440.00, 554.37], // Dmaj7: D4, F#4, A4, C#5
      [277.18, 329.63, 415.30, 493.88], // C#m7: C#4, E4, G#4, B4
      [246.94, 293.66, 369.99, 440.00], // Bm7:  B3, D4, F#4, A4
      [220.00, 277.18, 329.63, 493.88]  // A9:   A3, C#4, E4, B4
    ];

    // Funky walking bass frequencies
    const bassline = [
      146.83, 0, 146.83, 220.00, 0, 146.83, 164.81, 138.59, // Bar 1 (D)
      138.59, 0, 138.59, 207.65, 0, 138.59, 146.83, 123.47, // Bar 2 (C#)
      123.47, 0, 123.47, 185.00, 0, 123.47, 138.59, 110.00, // Bar 3 (B)
      110.00, 0, 110.00, 164.81, 0, 110.00, 130.81, 138.59  // Bar 4 (A)
    ];

    // Lead Melody hook (Specialist / Daytime vibe)
    const melody = [
      739.99, 0, 880.00, 987.77, 1108.73, 0, 987.77, 880.00, // Bar 1
      739.99, 0, 659.25, 739.99, 0, 0, 0, 0,                 // Bar 2
      587.33, 0, 739.99, 880.00, 987.77, 0, 880.00, 739.99, // Bar 3
      659.25, 0, 587.33, 659.25, 0, 0, 0, 0                  // Bar 4
    ];

    const playStep = () => {
      if (!this.isGrooving || !this.ctx) return;
      const now = this.ctx.currentTime;
      const step16 = this.currentStep % 32;
      const barIdx = Math.floor(step16 / 8);

      // A. Synthesized Rhodes Chords on beats 1 and 3 of each bar
      if (step16 % 8 === 0 || step16 % 8 === 4) {
        const chordNotes = chords[barIdx];
        chordNotes.forEach((freq) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 3.5);
          osc.connect(gain);
          gain.connect(this.musicGain);
          osc.start(now);
          osc.stop(now + stepDuration * 3.5);
        });
      }

      // B. Funky Walking Bassline
      const bassFreq = bassline[step16];
      if (bassFreq > 0) {
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();
        bOsc.type = 'sawtooth';
        bOsc.frequency.setValueAtTime(bassFreq, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        filter.Q.setValueAtTime(2.5, now);

        bGain.gain.setValueAtTime(0.08, now);
        bGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 1.6);

        bOsc.connect(filter);
        filter.connect(bGain);
        bGain.connect(this.musicGain);

        bOsc.start(now);
        bOsc.stop(now + stepDuration * 1.6);
      }

      // C. Upbeat Lead Synth Motif
      const melFreq = melody[step16];
      if (melFreq > 0) {
        const mOsc = this.ctx.createOscillator();
        const mGain = this.ctx.createGain();
        mOsc.type = 'sine';
        mOsc.frequency.setValueAtTime(melFreq, now);
        mGain.gain.setValueAtTime(0.06, now);
        mGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 1.8);
        mOsc.connect(mGain);
        mGain.connect(this.musicGain);
        mOsc.start(now);
        mOsc.stop(now + stepDuration * 1.8);
      }

      // D. Hi-hat & Snare Percussion
      // Hi-hat on every 8th note
      if (step16 % 2 === 0) {
        const hBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.03, this.ctx.sampleRate);
        const hData = hBuffer.getChannelData(0);
        for (let i = 0; i < hData.length; i++) hData[i] = Math.random() * 2 - 1;
        const hNoise = this.ctx.createBufferSource();
        hNoise.buffer = hBuffer;
        const hFilter = this.ctx.createBiquadFilter();
        hFilter.type = 'highpass';
        hFilter.frequency.setValueAtTime(7000, now);
        const hGain = this.ctx.createGain();
        hGain.gain.setValueAtTime(0.03, now);
        hGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        hNoise.connect(hFilter);
        hFilter.connect(hGain);
        hGain.connect(this.musicGain);
        hNoise.start(now);
      }

      // Snare on beats 2 and 4 (step 4 and step 12 of bar)
      if (step16 % 8 === 4) {
        const sBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.08, this.ctx.sampleRate);
        const sData = sBuffer.getChannelData(0);
        for (let i = 0; i < sData.length; i++) sData[i] = Math.random() * 2 - 1;
        const sNoise = this.ctx.createBufferSource();
        sNoise.buffer = sBuffer;
        const sFilter = this.ctx.createBiquadFilter();
        sFilter.type = 'bandpass';
        sFilter.frequency.setValueAtTime(2000, now);
        const sGain = this.ctx.createGain();
        sGain.gain.setValueAtTime(0.05, now);
        sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        sNoise.connect(sFilter);
        sFilter.connect(sGain);
        sGain.connect(this.musicGain);
        sNoise.start(now);
      }

      this.currentStep++;
      this.musicTimer = setTimeout(playStep, stepDuration * 1000);
    };

    playStep();
  }

  stopGroove() {
    this.isGrooving = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleGroove() {
    if (this.isGrooving) {
      this.stopGroove();
      return false;
    } else {
      this.startGroove();
      return true;
    }
  }

  setVolume(val) {
    this.volume = val;
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  // Get live audio frequency spectrum data for the CRT TV visualizer
  getFrequencyData() {
    if (!this.analyser) return new Uint8Array(8).fill(0);
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }
}

export const sound = new SoundEngine();