import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Interactive3DLogo: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  // Motion values to track mouse coordinate offsets (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth fluid animations
  const springConfig = { stiffness: 120, damping: 15, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform coordinates into 3D rotations
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [25, -25]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);

  // Translate Z-axis layers based on hover state
  const backLayerZ = useSpring(hovered ? -45 : 0, springConfig);
  const middleLayerZ = useSpring(0, springConfig);
  const frontLayerZ = useSpring(hovered ? 45 : 0, springConfig);

  // Glow intensities on hover
  const glowOpacity = useSpring(hovered ? 0.8 : 0.2, springConfig);
  const scale = useSpring(hovered ? 1.08 : 1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position from -0.5 to 0.5 relative to the center of the card
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="flex items-center justify-center py-6 select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-32 h-32 flex items-center justify-center transition-shadow duration-300"
      >
        {/* Glow Shadow Backdrop */}
        <motion.div 
          style={{
            opacity: glowOpacity,
            transform: 'translateZ(-60px)',
          }}
          className="absolute inset-0 bg-accent-primary/20 rounded-full blur-[40px] pointer-events-none"
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
            className="w-24 h-24 text-accent-primary/40 filter blur-[6px] transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
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
            className="w-24 h-24 text-accent-secondary drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
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
          {/* Subtle reflection overlay inside the front path */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full text-text-primary drop-shadow-[0_4px_10px_rgba(255,255,255,0.15)] transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
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
              animate={{ opacity: 0.8, scale: 1 }}
              style={{
                x: 18,
                y: -30,
                z: 25,
              }}
              className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] pointer-events-none"
            />
            {/* Bottom Left Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              style={{
                x: -38,
                y: 28,
                z: -20,
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] pointer-events-none"
            />
            {/* Center Crossing Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              style={{
                x: 14,
                y: 12,
                z: 15,
              }}
              className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] pointer-events-none"
            />
          </>
        )}
      </motion.div>
    </div>
  );
};
