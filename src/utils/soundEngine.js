// Web Audio API Tactical Sound Engine & Official Persona OST Player
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.audioElement = null;
    this.audioSource = null;
    this.musicGain = null;
    this.isPlaying = false;
    this.currentTrackIdx = 0;
    this.volume = 0.45;

    // Real Persona In-Game OST Tracks (Stored in public/audio/)
    this.tracks = [
      {
        id: 'heartbeat',
        title: 'HEARTBEAT, HEARTBREAK',
        origin: 'PERSONA 4 // SHIHOKO HIRATA',
        file: '/audio/heartbeat.mp3',
        tag: 'ORIGINAL P4 INABA CLOUDY THEME',
        bpm: 104
      },
      {
        id: 'beneaththemask',
        title: 'BENEATH THE MASK',
        origin: 'PERSONA 5 // LYN INAIZUMI',
        file: '/audio/beneath_the_mask.mp3',
        tag: 'ORIGINAL P5 TOKYO RAIN THEME',
        bpm: 116
      },
      {
        id: 'coloryournight',
        title: 'COLOR YOUR NIGHT',
        origin: 'PERSONA 3 RELOAD // AZUMI TAKAHASHI',
        file: '/audio/color_your_night.mp3',
        tag: 'ORIGINAL P3R NIGHT WALK THEME',
        bpm: 92
      }
    ];
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.82;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initAudioElement() {
    if (typeof window === 'undefined') return;
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.preload = 'auto';
      this.audioElement.loop = true;
      this.audioElement.volume = this.volume;

      // Connect HTML5 audio to Web Audio Analyser for live visualizer
      try {
        this.init();
        if (this.ctx && !this.audioSource) {
          this.audioSource = this.ctx.createMediaElementSource(this.audioElement);
          this.audioSource.connect(this.analyser);
          this.analyser.connect(this.ctx.destination);
        }
      } catch (e) {
        // Fallback if mediaElementSource cannot be attached
      }
    }
  }

  // Tactical UI Sounds
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
      const bufferSize = this.ctx.sampleRate * 0.1;
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
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
      noise.stop(this.ctx.currentTime + 0.1);
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

      const bufferSize = this.ctx.sampleRate * 0.2;
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
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.2);

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
  // REAL PERSONA IN-GAME MUSIC PLAYBACK
  // =========================================================================
  playTrack(index) {
    this.init();
    this.initAudioElement();
    if (!this.audioElement) return;

    this.currentTrackIdx = (index + this.tracks.length) % this.tracks.length;
    const track = this.tracks[this.currentTrackIdx];

    try {
      this.audioElement.pause();
      this.audioElement.src = track.file;
      this.audioElement.currentTime = 0;
      this.audioElement.volume = this.volume;
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
          })
          .catch((err) => {
            console.log("Audio playback waiting for user interaction:", err);
            this.isPlaying = false;
          });
      }
    } catch (e) {
      console.error("Error playing audio track:", e);
    }
  }

  startMusic() {
    this.playTrack(this.currentTrackIdx);
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
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

  nextTrack() {
    const nextIdx = (this.currentTrackIdx + 1) % this.tracks.length;
    this.playTrack(nextIdx);
    return this.tracks[nextIdx];
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIdx];
  }

  setVolume(val) {
    this.volume = val;
    if (this.audioElement) {
      this.audioElement.volume = val;
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