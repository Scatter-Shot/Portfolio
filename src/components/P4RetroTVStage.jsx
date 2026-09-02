"use client";
import React, { useState, useEffect, useRef } from 'react';
import { sound } from '@/utils/soundEngine';
import { Tv, Music, Volume2, VolumeX, Sparkles, Play, Pause } from 'lucide-react';

const BASE_CHANNELS = [
  { num: 1, title: 'NEXUS CORE // KERNEL', subtitle: 'SYSTEM INITIALIZATION & TELEMETRY' },
  { num: 2, title: 'C++ GRAPHICS // SHADERS', subtitle: 'OPENGL VERTEX PIPELINE ACTIVE' },
  { num: 3, title: 'REACT // APPARATUS', subtitle: 'DYNAMIC SSR RUNTIME SYNCED' },
  { num: 4, title: 'TACTICAL RADAR // SWEEP', subtitle: 'ATMOSPHERIC & NETWORK PROFILING' },
  { num: 5, title: 'MEMORY MATRIX // CACHE', subtitle: 'ZERO-ALLOCATION BUFFER ONLINE' },
  { num: 6, title: 'AUDIO DSP // OSCILLATOR', subtitle: 'SYNTHESIZED 8-BIT HARMONICS' },
];

const SECRET_CHANNEL = {
  num: 7,
  title: 'PERSONA FM // SPECIALIST',
  subtitle: 'TACTICAL JAZZ-FUNK GROOVE'
};

export default function P4RetroTVStage() {
  const [visitedChannels, setVisitedChannels] = useState(() => new Set([1]));
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [channelIdx, setChannelIdx] = useState(0);
  const [isFlickering, setIsFlickering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [eqBars, setEqBars] = useState([40, 65, 80, 50, 75, 90, 60, 45]);

  const channels = isUnlocked ? [...BASE_CHANNELS, SECRET_CHANNEL] : BASE_CHANNELS;
  const currentCh = channels[channelIdx] || channels[0];
  const isSecretCh = currentCh.num === 7;

  // Real-time Visualizer Loop when secret channel is playing
  useEffect(() => {
    let animId;
    const updateVisualizer = () => {
      if (isPlaying && isSecretCh) {
        const freq = sound.getFrequencyData();
        // Map 8 frequency bins to heights
        setEqBars([
          Math.max(25, (freq[0] || 0) * 0.4),
          Math.max(30, (freq[1] || 0) * 0.45),
          Math.max(45, (freq[2] || 0) * 0.5),
          Math.max(35, (freq[3] || 0) * 0.48),
          Math.max(40, (freq[4] || 0) * 0.52),
          Math.max(50, (freq[5] || 0) * 0.46),
          Math.max(30, (freq[6] || 0) * 0.42),
          Math.max(20, (freq[7] || 0) * 0.38)
        ]);
      }
      animId = requestAnimationFrame(updateVisualizer);
    };

    if (isPlaying && isSecretCh) {
      animId = requestAnimationFrame(updateVisualizer);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying, isSecretCh]);

  // Clean up music when unmounting
  useEffect(() => {
    return () => {
      sound.stopGroove();
    };
  }, []);

  const flipChannel = () => {
    sound.playTVStatic();
    setIsFlickering(true);

    const nextIdx = (channelIdx + 1) % channels.length;
    const nextCh = channels[nextIdx];
    setChannelIdx(nextIdx);

    // Track exploration of all 6 standard channels
    if (!isUnlocked && nextCh.num <= 6) {
      const updated = new Set(visitedChannels);
      updated.add(nextCh.num);
      setVisitedChannels(updated);

      // Trigger Easter Egg Unlock once all 6 channels have been visited!
      if (updated.size === 6) {
        setTimeout(() => {
          setIsUnlocked(true);
          setShowToast(true);
          sound.playUnlockFanfare();
          sound.playTVStatic();
          // Jump to secret channel 7 and start playing the groove!
          setChannelIdx(6);
          sound.startGroove();
          setIsPlaying(true);
          setTimeout(() => setShowToast(false), 3800);
        }, 400);
      }
    }

    // Auto-stop music if switching away from secret channel
    if (isSecretCh && nextCh.num !== 7) {
      sound.stopGroove();
      setIsPlaying(false);
    } else if (nextCh.num === 7 && !isPlaying) {
      sound.startGroove();
      setIsPlaying(true);
    }

    setTimeout(() => setIsFlickering(false), 220);
  };

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!isSecretCh) {
      flipChannel();
      return;
    }

    sound.playSelect();
    const active = sound.toggleGroove();
    setIsPlaying(active);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    sound.playSelect();
    if (isMuted) {
      sound.setVolume(0.18);
      setIsMuted(false);
    } else {
      sound.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="relative w-full max-w-[380px] lg:max-w-[420px] select-none">
      {/* Twin Antennas */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-44 flex justify-between pointer-events-none z-0">
        <div className="w-1.5 h-20 bg-black origin-bottom -rotate-25 shadow-md border border-[#0c0b05]" />
        <div className="w-1.5 h-20 bg-black origin-bottom rotate-25 shadow-md border border-[#0c0b05]" />
      </div>

      {/* Outer Retro CRT Chassis */}
      <div className="relative bg-[#0c0b05] border-4 border-black p-4 md:p-5 p4-skew shadow-[10px_10px_0px_#FF6600] z-10">
        <div className="p4-skew-reverse">
          
          {/* TV Screen Surround */}
          <div className="relative bg-[#1a1708] border-4 border-black p-3.5 rounded-lg shadow-inner">
            
            {/* Curved CRT Display */}
            <div 
              onClick={isSecretCh ? togglePlay : flipChannel}
              title={isSecretCh ? "Click monitor to Play/Pause Persona Groove" : "Click monitor to flip channel"}
              className="relative w-full h-48 md:h-56 bg-[#080703] border-4 border-[#0c0b05] rounded overflow-hidden flex flex-col items-center justify-center cursor-pointer group shadow-2xl"
            >
              {/* Scanlines */}
              <div className="absolute inset-0 crt-scanlines z-10 opacity-50 pointer-events-none" />

              {/* Screen Content */}
              {isFlickering ? (
                <div className="absolute inset-0 rainbow-strip opacity-90 animate-pulse" />
              ) : showToast ? (
                /* Easter Egg Unlock Announcement Overlay */
                <div className="relative z-20 text-center p-3 animate-bounce">
                  <span className="font-display font-p4-display text-xl md:text-2xl text-[#FFE600] block tracking-wider leading-tight">
                    ★ EASTER EGG UNLOCKED! ★
                  </span>
                  <span className="font-mono text-[9px] text-white bg-black px-2 py-0.5 mt-1.5 inline-block font-black tracking-widest uppercase border border-[#FFE600]">
                    TUNING TO SECRET BROADCAST...
                  </span>
                </div>
              ) : isSecretCh ? (
                /* SECRET CHANNEL 7: Interactive Persona Music Player */
                <div className="relative z-20 text-center p-2.5 w-full flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[9px] bg-[#FF6600] text-white px-2 py-0.5 font-black uppercase tracking-wider flex items-center gap-1 shadow">
                      <Music size={11} className="animate-spin-slow" />
                      PERSONA TRIBUTE FM
                    </span>
                    <span className={`font-mono text-[8px] px-1.5 py-0.5 font-bold uppercase ${isPlaying ? 'bg-emerald-400 text-black' : 'bg-gray-700 text-gray-300'}`}>
                      {isPlaying ? '● LIVE' : '⏸ PAUSED'}
                    </span>
                  </div>

                  <span className="font-display font-p4-display text-2xl md:text-3xl text-[#FFE600] block tracking-wider leading-none mt-1">
                    SPECIALIST // GROOVE
                  </span>
                  <span className="font-mono text-[9px] text-gray-300 block tracking-widest uppercase mt-0.5">
                    112 BPM // FUNKY NEO-SOUL JAZZ
                  </span>

                  {/* Real-time Dancing Audio Spectrum Visualizer */}
                  <div className="flex items-end justify-center gap-1.5 h-12 w-44 mx-auto my-2 px-2 bg-black/60 border border-[#FFE600]/30 rounded-sm">
                    {eqBars.map((height, idx) => (
                      <div
                        key={idx}
                        className="w-3 rounded-t-xs transition-all duration-75"
                        style={{
                          height: isPlaying ? `${height}%` : '15%',
                          backgroundColor: idx % 2 === 0 ? '#FFE600' : '#FF6600'
                        }}
                      />
                    ))}
                  </div>

                  <span className="font-mono text-[8px] text-white/70 block tracking-widest uppercase">
                    [ CLICK SCREEN TO {isPlaying ? 'PAUSE' : 'PLAY'} ]
                  </span>
                </div>
              ) : (
                /* Standard Telemetry Feeds (Channels 1–6) */
                <div className="relative z-20 text-center p-3">
                  <div className="w-10 h-10 mx-auto mb-2 bg-[#FFE600] border-2 border-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Tv size={22} className="text-black" />
                  </div>

                  <span className="font-display font-p4-display text-2xl md:text-3xl text-[#FFE600] block tracking-wider leading-none">
                    {currentCh.title}
                  </span>
                  <span className="font-mono text-[9px] text-white/80 block mt-1.5 tracking-widest uppercase">
                    {currentCh.subtitle}
                  </span>

                  {/* Rainbow Strip Bottom Indicator */}
                  <div className="w-28 h-1.5 rainbow-strip mx-auto mt-3 border border-black" />
                </div>
              )}
            </div>

            {/* Monitor Control Dials on Bottom */}
            <div className="flex items-center justify-between mt-2.5 pt-2 border-t-2 border-[#FFE600]/20">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isSecretCh ? 'bg-emerald-400 animate-ping' : 'bg-[#FF6600] animate-pulse'}`} />
                <span className="font-mono text-[9px] text-[#FFE600] font-bold tracking-wider">
                  {isSecretCh ? 'CH 07 // SECRET TUNER' : `NEXUS CRT // FEED 0${currentCh.num}`}
                </span>
              </div>

              {/* Clickable Channel & Volume Dial Knobs */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={flipChannel}
                  title="Next Channel"
                  className="w-6 h-6 rounded-full bg-[#FFE600] border-2 border-black flex items-center justify-center text-[9px] font-black text-black hover:bg-white transition-colors shadow-sm"
                >
                  CH
                </button>
                <button 
                  onClick={toggleMute}
                  title={isMuted ? "Unmute Volume" : "Mute Volume"}
                  className="w-6 h-6 rounded-full bg-white border-2 border-black flex items-center justify-center text-[9px] font-black text-black hover:bg-[#FFE600] transition-colors shadow-sm"
                >
                  {isMuted ? <VolumeX size={11} /> : <Volume2 size={11} />}
                </button>
              </div>
            </div>

          </div>

          {/* Tactical Operative Badge & Discovery Progress Indicator */}
          <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[#FFE600]">
            <span>
              {isUnlocked ? '★ SECRET BROADCAST READY' : `DISCOVERY: ${visitedChannels.size}/6 CHANNELS`}
            </span>
            <span className={`px-2 py-0.5 font-bold ${isSecretCh ? 'bg-emerald-400 text-black animate-pulse' : 'bg-[#FFE600] text-black'}`}>
              {isSecretCh ? (isPlaying ? 'AUDIO ON' : 'PAUSED') : 'SIGNAL LOCK'}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
