"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/utils/soundEngine';

const SOCIAL_STATS = [
  { name: 'COURAGE', rank: 'RANK 5 [HEROIC]', desc: 'Fearless C++ low-level debugging & zero-pointer fearlessness', value: 96, angle: -90 },
  { name: 'DILIGENCE', rank: 'RANK 5 [TRANSCENDENT]', desc: 'Rock-solid coding discipline, tests, and architectural consistency', value: 92, angle: -18 },
  { name: 'UNDERSTANDING', rank: 'RANK 5 [SAINTLY]', desc: 'Empathetic product design & intuitive user-first UX intuition', value: 90, angle: 54 },
  { name: 'EXPRESSION', rank: 'RANK 5 [ENTHRALLING]', desc: 'Cinematic motion graphics, tactile micro-interactions & visual flow', value: 95, angle: 126 },
  { name: 'KNOWLEDGE', rank: 'RANK 5 [SAGE-LIKE]', desc: 'Data structures, algorithm complexity & systems design theory', value: 94, angle: 198 }
];

export default function SocialStatsRadar() {
  const [activeStat, setActiveStat] = useState(0);

  const size = 260;
  const center = size / 2;
  const radius = 95;

  const getCoordinates = (angleDeg, r) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    };
  };

  const outerPoints = SOCIAL_STATS.map(s => {
    const { x, y } = getCoordinates(s.angle, radius);
    return `${x},${y}`;
  }).join(' ');

  const valuePoints = SOCIAL_STATS.map(s => {
    const r = (s.value / 100) * radius;
    const { x, y } = getCoordinates(s.angle, r);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-[#0c0b05] text-[#FFE600] border-4 border-black p-3.5 sm:p-5 shadow-[6px_6px_0px_#0c0b05] sm:shadow-[8px_8px_0px_#0c0b05] p4-skew relative select-none">
      <div className="p4-skew-reverse">
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b-2 border-[#FFE600]/40 pb-2 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#FFE600] rotate-45 border border-black" />
            <h4 className="font-display font-p4-display text-lg sm:text-xl text-white tracking-wider">
              SOCIAL ATTRIBUTES // PENTAGON
            </h4>
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] bg-[#FFE600] text-black px-1.5 sm:px-2 py-0.5 font-black uppercase">
            MAX LV. 5
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          
          {/* Responsive Pentagon Diagram */}
          <div className="relative flex items-center justify-center p-2">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[260px] h-auto overflow-visible">
              {/* Concentric Grid Lines */}
              {[0.25, 0.5, 0.75, 1].map((scale, i) => {
                const pts = SOCIAL_STATS.map(s => {
                  const { x, y } = getCoordinates(s.angle, radius * scale);
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <polygon
                    key={i}
                    points={pts}
                    fill={i === 3 ? 'rgba(255, 230, 0, 0.05)' : 'none'}
                    stroke="rgba(255, 230, 0, 0.25)"
                    strokeWidth="1"
                    strokeDasharray={i < 3 ? '3 3' : 'none'}
                  />
                );
              })}

              {/* Radial Axis Lines */}
              {SOCIAL_STATS.map((s, i) => {
                const { x, y } = getCoordinates(s.angle, radius);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="rgba(255, 230, 0, 0.3)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Animated Stat Fill Area */}
              <motion.polygon
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.85 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                points={valuePoints}
                fill="rgba(255, 230, 0, 0.45)"
                stroke="#FFE600"
                strokeWidth="2.5"
                className="filter drop-shadow-[0_0_12px_#FFE600]"
              />

              {/* Interactive Corner Nodes */}
              {SOCIAL_STATS.map((s, i) => {
                const { x, y } = getCoordinates(s.angle, (s.value / 100) * radius);
                const isSelected = activeStat === i;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={isSelected ? 6 : 4}
                    fill={isSelected ? '#FFFFFF' : '#FFE600'}
                    stroke="#0c0b05"
                    strokeWidth="2"
                    className="cursor-pointer transition-all hover:scale-125"
                    onClick={() => { sound.playSelect(); setActiveStat(i); }}
                    onMouseEnter={() => sound.playHover()}
                  />
                );
              })}
            </svg>
          </div>

          {/* Stat Description Card */}
          <div className="bg-[#18160a] border-2 border-[#FFE600]/40 p-3 sm:p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="font-display font-p4-display text-xl sm:text-2xl text-[#FFE600] tracking-wider">
                {SOCIAL_STATS[activeStat].name}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-white bg-black px-1.5 sm:px-2 py-0.5 border border-[#FFE600]/40 font-bold">
                {SOCIAL_STATS[activeStat].rank}
              </span>
            </div>
            
            <p className="font-mono text-[11px] sm:text-xs text-gray-300 leading-relaxed mt-1.5 mb-3">
              {SOCIAL_STATS[activeStat].desc}
            </p>

            {/* Quick Stat Buttons */}
            <div className="grid grid-cols-5 gap-1 pt-2 border-t border-[#FFE600]/20 font-mono text-[9px] text-center">
              {SOCIAL_STATS.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => { sound.playSelect(); setActiveStat(i); }}
                  onMouseEnter={() => sound.playHover()}
                  className={`py-1 border font-bold transition-all ${
                    activeStat === i 
                      ? 'bg-[#FFE600] text-black border-white' 
                      : 'bg-black text-[#FFE600] border-[#FFE600]/40 hover:bg-[#FFE600]/20'
                  }`}
                >
                  {s.name.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
