import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { 
  Layers, 
  Zap, 
  ShieldCheck, 
  Cloud, 
  Code, 
  HeartHandshake 
} from 'lucide-react';

interface ValueProp {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const WhyUs: React.FC = () => {
  const { t } = useTranslation();

  const valueProps: ValueProp[] = [
    {
      title: t('whyUs.arch.title'),
      description: t('whyUs.arch.desc'),
      icon: <Layers className="w-5 h-5 text-purple-400" />
    },
    {
      title: t('whyUs.delivery.title'),
      description: t('whyUs.delivery.desc'),
      icon: <Zap className="w-5 h-5 text-cyan-400" />
    },
    {
      title: t('whyUs.security.title'),
      description: t('whyUs.security.desc'),
      icon: <ShieldCheck className="w-5 h-5 text-pink-400" />
    },
    {
      title: t('whyUs.cloud.title'),
      description: t('whyUs.cloud.desc'),
      icon: <Cloud className="w-5 h-5 text-emerald-400" />
    },
    {
      title: t('whyUs.code.title'),
      description: t('whyUs.code.desc'),
      icon: <Code className="w-5 h-5 text-blue-400" />
    },
    {
      title: t('whyUs.support.title'),
      description: t('whyUs.support.desc'),
      icon: <HeartHandshake className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <section className="py-24 px-6 bg-bg-secondary/20 relative overflow-hidden transition-colors duration-300">
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-accent-secondary/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-gradient mb-4">
            {t('whyUs.title')}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg font-light leading-relaxed">
            {t('whyUs.subtitle')}
          </p>
        </div>

        {/* Grid of Props */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col items-start hover:-translate-y-1 transition-all"
            >
              {/* Icon bubble */}
              <div className="p-3 rounded-xl bg-bg-secondary border border-border-primary mb-5 text-text-primary shadow-xs">
                {prop.icon}
              </div>

              {/* Text */}
              <h3 className="font-display font-semibold text-lg text-text-primary mb-2 tracking-tight">
                {prop.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-light">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
