import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Interactive3DLogo: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  // Motion values to track mouse coordinate offsets (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth fluid animations
  const springConfig = { stiffness: 80, damping: 20, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Increased rotation sensitivity (extends to -45 / 45 degrees)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [45, -45]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-45, 45]);

  // Increased translation Z-axis depth for exploded view disassembly
  const backLayerZ = useSpring(hovered ? -80 : 0, springConfig);
  const middleLayerZ = useSpring(0, springConfig);
  const frontLayerZ = useSpring(hovered ? 80 : 0, springConfig);

  // Glow intensities on hover
  const glowOpacity = useSpring(hovered ? 0.75 : 0.15, springConfig);
  const scale = useSpring(hovered ? 1.05 : 0.95, springConfig);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Normalized position from -0.5 to 0.5 relative to the screen center
      const relativeX = e.clientX / width - 0.5;
      const relativeY = e.clientY / height - 0.5;

      mouseX.set(relativeX);
      mouseY.set(relativeY);
      setHovered(true); // Keep exploded view active when mouse is on screen
    };

    const handleMouseLeave = () => {
      setHovered(false);
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      className="flex items-center justify-center select-none w-full h-full"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] flex items-center justify-center"
      >
        {/* Glow Shadow Backdrop */}
        <motion.div 
          style={{
            opacity: glowOpacity,
            transform: 'translateZ(-100px)',
          }}
          className="absolute inset-0 bg-accent-primary/25 rounded-full blur-[80px] pointer-events-none"
        />

        {/* 1. BACK LAYER: Ambient Glow Outline (Pushed back on hover) */}
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            z: backLayerZ,
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[320px] md:h-[320px] text-accent-primary/30 filter blur-[8px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.0"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 3 20 C 3 10, 8 4, 14 4 C 20 4, 21 11, 14 15 C 9 18, 15 20, 21 20" />
          </svg>
        </motion.div>

        {/* 2. MIDDLE LAYER: Tech Purple Frame (Stays centered) */}
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            z: middleLayerZ,
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[320px] md:h-[320px] text-accent-secondary drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 3 20 C 3 10, 8 4, 14 4 C 20 4, 21 11, 14 15 C 9 18, 15 20, 21 20" />
          </svg>
        </motion.div>

        {/* 3. FRONT LAYER: Cyan Glassmorphic Facade (Pushed forward on hover) */}
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            z: frontLayerZ,
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-[320px] md:h-[320px] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full text-text-primary/70 drop-shadow-[0_8px_20px_rgba(255,255,255,0.1)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 3 20 C 3 10, 8 4, 14 4 C 20 4, 21 11, 14 15 C 9 18, 15 20, 21 20" />
            </svg>
          </div>
        </motion.div>

        {/* 4. FLOATING PARTICLES: Tech Connect Nodes (Hover explode) */}
        {hovered && (
          <>
            {/* Top Loop Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              style={{
                x: 35,
                y: -65,
                z: 50,
              }}
              className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] pointer-events-none"
            />
            {/* Bottom Left Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              style={{
                x: -75,
                y: 55,
                z: -40,
              }}
              className="absolute w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc] pointer-events-none"
            />
            {/* Center Crossing Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              style={{
                x: 28,
                y: 25,
                z: 30,
              }}
              className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff] pointer-events-none"
            />
          </>
        )}
      </motion.div>
    </div>
  );
};
