import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Sparkles } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-[40%] right-[-15%] w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Typography panel (7 columns on desktop) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <span className="text-xs font-semibold tracking-widest text-accent-primary uppercase block mb-3">
                {t('about.label')}
              </span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-gradient leading-tight">
                {t('about.title')}
              </h2>
            </div>

            <div className="space-y-6 text-base sm:text-lg text-text-secondary leading-relaxed font-light">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>

            {/* Mission statement points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-primary">
              <div className="flex gap-3">
                <div className="p-2 h-fit rounded-lg bg-bg-secondary border border-border-secondary text-accent-primary">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-text-primary text-sm mb-1">
                    {t('about.focus.title')}
                  </h4>
                  <p className="text-xs text-text-secondary font-light">
                    {t('about.focus.desc')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2 h-fit rounded-lg bg-bg-secondary border border-border-secondary text-accent-secondary">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-text-primary text-sm mb-1">
                    {t('about.phil.title')}
                  </h4>
                  <p className="text-xs text-text-secondary font-light">
                    {t('about.phil.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium abstract illustration panel (5 columns on desktop) */}
          <div className="lg:col-span-5 aspect-square relative flex items-center justify-center">
            {/* Visual background glows */}
            <div className="absolute inset-0 bg-radial-gradient from-accent-primary/10 via-transparent to-transparent rounded-full blur-2xl animate-pulse" />
            
            {/* Elegant futuristic container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-square rounded-2xl border border-border-primary bg-bg-secondary/30 glass relative overflow-hidden flex flex-col p-8 items-center justify-center"
            >
              <div className="absolute inset-0 opacity-[0.03] grid-bg" />

              {/* Minimalist vector schema of scalable architecture */}
              <svg viewBox="0 0 200 200" className="w-64 h-64 text-text-primary" xmlns="http://www.w3.org/2000/svg">
                {/* Core cluster */}
                <circle cx="100" cy="100" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" className="stroke-accent-primary" />
                <circle cx="100" cy="100" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3" className="stroke-accent-secondary" />
                
                {/* Node 1: API Router */}
                <line x1="100" y1="100" x2="100" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2" className="stroke-text-tertiary" />
                <circle cx="100" cy="40" r="8" fill="var(--bg-secondary)" stroke="currentColor" strokeWidth="1.5" className="stroke-cyan-400" />
                
                {/* Node 2: Database */}
                <line x1="100" y1="100" x2="152" y2="130" stroke="currentColor" strokeWidth="1" strokeDasharray="2" className="stroke-text-tertiary" />
                <circle cx="152" cy="130" r="8" fill="var(--bg-secondary)" stroke="currentColor" strokeWidth="1.5" className="stroke-purple-400" />
                
                {/* Node 3: AI Engine */}
                <line x1="100" y1="100" x2="48" y2="130" stroke="currentColor" strokeWidth="1" strokeDasharray="2" className="stroke-text-tertiary" />
                <circle cx="48" cy="130" r="8" fill="var(--bg-secondary)" stroke="currentColor" strokeWidth="1.5" className="stroke-pink-400" />

                {/* Satellite indicators */}
                <circle cx="100" cy="24" r="2" fill="currentColor" className="fill-cyan-400 animate-ping" />
                <circle cx="164" cy="136" r="2" fill="currentColor" className="fill-purple-400" />
                <circle cx="36" cy="136" r="2" fill="currentColor" className="fill-pink-400" />

                {/* Connecting orbits */}
                <path d="M 48,130 A 70,70 0 0,1 100,40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" className="stroke-text-tertiary" />
                <path d="M 100,40 A 70,70 0 0,1 152,130" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" className="stroke-text-tertiary" />
                <path d="M 152,130 A 70,70 0 0,1 48,130" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4" className="stroke-text-tertiary" />
              </svg>

              {/* Interactive badge overlay */}
              <div className="absolute bottom-6 right-6 glass px-3 py-1.5 rounded-lg border border-border-primary flex items-center gap-1.5 text-xs text-text-secondary select-none">
                <Sparkles className="w-3.5 h-3.5 text-accent-primary animate-pulse" />
                <span className="font-mono">kvrva-engine</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
