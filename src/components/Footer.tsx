import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';


export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bg-secondary border-t border-border-primary py-16 px-6 relative transition-colors duration-300">
      {/* Background glow overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative">
        {/* Company Info */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              className="w-9 h-9 text-accent-primary"
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
          </div>
          <p className="text-sm text-text-secondary max-w-sm leading-relaxed font-light">
            {t('footer.desc')}
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-md hover:bg-bg-primary"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-md hover:bg-bg-primary"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="mailto:contacto@kvrva.com"
              className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-md hover:bg-bg-primary"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-sm tracking-wider uppercase text-text-primary mb-4">
            {t('footer.quickLinks')}
          </h4>
          <ul className="space-y-2.5">
            <li>
              <a href="#services" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {t('navbar.services')}
              </a>
            </li>
            <li>
              <a href="#projects" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {t('navbar.projects')}
              </a>
            </li>
            <li>
              <a href="#process" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {t('navbar.process')}
              </a>
            </li>
            <li>
              <a href="#about" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {t('navbar.about')}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-display font-semibold text-sm tracking-wider uppercase text-text-primary mb-4">
            {t('footer.inquiries')}
          </h4>
          <ul className="space-y-2.5">
            <li className="text-sm text-text-secondary font-light">
              {t('footer.location')}
            </li>
            <li>
              <a
                href="mailto:contacto@kvrva.com"
                className="text-sm text-accent-primary hover:underline font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>contacto@kvrva.com</span>
              </a>
            </li>
            <li>
              <a
                href="tel:+56930876984"
                className="text-sm text-text-secondary hover:text-accent-primary transition-colors font-light flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>+56 9 3087 6984</span>
              </a>
            </li>
            <li className="pt-1">
              <a
                href="#contact"
                className="text-xs inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors px-2.5 py-1 rounded-full border border-border-primary hover:border-text-secondary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>{t('footer.availability')}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border-primary flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-tertiary">
        <div>
          &copy; {currentYear} KVRVA Studio. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
