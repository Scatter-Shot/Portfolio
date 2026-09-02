"use client";
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Menu() {
  const menuRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Initial screen flash
    tl.fromTo(".flash-overlay", 
      { opacity: 1 }, 
      { opacity: 0, duration: 0.5, ease: "power2.inOut" }
    )
    // 2. Staggered slam-in for menu items
    .fromTo(".menu-item", 
      { x: 300, opacity: 0, skewX: 20 },
      { x: 0, opacity: 1, skewX: -10, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.2"
    )
    // 3. Fade in protagonist name
    .fromTo(".hero-text",
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
      "-=0.5"
    );
  }, { scope: menuRef });

  const navItems = ["01. STATUS", "02. ARSENAL (PROJECTS)", "03. CONFIDANTS", "04. SYSTEM"];

  return (
    <div ref={menuRef} className="relative z-10 w-full h-screen flex items-center justify-between px-10 md:px-24 pointer-events-none">
      {/* Flash overlay for transition */}
      <div className="flash-overlay absolute inset-0 bg-p3cyan z-50 pointer-events-none"></div>

      {/* Left Side - Hero Info */}
      <div className="hero-text pointer-events-auto">
        <p className="text-p3cyan tracking-[0.4em] mb-2 uppercase text-sm font-bold">S.E.E.S. Network</p>
        <h1 className="text-7xl md:text-9xl font-display leading-none text-white drop-shadow-lg">
          VARUN KR. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-p3cyan">KAUSHIK</span>
        </h1>
      </div>

      {/* Right Side - Slanted Menu */}
      <div className="flex flex-col space-y-4 pointer-events-auto">
        {navItems.map((item, i) => (
          <button 
            key={i} 
            className="menu-item transform -skew-x-12 bg-p3glass backdrop-blur-md border border-p3cyan/30 px-12 py-4 text-left hover:bg-p3cyan hover:text-p3dark hover:shadow-cyan-glow transition-all duration-300 group"
          >
            <span className="font-display text-3xl tracking-widest block transform skew-x-12 group-hover:scale-105 transition-transform">
              {item}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}