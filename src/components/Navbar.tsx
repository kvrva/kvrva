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
    { name: t('navbar.process'), href: '#process' },
    { name: t('navbar.about'), href: '#about' },
    { name: t('navbar.techStack'), href: '#tech-stack' }
  ];

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border-primary transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 text-accent-primary group-hover:scale-105 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 3 20 C 3 10, 8 4, 14 4 C 20 4, 21 11, 14 15 C 9 18, 15 20, 21 20" />
          </svg>
          <span className="font-display font-black text-2xl tracking-tighter text-text-primary">
            KVRVA
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
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

          {/* Primary Action Button */}
          <a
            href="#contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-text-primary text-bg-primary hover:bg-opacity-90 font-medium text-sm transition-all shadow-md group cursor-pointer"
          >
            <span>{t('navbar.startProject')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Mobile controls toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-border-primary text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu with animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 right-0 md:hidden glass border-t border-b border-border-primary overflow-hidden z-50 shadow-2xl"
          >
            <div className="flex flex-col gap-4 px-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-text-secondary hover:text-text-primary transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-border-primary my-2" />

              {/* Mobile Preferences Toggles */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary font-medium">
                  {language === 'en' ? 'Preferences' : 'Preferencias'}
                </span>
                <div className="flex items-center gap-3">
                  {/* Language Selector */}
                  <button
                    onClick={handleLanguageToggle}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border-primary text-xs font-mono font-semibold text-text-secondary cursor-pointer bg-bg-secondary"
                    aria-label="Toggle language"
                  >
                    <span className={language === 'en' ? 'text-text-primary font-bold' : 'text-text-tertiary font-light'}>EN</span>
                    <span className="text-text-tertiary">/</span>
                    <span className={language === 'es' ? 'text-text-primary font-bold' : 'text-text-tertiary font-light'}>ES</span>
                  </button>

                  {/* Theme Selector */}
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg border border-border-primary text-text-secondary hover:text-text-primary cursor-pointer bg-bg-secondary"
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

              <hr className="border-border-primary my-2" />
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-text-primary text-bg-primary hover:bg-opacity-90 font-medium text-sm transition-all"
              >
                <span>{t('navbar.startProject')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
