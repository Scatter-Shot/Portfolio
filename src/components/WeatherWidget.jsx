"use client";
import React, { useState, useEffect } from 'react';
import { sound } from '@/utils/soundEngine';
import { Sun, CloudRain, Cloud, CloudFog, Radio } from 'lucide-react';

const WEATHERS = [
  { id: 'SUNNY', label: 'OPTIMAL', icon: <Sun size={18} className="text-[#FF6600]" />, desc: 'OPTIMAL SYSTEM COND.' },
  { id: 'RAINY', label: 'RAIN', icon: <CloudRain size={18} className="text-blue-500 animate-bounce" />, desc: 'PRECIPITATION ACTIVE' },
  { id: 'FOGGY', label: 'FOG', icon: <CloudFog size={18} className="text-yellow-600" />, desc: 'ATMOSPHERIC HAZE' },
  { id: 'CLOUDY', label: 'OVERCAST', icon: <Cloud size={18} className="text-gray-500" />, desc: 'OVERCAST SKY' },
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
    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 select-none">
      {/* Tactical Atmospheric Telemetry Box */}
      <div 
        onClick={cycleWeather}
        title="Click to toggle atmospheric telemetry"
        className="cursor-pointer group select-none"
      >
        <div className="p4-skew bg-[#0c0b05] text-[#FFE600] border-2 border-black px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-[3px_3px_0px_#0c0b05] sm:shadow-[4px_4px_0px_#0c0b05] group-hover:bg-[#FF6600] group-hover:text-white transition-all">
          <div className="p4-skew-reverse flex items-center gap-1.5 sm:gap-2.5">
            <div className="p-0.5 sm:p-1 bg-[#FFE600] text-black rounded-sm group-hover:bg-white transition-colors">
              {currentWeather.icon}
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-display font-p4-display text-xs sm:text-sm tracking-wider leading-none">
                  {dateStr || '9/2 [WED]'}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] bg-[#FFE600] text-black px-1 font-bold group-hover:bg-white hidden sm:inline-block">
                  ONLINE
                </span>
              </div>
              <span className="font-mono text-[8px] sm:text-[9px] text-[#FFE600]/80 group-hover:text-white block tracking-widest uppercase mt-0.5 font-bold">
                ENV // {currentWeather.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Retro Digital Clock & Signal Status */}
      <div className="p4-skew bg-white text-black border-2 border-black px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-[3px_3px_0px_#0c0b05] sm:shadow-[4px_4px_0px_#0c0b05] hidden md:block">
        <div className="p4-skew-reverse flex items-center gap-2">
          <Radio size={15} className="text-[#FF6600]" />
          <div>
            <span className="font-mono text-[9px] text-gray-500 font-bold block leading-none">
              SYSTEM CLOCK
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
