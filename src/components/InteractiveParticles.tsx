import React, { useEffect, useRef } from 'react';

export const InteractiveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseColor: string;
    }

    const particles: Particle[] = [];

    const mouse = {
      x: 0,
      y: 0,
      active: false,
    };

    // Calculate particle count based on screen area
    const particleCount = Math.min(Math.floor((width * height) / 18000), 80);
    const colors = [
      'rgba(6, 182, 212, ',   // Cyan (Vibrant)
      'rgba(168, 85, 247, ',  // Purple (Accent)
      'rgba(59, 130, 246, '   // Blue (Tech)
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        baseColor: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const maxDistance = 100;
      const mouseMaxDistance = 140;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Update positions
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around bounds
        if (p1.x < 0) p1.x = width;
        else if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        else if (p1.y > height) p1.y = 0;

        // Draw individual particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.baseColor + '0.45)';
        ctx.fill();

        // Interaction with mouse
        if (mouse.active) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseMaxDistance) {
            const alpha = (1 - dist / mouseMaxDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = p1.baseColor + `${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Soft magnetic pull
            p1.x -= dx * 0.012;
            p1.y -= dy * 0.012;
          }
        }

        // Draw connections between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.baseColor + `${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-5 pointer-events-none w-full h-full opacity-60 dark:opacity-40"
    />
  );
};
