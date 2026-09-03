"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/soundEngine';
import { Tv, Music, Volume2, VolumeX, SkipForward, Disc } from 'lucide-react';

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
  title: 'PERSONA OST // JUKEBOX',
  subtitle: 'OFFICIAL IN-GAME SOUNDTRACKS'
};

export default function P4RetroTVStage() {
  const [visitedChannels, setVisitedChannels] = useState(() => new Set([1]));
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [channelIdx, setChannelIdx] = useState(0);
  const [isFlickering, setIsFlickering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [eqBars, setEqBars] = useState([35, 55, 75, 45, 65, 80, 50, 40]);

  const channels = isUnlocked ? [...BASE_CHANNELS, SECRET_CHANNEL] : BASE_CHANNELS;
  const currentCh = channels[channelIdx] || channels[0];
  const isSecretCh = currentCh.num === 7;
  const currentTrack = sound.tracks[trackIdx] || sound.tracks[0];

  // Dynamic real-time Audio Spectrum Visualizer reading the real MP3 audio stream!
  useEffect(() => {
    let animId;
    const updateVisualizer = () => {
      if (isPlaying && isSecretCh) {
        const freq = sound.getFrequencyData();
        setEqBars([
          Math.max(20, Math.min(100, (freq[0] || 0) * 0.45)),
          Math.max(25, Math.min(100, (freq[1] || 0) * 0.50)),
          Math.max(35, Math.min(100, (freq[2] || 0) * 0.55)),
          Math.max(30, Math.min(100, (freq[3] || 0) * 0.52)),
          Math.max(35, Math.min(100, (freq[4] || 0) * 0.58)),
          Math.max(40, Math.min(100, (freq[5] || 0) * 0.52)),
          Math.max(25, Math.min(100, (freq[6] || 0) * 0.45)),
          Math.max(18, Math.min(100, (freq[7] || 0) * 0.40))
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
      sound.stopMusic();
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
          setChannelIdx(6);
          sound.playTrack(0);
          setTrackIdx(0);
          setIsPlaying(true);
          setTimeout(() => setShowToast(false), 3800);
        }, 350);
      }
    }

    // Auto-stop music if switching away from secret channel
    if (isSecretCh && nextCh.num !== 7) {
      sound.stopMusic();
      setIsPlaying(false);
    } else if (nextCh.num === 7 && !isPlaying) {
      sound.startMusic();
      setIsPlaying(true);
    }

    setTimeout(() => setIsFlickering(false), 160);
  };

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!isSecretCh) {
      flipChannel();
      return;
    }

    sound.playSelect();
    const active = sound.toggleMusic();
    setIsPlaying(active);
  };

  const handleNextTrack = (e) => {
    if (e) e.stopPropagation();
    sound.playSelect();
    const next = (trackIdx + 1) % sound.tracks.length;
    setTrackIdx(next);
    sound.playTrack(next);
    setIsPlaying(true);
  };

  const selectTrack = (idx, e) => {
    if (e) e.stopPropagation();
    sound.playSelect();
    setTrackIdx(idx);
    sound.playTrack(idx);
    setIsPlaying(true);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    sound.playSelect();
    if (isMuted) {
      sound.setVolume(0.45);
      setIsMuted(false);
    } else {
      sound.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="relative w-full max-w-[380px] lg:max-w-[420px] select-none will-change-transform">
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
              title={isSecretCh ? "Click monitor to Play/Pause" : "Click monitor to flip channel"}
              className="relative w-full h-52 md:h-60 bg-[#080703] border-4 border-[#0c0b05] rounded overflow-hidden flex flex-col items-center justify-center cursor-pointer group shadow-2xl"
            >
              {/* Scanlines */}
              <div className="absolute inset-0 crt-scanlines z-10 opacity-40 pointer-events-none" />

              {/* Screen Content */}
              {isFlickering ? (
                <div className="absolute inset-0 rainbow-strip opacity-85 animate-pulse" />
              ) : showToast ? (
                /* Easter Egg Unlock Announcement Overlay */
                <div className="relative z-20 text-center p-3 animate-bounce">
                  <span className="font-display font-p4-display text-xl md:text-2xl text-[#FFE600] block tracking-wider leading-tight">
                    ★ EASTER EGG UNLOCKED! ★
                  </span>
                  <span className="font-mono text-[9px] text-white bg-black px-2 py-0.5 mt-1.5 inline-block font-black tracking-widest uppercase border border-[#FFE600]">
                    TUNING TO REAL PERSONA OST...
                  </span>
                </div>
              ) : isSecretCh ? (
                /* SECRET CHANNEL 7: Interactive Real In-Game Persona Music Player */
                <div className="relative z-20 text-center p-2 w-full flex flex-col items-center justify-between h-full">
                  {/* Top Bar: Jukebox Badge & Status */}
                  <div className="flex items-center justify-between w-full px-1">
                    <span className="font-mono text-[8px] sm:text-[9px] bg-[#FF6600] text-white px-2 py-0.5 font-black uppercase tracking-wider flex items-center gap-1 shadow">
                      <Disc size={11} className={isPlaying ? "animate-spin" : ""} />
                      {currentTrack.origin}
                    </span>
                    <span className={`font-mono text-[8px] px-1.5 py-0.5 font-bold uppercase ${isPlaying ? 'bg-emerald-400 text-black' : 'bg-gray-700 text-gray-300'}`}>
                      {isPlaying ? '● REAL OST' : '⏸ PAUSED'}
                    </span>
                  </div>

                  {/* Track Title */}
                  <div className="my-auto py-1">
                    <span className="font-display font-p4-display text-xl sm:text-2xl md:text-3xl text-[#FFE600] block tracking-wider leading-none">
                      {currentTrack.title}
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] text-gray-300 block tracking-widest uppercase mt-0.5">
                      {currentTrack.tag}
                    </span>
                  </div>

                  {/* Real-time Dancing Audio Spectrum Visualizer */}
                  <div className="flex items-end justify-center gap-1.5 h-10 w-44 mx-auto px-2 bg-black/70 border border-[#FFE600]/30 rounded-sm">
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

                  {/* 3 Real Track Selector Pills */}
                  <div className="flex items-center gap-1 w-full justify-center mt-1 z-30">
                    {[
                      { id: 0, label: 'P4: HEARTBEAT' },
                      { id: 1, label: 'P5: BENEATH MASK' },
                      { id: 2, label: 'P3R: COLOR NIGHT' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={(e) => selectTrack(t.id, e)}
                        className={`font-mono text-[7px] sm:text-[8px] px-1.5 py-0.5 border font-bold uppercase transition-all ${
                          trackIdx === t.id
                            ? 'bg-[#FFE600] text-black border-white shadow'
                            : 'bg-black/80 text-gray-400 border-gray-700 hover:text-white'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between w-full px-1 text-[7px] sm:text-[8px] font-mono text-white/60 mt-1">
                    <span>[CLICK SCREEN: {isPlaying ? 'PAUSE' : 'PLAY'}]</span>
                    <button
                      onClick={handleNextTrack}
                      className="text-[#FFE600] hover:text-white flex items-center gap-0.5 font-bold uppercase"
                    >
                      <SkipForward size={10} /> NEXT
                    </button>
                  </div>
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
                  {isSecretCh ? 'CH 07 // REAL OST' : `NEXUS CRT // FEED 0${currentCh.num}`}
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
              {isUnlocked ? '★ REAL PERSONA OST UNLOCKED' : `DISCOVERY: ${visitedChannels.size}/6 CHANNELS`}
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
