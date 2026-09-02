"use client";
import React, { useState, useEffect } from 'react';
import { sound } from '@/utils/soundEngine';
import { Sun, CloudRain, Cloud, CloudFog, Tv } from 'lucide-react';

const WEATHERS = [
  { id: 'SUNNY', label: 'SUNNY', icon: <Sun size={20} className="text-[#FF6600]" />, desc: 'OPTIMAL INVESTIGATION' },
  { id: 'RAINY', label: 'RAINY', icon: <CloudRain size={20} className="text-blue-500 animate-bounce" />, desc: 'MIDNIGHT CHANNEL ACTIVE' },
  { id: 'FOGGY', label: 'FOGGY', icon: <CloudFog size={20} className="text-yellow-600" />, desc: 'SHADOW INVASION THREAT' },
  { id: 'CLOUDY', label: 'CLOUDY', icon: <Cloud size={20} className="text-gray-500" />, desc: 'OVERCAST IN INABA' },
];

export default function WeatherWidget() {
  const [weatherIdx, setWeatherIdx] = useState(0);
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const month = now.getMonth() + 1;
      const date = now.getDate();
      const day = days[now.getDay()];
      
      setDateStr(`${month}/${date} [${day}]`);
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentWeather = WEATHERS[weatherIdx];

  const cycleWeather = () => {
    sound.playSelect();
    setWeatherIdx((prev) => (prev + 1) % WEATHERS.length);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Persona 4 Retro Inaba TV Weather Box */}
      <div 
        onClick={cycleWeather}
        title="Click to toggle Inaba Weather"
        className="cursor-pointer group select-none"
      >
        <div className="p4-skew bg-[#0c0b05] text-[#FFE600] border-2 border-black px-3.5 py-1.5 shadow-[4px_4px_0px_#0c0b05] group-hover:bg-[#FF6600] group-hover:text-white transition-all">
          <div className="p4-skew-reverse flex items-center gap-2.5">
            <div className="p-1 bg-[#FFE600] text-black rounded-sm group-hover:bg-white transition-colors">
              {currentWeather.icon}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-p4-display text-sm tracking-wider leading-none">
                  {dateStr || '4/11 [THU]'}
                </span>
                <span className="font-mono text-[9px] bg-[#FFE600] text-black px-1 font-bold group-hover:bg-white">
                  AFTER SCHOOL
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#FFE600]/80 group-hover:text-white block tracking-widest uppercase mt-0.5">
                INABA // {currentWeather.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Retro Digital Clock & Midnight Status */}
      <div className="p4-skew bg-white text-black border-2 border-black px-3.5 py-1.5 shadow-[4px_4px_0px_#0c0b05] hidden sm:block">
        <div className="p4-skew-reverse flex items-center gap-2">
          <Tv size={15} className="text-[#FF6600]" />
          <div>
            <span className="font-mono text-[9px] text-gray-500 font-bold block leading-none">
              MIDNIGHT SIGNAL
            </span>
            <span className="font-mono font-bold text-xs tracking-wider text-black leading-tight block mt-0.5">
              {timeStr || '12:00:00 AM'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
