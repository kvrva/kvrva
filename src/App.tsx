import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GridBackground } from './components/GridBackground';
import { InteractiveParticles } from './components/InteractiveParticles';
import { TranslationProvider } from './context/TranslationContext';

// Sections
import { Hero } from './sections/Hero';
import { Trust } from './sections/Trust';
import { Services } from './sections/Services';
import { AILab } from './sections/AILab';
import { Projects } from './sections/Projects';
import { Process } from './sections/Process';
import { WhyUs } from './sections/WhyUs';
import { About } from './sections/About';
import { TechStack } from './sections/TechStack';
import { CTA } from './sections/CTA';

const AppContent: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Global anchor smooth scroll handler with fixed header offset
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        if (href === '#' || href === '#top') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          return;
        }

        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 90; // Header is h-20 (80px) + 10px spacing
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="relative isolate min-h-screen selection:bg-accent-primary/30 selection:text-text-primary text-text-primary bg-bg-primary overflow-x-hidden font-sans">
      {/* Dynamic Background */}
      <GridBackground />
      <InteractiveParticles />

      {/* Main sticky navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Landing Page Content Sections */}
      <main className="relative z-10 w-full max-w-7xl mx-auto overflow-hidden">
        <Hero />
        <Trust />
        <Services />
        <AILab />
        <Projects />
        <Process />
        <WhyUs />
        <About />
        <TechStack />
        <CTA />
      </main>

      {/* Studio Footer */}
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TranslationProvider>
      <AppContent />
    </TranslationProvider>
  );
};

export default App;
