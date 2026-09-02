"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import P4AnimatedBackground from '@/components/P4AnimatedBackground';
import P4RetroTVStage from '@/components/P4RetroTVStage';
import P4TVStatic from '@/components/P4TVStatic';
import WeatherWidget from '@/components/WeatherWidget';
import P4MenuButton from '@/components/P4MenuButton';
import P4StatusView from '@/components/P4StatusView';
import P4ArsenalView from '@/components/P4ArsenalView';
import P4SocialLinksView from '@/components/P4SocialLinksView';
import P4SystemView from '@/components/P4SystemView';
import { sound } from '@/utils/soundEngine';

export default function Home() {
  const [activeTab, setActiveTab] = useState('MENU'); // 'MENU', 'STATUS', 'ARSENAL', 'SOCIAL_LINKS', 'SYSTEM'
  const [isWiping, setIsWiping] = useState(false);

  // Keyboard shortcut listener (ESC to return to MENU)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeTab !== 'MENU') {
        handleTabChange('MENU');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  const handleTabChange = (newTab) => {
    if (newTab === activeTab || isWiping) return;

    sound.playSelect();
    sound.playTVStatic();
    setIsWiping(true);

    setTimeout(() => {
      setActiveTab(newTab);
    }, 120); // Fast, crisp transition

    setTimeout(() => {
      setIsWiping(false);
    }, 320);
  };

  return (
    <main className="relative w-full h-screen bg-[#FFE600] overflow-hidden select-none flex flex-col justify-between font-sans">
      <CustomCursor />

      {/* 60fps Animated Canvas Background with Floating TVs & Pop Stars */}
      <P4AnimatedBackground />

      {/* Fast CRT TV Static Channel Wipe */}
      <P4TVStatic isVisible={isWiping} />

      {/* Persona 4 Golden Top Header HUD */}
      <header className="relative z-40 w-full px-6 md:px-12 pt-3.5 pb-2.5 border-b-4 border-black bg-[#FFE600] flex items-center justify-between shadow-sm">
        {/* Left: Investigation Team Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black border-2 border-black flex items-center justify-center text-[#FFE600] font-display font-p4-display text-xl shadow-[3px_3px_0px_#FF6600]">
            P4
          </div>
          <div>
            <span className="font-mono text-xs font-black tracking-widest text-[#0c0b05] uppercase block leading-tight">
              INABA INVESTIGATION TEAM // SPECIAL OPERATIONS
            </span>
            <span className="font-mono text-[9px] text-[#665500] tracking-wider hidden sm:block font-bold">
              YASOGAMI HIGH // MIDNIGHT CHANNEL MONITORING
            </span>
          </div>
        </div>

        {/* Right: Weather & Time Widget */}
        <WeatherWidget />
      </header>

      {/* Interactive Main Viewport (Zero Overlaps) */}
      <div className="relative z-30 w-full flex-1 flex items-center justify-center px-6 md:px-12 py-3 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* MAIN MENU: Balanced 2-Column Layout */}
          {activeTab === 'MENU' && !isWiping && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Interactive Retro TV Set */}
              <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
                <P4RetroTVStage />
              </div>

              {/* Right Column: Hero Commands */}
              <div className="lg:col-span-7 flex flex-col items-end w-full">
                <div className="text-right mb-5">
                  <div className="inline-block p4-skew bg-[#0c0b05] text-[#FFE600] px-3 py-0.5 border-2 border-black mb-2 shadow-[3px_3px_0px_#FF6600]">
                    <span className="p4-skew-reverse font-mono text-xs font-black tracking-[0.3em] uppercase block">
                      INVESTIGATION COMMAND
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-display font-p4-display text-[#0c0b05] tracking-wider leading-none drop-shadow-[4px_4px_0px_#FFFFFF]">
                    VARUN KR.<br />
                    <span className="text-[#0c0b05] bg-[#FFFFFF] px-2 border-4 border-black inline-block mt-1 shadow-[5px_5px_0px_#0c0b05]">
                      KAUSHIK
                    </span>
                  </h1>
                  
                  <p className="font-mono text-xs text-[#0c0b05] font-black mt-2.5 tracking-widest uppercase">
                    CSE UNDERGRAD // C++ & FRONTEND ARCHITECT
                  </p>
                </div>

                {/* 4 P4 Command Buttons */}
                <div className="w-full max-w-md flex flex-col">
                  {[
                    { id: 'STATUS', label: '01. STATUS', desc: 'Operative ID & Social Stats Pentagon' },
                    { id: 'ARSENAL', label: '02. EQUIP (ARSENAL)', desc: 'Weaponry & Featured Projects' },
                    { id: 'SOCIAL_LINKS', label: '03. SOCIAL LINKS', desc: 'Tarot Arcana Bonds & Skills' },
                    { id: 'SYSTEM', label: '04. MIDNIGHT CHANNEL', desc: 'Dispatch Broadcast Transmission' },
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

          {/* STATUS SCREEN (Full Stage, Clean Scroll) */}
          {activeTab === 'STATUS' && !isWiping && (
            <div className="w-full max-h-[82vh] overflow-y-auto pr-1">
              <P4StatusView onBack={() => handleTabChange('MENU')} />
            </div>
          )}

          {/* EQUIP / ARSENAL SCREEN (Full Stage, Clean Scroll) */}
          {activeTab === 'ARSENAL' && !isWiping && (
            <div className="w-full max-h-[82vh] overflow-y-auto pr-1">
              <P4ArsenalView onBack={() => handleTabChange('MENU')} />
            </div>
          )}

          {/* SOCIAL LINKS SCREEN (Full Stage, Clean Scroll) */}
          {activeTab === 'SOCIAL_LINKS' && !isWiping && (
            <div className="w-full max-h-[82vh] overflow-y-auto pr-1">
              <P4SocialLinksView onBack={() => handleTabChange('MENU')} />
            </div>
          )}

          {/* SYSTEM / MIDNIGHT CHANNEL TRANSMIT SCREEN */}
          {activeTab === 'SYSTEM' && !isWiping && (
            <div className="w-full max-h-[82vh] overflow-y-auto pr-1">
              <P4SystemView onBack={() => handleTabChange('MENU')} />
            </div>
          )}

        </AnimatePresence>
      </div>

      {/* Persona 4 Golden Footer */}
      <footer className="relative z-40 w-full px-6 md:px-12 py-2 border-t-2 border-black bg-[#FFE600] flex justify-between items-center text-[10px] font-mono text-[#0c0b05] font-bold uppercase tracking-widest shadow-inner">
        <span>INVESTIGATION UNIT ACTIVE // PRESS [ESC] TO RETURN</span>
        <div className="flex items-center gap-3">
          <span className="rainbow-strip w-14 h-2 border border-black hidden sm:inline-block" />
          <span>PERSONA 4 GOLDEN // ENGINE v5.5</span>
        </div>
      </footer>
    </main>
  );
}