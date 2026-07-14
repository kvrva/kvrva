import React from 'react';
import { motion } from 'framer-motion';
import { Compass, PenTool, GitCommit, CloudLightning, Activity } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const Process: React.FC = () => {
  const { t } = useTranslation();

  const steps: ProcessStep[] = [
    {
      number: '01',
      title: t('process.discovery.title'),
      description: t('process.discovery.desc'),
      icon: <Compass className="w-5 h-5 text-purple-400" />
    },
    {
      number: '02',
      title: t('process.architecture.title'),
      description: t('process.architecture.desc'),
      icon: <PenTool className="w-5 h-5 text-blue-400" />
    },
    {
      number: '03',
      title: t('process.development.title'),
      description: t('process.development.desc'),
      icon: <GitCommit className="w-5 h-5 text-pink-400" />
    },
    {
      number: '04',
      title: t('process.deployment.title'),
      description: t('process.deployment.desc'),
      icon: <CloudLightning className="w-5 h-5 text-emerald-400" />
    },
    {
      number: '05',
      title: t('process.support.title'),
      description: t('process.support.desc'),
      icon: <Activity className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <section id="process" className="py-24 px-6 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] bg-accent-primary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-gradient mb-4">
            {t('process.title')}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg font-light leading-relaxed">
            {t('process.subtitle')}
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-border-primary ml-6 md:ml-8 pl-8 md:pl-12 space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot & number */}
              <div className="absolute -left-[44px] sm:-left-[53px] md:-left-[69px] top-1.5 w-10 h-10 md:w-12 md:h-12 rounded-full border border-border-primary bg-bg-secondary flex items-center justify-center shadow-lg group-hover:border-accent-primary/50 group-hover:shadow-accent-primary/5 transition-all duration-300">
                <span className="text-xs md:text-sm font-display font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                  {step.number}
                </span>
              </div>

              {/* Connector line pulse arrow (decorative) */}
              {index < steps.length - 1 && (
                <div className="absolute -left-[28px] sm:-left-[38px] md:-left-[50px] bottom-[-45px] text-text-tertiary select-none text-base opacity-40">
                  ↓
                </div>
              )}

              {/* Card content */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 hover:bg-bg-secondary/40 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-bg-secondary border border-border-secondary">
                    {step.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
