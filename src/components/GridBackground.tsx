import React, { useState, useEffect } from 'react';

export const GridBackground: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Fade in watermark as user scrolls past 150px down to 600px
      const progress = Math.min(Math.max((scrollY - 150) / 450, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const watermarkOpacity = scrollProgress * 0.18; // Opacity scales smoothly up to 0.18

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg-primary transition-colors duration-300 pointer-events-none">
      {/* Grid Pattern with fade mask */}
      <div 
        className="grid-bg absolute inset-0 opacity-[0.15] dark:opacity-[0.10]" 
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 85%)'
        }}
      />

      {/* Vertical Neon Lines */}
      <div className="absolute inset-x-6 sm:inset-x-12 md:inset-x-20 inset-y-0 flex justify-between pointer-events-none opacity-[0.08] dark:opacity-[0.06]">
        <div className="w-[1px] h-full bg-gradient-to-b from-purple-500/50 via-indigo-500/20 to-transparent" />
        <div className="w-[1px] h-full bg-gradient-to-b from-purple-500/50 via-indigo-500/20 to-transparent hidden sm:block" />
        <div className="w-[1px] h-full bg-gradient-to-b from-purple-500/50 via-indigo-500/20 to-transparent hidden md:block" />
        <div className="w-[1px] h-full bg-gradient-to-b from-purple-500/50 via-indigo-500/20 to-transparent hidden lg:block" />
        <div className="w-[1px] h-full bg-gradient-to-b from-purple-500/50 via-indigo-500/20 to-transparent" />
      </div>

      {/* Floating Ambient Glowing Orbs across the background */}
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-accent-primary opacity-25 dark:opacity-15 blur-[90px] animate-float" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent-secondary opacity-25 dark:opacity-15 blur-[100px] animate-float-reverse" />
      <div className="absolute top-[45%] right-[20%] w-[300px] h-[300px] rounded-full bg-cyan-500 opacity-20 dark:opacity-10 blur-[80px] animate-float" />
      <div className="absolute top-[70%] left-[15%] w-[320px] h-[320px] rounded-full bg-purple-600 opacity-20 dark:opacity-10 blur-[85px] animate-float-reverse" />

      {/* Centered Fixed Neon Watermark Logo (fades in gracefully when scrolling down) */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] md:w-[640px] md:h-[640px] flex items-center justify-center transition-opacity duration-700 ease-out pointer-events-none"
        style={{ opacity: watermarkOpacity }}
      >
        {/* Ambient Neon Backglow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-primary/40 via-accent-secondary/30 to-cyan-500/30 blur-[120px] animate-float" />
        
        {/* Glowing Neon SVG Logo Curve */}
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full text-accent-primary filter drop-shadow-[0_0_50px_rgba(168,85,247,0.45)]"
          fill="none"
          stroke="url(#centered-neon-gradient)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="centered-neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path d="M 3 20 C 3 10, 8 4, 14 4 C 20 4, 21 11, 14 15 C 9 18, 15 20, 21 20" />
        </svg>
      </div>

      {/* Subtle radial overlay to soften edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg-primary)_90%)]" />
    </div>
  );
};
