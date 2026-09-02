"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import P4AnimatedBackground from '@/components/P4AnimatedBackground';
import P4RetroTVStage from '@/components/P4RetroTVStage';
import P4TVStatic from '@/components/P4TVStatic';
import CRTBootScreen from '@/components/CRTBootScreen';
import WeatherWidget from '@/components/WeatherWidget';
import P4MenuButton from '@/components/P4MenuButton';
import P4StatusView from '@/components/P4StatusView';
import P4ArsenalView from '@/components/P4ArsenalView';
import P4SocialLinksView from '@/components/P4SocialLinksView';
import HobbiesView from '@/components/HobbiesView';
import P4SystemView from '@/components/P4SystemView';
import { sound } from '@/utils/soundEngine';

export default function Home() {
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [activeTab, setActiveTab] = useState('MENU'); // 'MENU', 'STATUS', 'ARSENAL', 'SOCIAL_LINKS', 'HOBBIES', 'SYSTEM'
  const [isWiping, setIsWiping] = useState(false);

  // Bulletproof Keyboard shortcut listener (ESC to return to MENU)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isEsc = e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
      if (isEsc) {
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
          document.activeElement.blur();
        }

        if (activeTab !== 'MENU') {
          e.preventDefault();
          e.stopPropagation();
          sound.playBack();
          sound.playTVStatic();
          setIsWiping(true);
          setActiveTab('MENU');
          setTimeout(() => setIsWiping(false), 200);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [activeTab]);

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;

    sound.playSelect();
    sound.playTVStatic();
    setIsWiping(true);
    setActiveTab(newTab);

    setTimeout(() => {
      setIsWiping(false);
    }, 160);
  };

  return (
    <main className="relative w-full h-screen bg-[#FFE600] overflow-hidden select-none flex flex-col font-sans">
      <CustomCursor />

      {/* Interactive CRT TV Power-On Opening Sequence */}
      <AnimatePresence>
        {!isPoweredOn && (
          <CRTBootScreen onComplete={() => setIsPoweredOn(true)} />
        )}
      </AnimatePresence>

      {/* 60fps Animated Canvas Background with Floating TVs & Pop Stars */}
      <P4AnimatedBackground />

      {/* Fast CRT TV Static Channel Wipe */}
      <P4TVStatic isVisible={isWiping} />

      {/* Fixed Top Header HUD */}
      <header className="relative z-40 w-full flex-shrink-0 px-4 sm:px-8 md:px-12 py-2.5 border-b-3 sm:border-b-4 border-black bg-[#FFE600] flex items-center justify-between shadow-sm gap-2">
        {/* Left: Nexus Badge */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black border-2 border-black flex-shrink-0 flex items-center justify-center text-[#FFE600] font-display font-p4-display text-xl sm:text-2xl shadow-[2px_2px_0px_#FF6600] sm:shadow-[3px_3px_0px_#FF6600]">
            ◈
          </div>
          <div className="min-w-0">
            <span className="font-mono text-[10px] sm:text-xs font-black tracking-widest text-[#0c0b05] uppercase block leading-tight truncate">
              NEXUS PROTOCOL // SPECIAL OPERATIONS
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] text-[#665500] tracking-wider hidden md:block font-bold">
              NEXUS ARCHITECT // SYSTEMS & FRONTEND ENG.
            </span>
          </div>
        </div>

        {/* Right: Telemetry & Time Widget */}
        <WeatherWidget />
      </header>

      {/* Fully Scrollable Viewport */}
      <div className="relative z-30 w-full flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start p-4 sm:px-8 md:px-12">
        <AnimatePresence mode="wait">
          
          {/* MAIN MENU */}
          {activeTab === 'MENU' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 14, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-6xl my-auto grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center py-2 will-change-transform"
            >
              {/* Left Column: Interactive Retro TV Monitor (Desktop) */}
              <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
                <P4RetroTVStage />
              </div>

              {/* Right Column: Hero Commands */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-end w-full">
                <div className="text-center lg:text-right mb-2.5 sm:mb-3">
                  <div className="inline-block p4-skew bg-[#0c0b05] text-[#FFE600] px-3 py-0.5 border-2 border-black mb-1 shadow-[3px_3px_0px_#FF6600]">
                    <span className="p4-skew-reverse font-mono text-[10px] sm:text-xs font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase block">
                      NEXUS PROTOCOL // TACTICAL ARCHITECT
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-p4-display text-[#0c0b05] tracking-wider leading-none drop-shadow-[3px_3px_0px_#FFFFFF] sm:drop-shadow-[4px_4px_0px_#FFFFFF]">
                    VARUN KR.<br />
                    <span className="text-[#0c0b05] bg-[#FFFFFF] px-2 border-3 sm:border-4 border-black inline-block mt-1 shadow-[4px_4px_0px_#0c0b05] sm:shadow-[5px_5px_0px_#0c0b05]">
                      KAUSHIK
                    </span>
                  </h1>
                  
                  <p className="font-mono text-[10px] sm:text-xs text-[#0c0b05] font-black mt-1.5 tracking-wider sm:tracking-widest uppercase">
                    CSE UNDERGRAD // C++ & FRONTEND ARCHITECT
                  </p>
                </div>

                {/* 5 Tactical Command Buttons */}
                <div className="w-full max-w-md flex flex-col">
                  {[
                    { id: 'STATUS', label: '01. OPERATIVE DOSSIER', desc: 'Engineer ID & Technical Radar Pentagon' },
                    { id: 'ARSENAL', label: '02. ARSENAL (PROJECTS)', desc: 'Engine Systems & Web Platforms' },
                    { id: 'SOCIAL_LINKS', label: '03. SYSTEM PILLARS', desc: 'Architectural Disciplines & Milestones' },
                    { id: 'HOBBIES', label: '04. SIDE QUESTS (HOBBIES)', desc: 'Games, Sports, Writing & Craft' },
                    { id: 'SYSTEM', label: '05. COMMS TERMINAL', desc: 'Secure Relay Signal Transmission' },
                  ].map((item) => (
                    <P4MenuButton
                      key={item.id}
                      label={item.label}
                      desc={item.desc}
                      onClick={() => handleTabChange(item.id)}
                      onMouseEnter={() => sound.playHover()}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STATUS SCREEN */}
          {activeTab === 'STATUS' && (
            <div className="w-full max-w-5xl my-auto py-2">
              <P4StatusView onBack={() => handleTabChange('MENU')} />
            </div>
          )}

          {/* EQUIP / ARSENAL SCREEN */}
          {activeTab === 'ARSENAL' && (
            <div className="w-full max-w-5xl my-auto py-2">
              <P4ArsenalView onBack={() => handleTabChange('MENU')} />
            </div>
          )}

          {/* SYSTEM PILLARS SCREEN */}
          {activeTab === 'SOCIAL_LINKS' && (
            <div className="w-full max-w-5xl my-auto py-2">
              <P4SocialLinksView onBack={() => handleTabChange('MENU')} />
            </div>
          )}

          {/* SIDE QUESTS / HOBBIES SCREEN */}
          {activeTab === 'HOBBIES' && (
            <div className="w-full max-w-5xl my-auto py-2">
              <HobbiesView onBack={() => handleTabChange('MENU')} />
            </div>
          )}

          {/* COMMS TERMINAL TRANSMIT SCREEN */}
          {activeTab === 'SYSTEM' && (
            <div className="w-full max-w-4xl my-auto py-2">
              <P4SystemView onBack={() => handleTabChange('MENU')} />
            </div>
          )}

        </AnimatePresence>
      </div>

      {/* Fixed Bottom Footer */}
      <footer className="relative z-40 w-full flex-shrink-0 px-4 sm:px-8 md:px-12 py-2 border-t-2 border-black bg-[#FFE600] flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-[#0c0b05] font-bold uppercase tracking-wider sm:tracking-widest shadow-inner">
        <div className="flex items-center gap-3 truncate">
          <span>NEXUS CONSOLE ONLINE // [ESC] TO RETURN</span>
          <button
            onClick={() => { sound.playSelect(); setIsPoweredOn(false); }}
            className="hidden sm:inline-block px-2 py-0.5 bg-black text-[#FFE600] hover:bg-white hover:text-black border border-black font-black transition-colors"
          >
            ↺ REPLAY TV INTRO
          </button>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span className="rainbow-strip w-10 sm:w-14 h-2 border border-black hidden sm:inline-block" />
          <span>NEXUS ENGINE // v6.5</span>
        </div>
      </footer>
    </main>
  );
}