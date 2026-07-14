import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Cloud, 
  Cpu, 
  Workflow, 
  LayoutDashboard 
} from 'lucide-react';

import { useTranslation } from '../context/TranslationContext';

interface Service {
  title: string;
  description: string;
  details?: string[];
  icon: React.ReactNode;
}

export const Services: React.FC = () => {
  const { t } = useTranslation();
  
  const services: Service[] = [
    {
      title: t('services.customDev.title'),
      description: t('services.customDev.desc'),
      details: [t('services.customDev.detail1'), t('services.customDev.detail2'), t('services.customDev.detail3')],
      icon: <Code2 className="w-6 h-6 text-purple-400" />
    },
    {
      title: t('services.backend.title'),
      description: t('services.backend.desc'),
      details: [t('services.backend.detail1'), t('services.backend.detail2'), t('services.backend.detail3')],
      icon: <Server className="w-6 h-6 text-blue-400" />
    },
    {
      title: t('services.saas.title'),
      description: t('services.saas.desc'),
      details: [t('services.saas.detail1'), t('services.saas.detail2'), t('services.saas.detail3')],
      icon: <Cloud className="w-6 h-6 text-cyan-400" />
    },
    {
      title: t('services.ai.title'),
      description: t('services.ai.desc'),
      details: [t('services.ai.detail1'), t('services.ai.detail2'), t('services.ai.detail3')],
      icon: <Cpu className="w-6 h-6 text-pink-400" />
    },
    {
      title: t('services.devops.title'),
      description: t('services.devops.desc'),
      details: [t('services.devops.detail1'), t('services.devops.detail2'), t('services.devops.detail3')],
      icon: <Workflow className="w-6 h-6 text-emerald-400" />
    },
    {
      title: t('services.digital.title'),
      description: t('services.digital.desc'),
      details: [t('services.digital.detail1'), t('services.digital.detail2'), t('services.digital.detail3')],
      icon: <LayoutDashboard className="w-6 h-6 text-amber-400" />
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="services" className="py-24 px-6 relative overflow-hidden transition-colors duration-300">
      {/* Background radial glow */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-accent-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-gradient mb-4">
            {t('services.title')}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg font-light leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Icon bubble */}
                <div className="w-12 h-12 rounded-xl bg-bg-secondary border border-border-primary flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 group-hover:border-accent-primary/30 transition-all duration-300">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-xl tracking-tight text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6 font-light">
                  {service.description}
                </p>
              </div>

              {/* Bullet points on card bottom */}
              {service.details && (
                <ul className="space-y-2 border-t border-border-secondary pt-4 text-xs text-text-tertiary">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent-primary" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
