// Web Audio API Tactical Sound Engine & Persona 3/4/5 Music Synthesizer
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.musicGain = null;
    this.analyser = null;
    this.isPlaying = false;
    this.musicTimer = null;
    this.currentStep = 0;
    this.currentTrackIdx = 0;
    this.volume = 0.20;

    // The 3 Iconic Persona Instrumentals
    this.tracks = [
      {
        id: 'heartbeat',
        title: 'HEARTBEAT, HEARTBREAK',
        origin: 'PERSONA 4 // LO-FI CITY POP',
        bpm: 104,
        stepDuration: 0.144, // 16th note
        chords: [
          [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
          [164.81, 196.00, 246.94, 293.66], // Em7 (E3, G3, B3, D4)
          [146.83, 174.61, 220.00, 261.63], // Dm7 (D3, F3, A3, C4)
          [116.54, 146.83, 174.61, 220.00]  // Bbmaj7 (Bb2, D3, F3, A3)
        ],
        bass: [
          174.61, 0, 174.61, 261.63, 0, 174.61, 220.00, 164.81,
          164.81, 0, 164.81, 246.94, 0, 164.81, 196.00, 146.83,
          146.83, 0, 146.83, 220.00, 0, 146.83, 174.61, 130.81,
          116.54, 0, 116.54, 174.61, 0, 116.54, 130.81, 146.83
        ],
        melody: [
          523.25, 0, 440.00, 523.25, 587.33, 0, 523.25, 440.00,
          392.00, 0, 349.23, 392.00, 440.00, 0, 0, 0,
          523.25, 0, 440.00, 523.25, 587.33, 0, 659.25, 587.33,
          523.25, 0, 440.00, 392.00, 349.23, 0, 0, 0
        ]
      },
      {
        id: 'lifewillchange',
        title: 'LIFE WILL CHANGE',
        origin: 'PERSONA 5 // HEIST ACID JAZZ',
        bpm: 130,
        stepDuration: 0.115, // 16th note
        chords: [
          [293.66, 349.23, 440.00, 587.33], // Dm (D4, F4, A4, D5)
          [233.08, 293.66, 349.23, 440.00], // Bb (Bb3, D4, F4, A4)
          [196.00, 233.08, 293.66, 349.23], // Gm7 (G3, Bb3, D4, F4)
          [220.00, 277.18, 329.63, 440.00]  // A7 (A3, C#4, E4, A4)
        ],
        bass: [
          146.83, 146.83, 0, 146.83, 174.61, 196.00, 207.65, 196.00,
          116.54, 116.54, 0, 116.54, 146.83, 174.61, 196.00, 174.61,
          98.00,  98.00,  0, 98.00,  116.54, 130.81, 146.83, 130.81,
          110.00, 110.00, 0, 110.00, 138.59, 164.81, 174.61, 164.81
        ],
        melody: [
          587.33, 0, 698.46, 783.99, 880.00, 0, 1046.50, 880.00,
          783.99, 0, 698.46, 587.33, 0, 0, 0, 0,
          880.00, 0, 783.99, 698.46, 783.99, 0, 880.00, 1046.50,
          1174.66, 0, 1046.50, 880.00, 783.99, 0, 698.46, 587.33
        ]
      },
      {
        id: 'coloryournight',
        title: 'COLOR YOUR NIGHT',
        origin: 'PERSONA 3 RELOAD // NEO-SOUL JAZZ',
        bpm: 92,
        stepDuration: 0.163, // 16th note
        chords: [
          [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
          [246.94, 293.66, 349.23, 440.00], // Bm7b5 (B3, D4, F4, A4)
          [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
          [174.61, 220.00, 261.63, 329.63]  // Fmaj7 (F3, A3, C4, E4)
        ],
        bass: [
          130.81, 0, 130.81, 196.00, 0, 130.81, 164.81, 146.83,
          123.47, 0, 123.47, 185.00, 0, 123.47, 164.81, 123.47,
          110.00, 0, 110.00, 164.81, 0, 110.00, 130.81, 110.00,
          87.31,  0, 87.31,  130.81, 0, 87.31,  110.00, 123.47
        ],
        melody: [
          659.25, 0, 783.99, 987.77, 880.00, 0, 783.99, 659.25,
          587.33, 0, 659.25, 0, 0, 0, 0, 0,
          523.25, 0, 659.25, 783.99, 880.00, 0, 783.99, 659.25,
          587.33, 0, 523.25, 0, 0, 0, 0, 0
        ]
      }
    ];
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 32;
        this.analyser.smoothingTimeConstant = 0.78;

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

  // UI Sound Effects
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

  playTVStatic() {
    try {
      this.init();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
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

  playCRTBootSound() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
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

      const bufferSize = this.ctx.sampleRate * 0.22;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
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

      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 0.12 + i * 0.06);
        g.gain.setValueAtTime(0.1, now + 0.12 + i * 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.12 + i * 0.06 + 0.35);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(now + 0.12 + i * 0.06);
        osc.stop(now + 0.12 + i * 0.06 + 0.35);
      });
    } catch (e) {}
  }

  playUnlockFanfare() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
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
  // MULTI-TRACK PERSONA MUSIC ENGINE (Heartbeat Heartbreak, Life Will Change, Color Your Night)
  // =========================================================================
  playTrack(index) {
    this.stopMusic();
    this.currentTrackIdx = (index + this.tracks.length) % this.tracks.length;
    this.currentStep = 0;
    this.startMusic();
  }

  nextTrack() {
    const nextIdx = (this.currentTrackIdx + 1) % this.tracks.length;
    this.playTrack(nextIdx);
    return this.tracks[nextIdx];
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIdx];
  }

  startMusic() {
    this.init();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;
    this.currentStep = 0;

    const track = this.tracks[this.currentTrackIdx];
    const stepDuration = track.stepDuration;

    const playStep = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const step16 = this.currentStep % 32;
      const barIdx = Math.floor(step16 / 8);

      // A. Chords on beats 1 and 3 of bar
      if (step16 % 8 === 0 || step16 % 8 === 4) {
        const chordNotes = track.chords[barIdx];
        chordNotes.forEach((freq) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = track.id === 'lifewillchange' ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(track.id === 'lifewillchange' ? 0.03 : 0.045, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 3.2);
          osc.connect(gain);
          gain.connect(this.musicGain);
          osc.start(now);
          osc.stop(now + stepDuration * 3.2);
        });
      }

      // B. Bassline
      const bassFreq = track.bass[step16];
      if (bassFreq > 0) {
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();
        bOsc.type = track.id === 'lifewillchange' ? 'sawtooth' : 'triangle';
        bOsc.frequency.setValueAtTime(bassFreq, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(track.id === 'lifewillchange' ? 700 : 420, now);
        filter.Q.setValueAtTime(2.2, now);

        bGain.gain.setValueAtTime(0.08, now);
        bGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 1.5);

        bOsc.connect(filter);
        filter.connect(bGain);
        bGain.connect(this.musicGain);

        bOsc.start(now);
        bOsc.stop(now + stepDuration * 1.5);
      }

      // C. Lead Melody Motif
      const melFreq = track.melody[step16];
      if (melFreq > 0) {
        const mOsc = this.ctx.createOscillator();
        const mGain = this.ctx.createGain();
        mOsc.type = 'sine';
        mOsc.frequency.setValueAtTime(melFreq, now);
        mGain.gain.setValueAtTime(0.065, now);
        mGain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 1.7);
        mOsc.connect(mGain);
        mGain.connect(this.musicGain);
        mOsc.start(now);
        mOsc.stop(now + stepDuration * 1.7);
      }

      // D. Hi-hat and Snare Percussion
      // Hi-hat on 8th notes
      if (step16 % 2 === 0) {
        const hBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.03, this.ctx.sampleRate);
        const hData = hBuffer.getChannelData(0);
        for (let i = 0; i < hData.length; i++) hData[i] = Math.random() * 2 - 1;
        const hNoise = this.ctx.createBufferSource();
        hNoise.buffer = hBuffer;
        const hFilter = this.ctx.createBiquadFilter();
        hFilter.type = 'highpass';
        hFilter.frequency.setValueAtTime(6500, now);
        const hGain = this.ctx.createGain();
        hGain.gain.setValueAtTime(0.03, now);
        hGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        hNoise.connect(hFilter);
        hFilter.connect(hGain);
        hGain.connect(this.musicGain);
        hNoise.start(now);
      }

      // Snare on beats 2 and 4
      if (step16 % 8 === 4) {
        const sBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.08, this.ctx.sampleRate);
        const sData = sBuffer.getChannelData(0);
        for (let i = 0; i < sData.length; i++) sData[i] = Math.random() * 2 - 1;
        const sNoise = this.ctx.createBufferSource();
        sNoise.buffer = sBuffer;
        const sFilter = this.ctx.createBiquadFilter();
        sFilter.type = 'bandpass';
        sFilter.frequency.setValueAtTime(2200, now);
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

  stopMusic() {
    this.isPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  setVolume(val) {
    this.volume = val;
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  getFrequencyData() {
    if (!this.analyser) return new Uint8Array(8).fill(0);
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }
}

export const sound = new SoundEngine();