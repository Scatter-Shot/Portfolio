"use client";
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { sound } from '@/utils/soundEngine';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [clicks, setClicks] = useState([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (['BUTTON', 'A', 'INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleClick = (e) => {
      sound.playHover();
      const newClick = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setClicks((prev) => [...prev.slice(-4), newClick]);

      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 500);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Click Bursts */}
      {clicks.map((click) => (
        <div
          key={click.id}
          className="p4-ripple-effect z-[98]"
          style={{
            left: click.x - 25,
            top: click.y - 25,
            width: 50,
            height: 50,
          }}
        />
      ))}

      {/* Center Reticle / Target Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#0c0b05] border border-[#FFE600] pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
        style={{ x: mouseX, y: mouseY }}
      />

      {/* Trailing Persona 4 TV Eyeglasses / Reticle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-black bg-[#FFE600]/20 pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p4-skew shadow-[2px_2px_0px_#0c0b05]"
        style={{ x: smoothX, y: smoothY }}
        animate={{
          scale: isHovering ? 2 : 1,
          rotate: isHovering ? 45 : 0,
          backgroundColor: isHovering ? 'rgba(255, 230, 0, 0.4)' : 'rgba(255, 230, 0, 0.1)',
          borderColor: isHovering ? '#FF6600' : '#0c0b05',
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-1 h-1 bg-black rounded-full" />
      </motion.div>
    </>
  );
}