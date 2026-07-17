import React from 'react';

export const GridBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-bg-primary transition-colors duration-300">
      {/* Grid Pattern with fade mask */}
      <div 
        className="grid-bg absolute inset-0 opacity-[0.15] dark:opacity-[0.08]" 
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)'
        }}
      />

      {/* Refokus-style Vertical Neon Lines */}
      <div className="absolute inset-x-6 sm:inset-x-12 md:inset-x-20 inset-y-0 flex justify-between pointer-events-none opacity-[0.08] dark:opacity-[0.05]">
        <div className="w-[1px] h-full bg-linear-to-b from-purple-500/50 via-indigo-500/20 to-transparent" />
        <div className="w-[1px] h-full bg-linear-to-b from-purple-500/50 via-indigo-500/20 to-transparent hidden sm:block" />
        <div className="w-[1px] h-full bg-linear-to-b from-purple-500/50 via-indigo-500/20 to-transparent hidden md:block" />
        <div className="w-[1px] h-full bg-linear-to-b from-purple-500/50 via-indigo-500/20 to-transparent hidden lg:block" />
        <div className="w-[1px] h-full bg-linear-to-b from-purple-500/50 via-indigo-500/20 to-transparent" />
      </div>

      {/* Floating Glowing Orbs */}
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-accent-primary opacity-20 dark:opacity-10 blur-[80px] animate-float" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent-secondary opacity-20 dark:opacity-10 blur-[90px] animate-float-reverse" />
      <div className="absolute top-[40%] right-[20%] w-[250px] h-[250px] rounded-full bg-cyan-500 opacity-15 dark:opacity-[0.05] blur-[70px] animate-float" />

      {/* Radial overlay to darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--bg-primary)_80%)]" />
    </div>
  );
};
