"use client";
import React, { useEffect, useRef, useState } from 'react';
import { sound } from '@/utils/soundEngine';

export default function CustomCursor() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Mouse coords & lerp positions
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const animFrameId = useRef(null);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad on desktop/laptop)
    const isFine = window.matchMedia('(pointer: fine)').matches;
    setIsPointerFine(isFine);
    if (!isFine) return;

    const handleMouseMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      // Move center dot instantly with zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e) => {
      if (['BUTTON', 'A', 'INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.closest('button')) {
        isHovering.current = true;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(1.6) rotate(45deg)`;
          ringRef.current.style.borderColor = '#FF6600';
          ringRef.current.style.backgroundColor = 'rgba(255, 230, 0, 0.35)';
        }
      } else {
        isHovering.current = false;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(1) rotate(0deg)`;
          ringRef.current.style.borderColor = '#0c0b05';
          ringRef.current.style.backgroundColor = 'rgba(255, 230, 0, 0.15)';
        }
      }
    };

    const handleMouseDown = (e) => {
      sound.playHover();
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(0.8) rotate(15deg)`;
      }
    };

    const handleMouseUp = () => {
      if (ringRef.current) {
        const scale = isHovering.current ? 1.6 : 1;
        const rot = isHovering.current ? 45 : 0;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`;
      }
    };

    // Fluid 60/120/144Hz RAF loop for the trailing reticle
    const loop = () => {
      // Snappy lerp factor (0.28 = tight, responsive, zero perceived lag)
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.28;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.28;

      if (ringRef.current) {
        const scale = isHovering.current ? 1.6 : 1;
        const rot = isHovering.current ? 45 : 0;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!isPointerFine) return null;

  return (
    <>
      {/* Instant Center Reticle Target Dot (Zero Latency Direct GPU transform) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#0c0b05] border border-[#FFE600] pointer-events-none z-[100] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />

      {/* Silky-Smooth Trailing Tactical Reticle (Hardware GPU accelerated) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 border-2 border-black bg-[#FFE600]/15 pointer-events-none z-[99] will-change-transform p4-skew shadow-[2px_2px_0px_#0c0b05] flex items-center justify-center transition-[background-color,border-color] duration-150"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="w-1 h-1 bg-black rounded-full" />
      </div>
    </>
  );
}