import React from 'react';
import { ArrowRight, Sparkles, Code, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { CodeSnippet } from '../components/CodeSnippet';
import { Interactive3DLogo } from '../components/Interactive3DLogo';
import { useTranslation } from '../context/TranslationContext';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
      {/* Decorative gradient radial overlay */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[350px] bg-gradient-to-r from-accent-primary/20 via-accent-secondary/20 to-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main container */}
      <div className="w-full max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Interactive 3D Exploded Logo */}
        <Interactive3DLogo />

        {/* Modern floating pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-primary/25 bg-accent-primary/5 text-xs text-accent-primary mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-semibold tracking-wide uppercase">{t('hero.badge')}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-gradient leading-none max-w-4xl"
        >
          {t('hero.title1')} <br className="hidden sm:inline" />
          {t('hero.title2')}{' '}
          <span className="text-gradient-purple-blue">{t('hero.title3')}</span>.
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mt-6 leading-relaxed font-light"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
        >
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-accent-primary to-accent-secondary hover:brightness-110 text-white font-medium text-base transition-all duration-300 shadow-lg shadow-accent-primary/20 cursor-pointer group"
          >
            <span>{t('hero.btnPrimary')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#projects"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border-primary bg-bg-secondary hover:bg-bg-tertiary text-text-primary hover:text-white font-medium text-base transition-all duration-300 glass cursor-pointer"
          >
            <span>{t('hero.btnSecondary')}</span>
          </a>
        </motion.div>

        {/* Animated Code snippet section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, type: 'spring', stiffness: 50 }}
          className="w-full min-w-0 max-w-full mt-20 relative px-2 sm:px-4"
        >
          <CodeSnippet />
          
          {/* Decorative floating code tags */}
          <div className="hidden lg:block absolute -left-12 top-10 p-3 rounded-lg border border-border-primary bg-bg-secondary/80 glass shadow-md rotate-[-8deg] pointer-events-none">
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Code className="w-3.5 h-3.5" />
              <span>FastAPI</span>
            </div>
          </div>

          <div className="hidden lg:block absolute -right-8 bottom-12 p-3 rounded-lg border border-border-primary bg-bg-secondary/80 glass shadow-md rotate-[6deg] pointer-events-none">
            <div className="flex items-center gap-1.5 text-xs font-mono text-green-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>k8s-deploy.yml</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
