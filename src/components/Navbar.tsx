import React, { useState } from 'react';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  const navLinks = [
    { name: t('navbar.services'), href: '#services' },
    { name: t('navbar.projects'), href: '#projects' },
    { name: t('navbar.lab'), href: '#lab' },
    { name: t('navbar.process'), href: '#process' },
    { name: t('navbar.about'), href: '#about' },
    { name: t('navbar.techStack'), href: '#tech-stack' }
  ];

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full glass border-b border-border-primary transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        
        {/* Left Side: MENU Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border-primary hover:border-text-primary/40 hover:bg-bg-secondary text-[11px] font-mono font-medium tracking-wider uppercase text-text-primary transition-all duration-300 cursor-pointer shadow-xs"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-3.5 h-3.5 text-accent-primary" /> : <Menu className="w-3.5 h-3.5" />}
          <span>{language === 'en' ? 'Menu' : 'Menú'}</span>
        </button>

        {/* Center: Brand Logo (Centered Absolutely) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <a href="#" className="flex items-center gap-2 group">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 sm:w-9 sm:h-9 text-accent-primary group-hover:scale-105 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 3 20 C 3 10, 8 4, 14 4 C 20 4, 21 11, 14 15 C 9 18, 15 20, 21 20" />
            </svg>
            <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-text-primary">
              KVRVA
            </span>
          </a>
        </div>

        {/* Right Side: Quick Action Button & Toggles */}
        <div className="flex items-center gap-4">
          {/* Desktop Toggles */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <button
              onClick={handleLanguageToggle}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border-primary hover:bg-bg-secondary text-xs font-mono font-semibold text-text-secondary hover:text-text-primary transition-all duration-300 cursor-pointer"
              aria-label="Toggle language"
            >
              <span className={language === 'en' ? 'text-text-primary font-bold' : 'text-text-tertiary font-light'}>EN</span>
              <span className="text-text-tertiary">/</span>
              <span className={language === 'es' ? 'text-text-primary font-bold' : 'text-text-tertiary font-light'}>ES</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border-primary hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-all duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-purple-600" />
              )}
            </button>
          </div>

          {/* Quick Contact Button (Oval) */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full border border-border-primary bg-text-primary text-bg-primary hover:bg-bg-secondary hover:text-text-primary hover:border-text-primary/30 text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-xs"
          >
            <span>{language === 'en' ? 'Contact' : 'Contacto'}</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Slide-out Menu Overlay Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-20 left-0 right-0 w-full glass border-b border-border-primary shadow-2xl z-40 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              
              {/* Navigation Links Column */}
              <div className="md:col-span-8 flex flex-col gap-4.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary mb-1">
                  {language === 'en' ? 'Navigation' : 'Navegación'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between text-2xl font-display font-medium text-text-secondary hover:text-text-primary transition-all duration-300 py-1.5 border-b border-white/5"
                    >
                      <span>{link.name}</span>
                      <motion.span 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-accent-primary pr-2"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        →
                      </motion.span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Preferences and Metadata Column */}
              <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border-primary pt-8 md:pt-0 md:pl-10 gap-6">
                
                {/* Preferences Block */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary block">
                    {language === 'en' ? 'Preferences' : 'Preferencias'}
                  </span>
                  
                  {/* Preferences Toggles */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Language Switcher */}
                    <button
                      onClick={handleLanguageToggle}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border-primary text-xs font-mono font-semibold text-text-secondary cursor-pointer bg-bg-secondary hover:text-text-primary transition-colors"
                      aria-label="Toggle language"
                    >
                      <span className={language === 'en' ? 'text-text-primary font-bold' : 'text-text-tertiary font-light'}>EN</span>
                      <span className="text-text-tertiary">/</span>
                      <span className={language === 'es' ? 'text-text-primary font-bold' : 'text-text-tertiary font-light'}>ES</span>
                    </button>

                    {/* Theme Switcher */}
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-lg border border-border-primary text-text-secondary hover:text-text-primary cursor-pointer bg-bg-secondary hover:text-text-primary transition-colors"
                      aria-label="Toggle theme"
                    >
                      {theme === 'dark' ? (
                        <Sun className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <Moon className="w-4 h-4 text-purple-600" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Studio Meta Block */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary block">
                    {language === 'en' ? 'Location' : 'Ubicación'}
                  </span>
                  <p className="text-sm font-light text-text-secondary">
                    Santiago, Chile / Remote
                  </p>
                  <p className="text-xs font-mono text-accent-primary mt-1">
                    contacto@kvrva.com
                  </p>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
