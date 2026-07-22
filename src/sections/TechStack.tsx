import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface TechItem {
  name: string;
  category: 'languages' | 'frameworks' | 'devops' | 'databases' | 'ai-tools';
  categoryLabel: string;
  color: string; // Brand color hex or class
  icon: React.ReactNode;
}

export const TechStack: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', name: t('techStack.filters.all') },
    { id: 'languages', name: t('techStack.filters.languages') },
    { id: 'frameworks', name: t('techStack.filters.frameworks') },
    { id: 'devops', name: t('techStack.filters.devops') },
    { id: 'databases', name: t('techStack.filters.databases') },
    { id: 'ai-tools', name: t('techStack.filters.aiTools') }
  ];

  const techItems: TechItem[] = [
    {
      name: 'Python',
      category: 'languages',
      categoryLabel: 'Language',
      color: 'hover:border-blue-500/40 hover:bg-blue-950/10 shadow-blue-500/5',
      icon: <img src="/logos/Python-logo-notext.svg.webp" alt="Python" className="w-9 h-9 object-contain" />
    },
    {
      name: 'FastAPI',
      category: 'frameworks',
      categoryLabel: 'API Framework',
      color: 'hover:border-teal-500/40 hover:bg-teal-950/10 shadow-teal-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L1.5 4.5v6.9c0 6.6 4.5 12.1 10.5 13.6 6-1.5 10.5-7 10.5-13.6V4.5L12 0z" fill="#009688"/>
          <path d="M15.9 10.7l-5.3 7.8c-.1.2-.4.3-.6.2l-3.3-1.4c-.3-.1-.3-.5-.1-.7l5.3-5.5-2.9-1.2c-.3-.1-.4-.5-.1-.8l5.3-4.5c.2-.2.6-.1.6.2l1.2 5.2c.1.3-.2.5-.5.4l-2.9-1.2.2.8z" fill="#FFF"/>
        </svg>
      )
    },
    {
      name: 'NestJS',
      category: 'frameworks',
      categoryLabel: 'Backend Framework',
      color: 'hover:border-red-500/40 hover:bg-red-950/10 shadow-red-500/5',
      icon: <img src="/logos/NestJS.svg" alt="NestJS" className="w-9 h-9 object-contain" />
    },
    {
      name: 'React',
      category: 'frameworks',
      categoryLabel: 'Frontend UI',
      color: 'hover:border-cyan-400/40 hover:bg-cyan-950/10 shadow-cyan-400/5',
      icon: <img src="/logos/React-icon.svg.webp" alt="React" className="w-9 h-9 object-contain" />
    },
    {
      name: 'Flutter',
      category: 'frameworks',
      categoryLabel: 'Mobile App SDK',
      color: 'hover:border-blue-400/40 hover:bg-blue-950/10 shadow-blue-400/5',
      icon: <img src="/logos/Flutter_logo.svg.webp" alt="Flutter" className="w-9 h-9 object-contain" />
    },
    {
      name: 'Node.js',
      category: 'languages',
      categoryLabel: 'Runtime Environment',
      color: 'hover:border-green-500/40 hover:bg-green-950/10 shadow-green-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L2.5 5.5v11L12 22l9.5-5.5v-11L12 0z" fill="#339933"/>
          <path d="M12 2.2l7.3 4.2v8.4L12 19.1l-7.3-4.2V6.4L12 2.2z" fill="#FFF"/>
          <path d="M10.2 12v-2.1h1.5V12h-1.5z" fill="#FFF"/>
        </svg>
      )
    },
    {
      name: 'Docker',
      category: 'devops',
      categoryLabel: 'Container Engine',
      color: 'hover:border-cyan-500/40 hover:bg-cyan-950/10 shadow-cyan-500/5',
      icon: <img src="/logos/docker_icon_130955.webp" alt="Docker" className="w-9 h-9 object-contain" />
    },
    {
      name: 'DigitalOcean',
      category: 'devops',
      categoryLabel: 'Cloud Hosting & VPS',
      color: 'hover:border-blue-600/40 hover:bg-blue-950/10 shadow-blue-600/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.012 0C5.378 0 0 5.378 0 12.012c0 6.634 5.378 12.012 12.012 12.012 6.634 0 12.012-5.378 12.012-12.012H18.01c0 3.308-2.69 5.998-5.998 5.998a5.998 5.998 0 01-5.998-5.998c0-3.308 2.69-5.998 5.998-5.998v-6.01zm6.002 6.006h6v6h-6v-6zm3 9.006h3v3h-3v-3zm-6 6h3v3h-3v-3z" fill="#0080FF"/>
        </svg>
      )
    },
    {
      name: 'PostgreSQL',
      category: 'databases',
      categoryLabel: 'RDBMS Database',
      color: 'hover:border-sky-600/40 hover:bg-sky-950/10 shadow-sky-600/5',
      icon: <img src="/logos/Postgresql_elephant.svg.webp" alt="PostgreSQL" className="w-9 h-9 object-contain" />
    },
    {
      name: 'MySQL',
      category: 'databases',
      categoryLabel: 'SQL Database',
      color: 'hover:border-blue-600/40 hover:bg-blue-950/10 shadow-blue-600/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.43 3.123c-.22-.387-.665-.544-1.073-.393a5.53 5.53 0 0 0-3.454 4.095c-.32 1.488.163 3.018 1.252 4.053a4.2 4.2 0 0 0 2.235.975c1.078.147 2.12-.224 2.875-1.01a4.23 4.23 0 0 0 1.127-2.825c0-1.487-.818-2.825-2.12-3.525l-.842-1.37zm-2.673 4.053a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2zm6.2-2.1c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5.2-.5.5-.5z" fill="#00758F"/>
        </svg>
      )
    },
    {
      name: 'SQL Server',
      category: 'databases',
      categoryLabel: 'Enterprise SQL',
      color: 'hover:border-red-600/40 hover:bg-red-950/10 shadow-red-600/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C7.58 2 4 3.79 4 6v4c0 2.21 3.58 4 8 4s8-1.79 8-4V6c0-2.21-3.58-4-8-4zm0 10c-3.87 0-6-1.5-6-2s2.13-2 6-2 6 1.5 6 2-2.13 2-6 2zm0 2c-4.42 0-8-1.79-8-4v4c0 2.21 3.58 4 8 4s8-1.79 8-4v-4c0 2.21-3.58 4-8 4zm0 6c-3.87 0-6-1.5-6-2s2.13-2 6-2 6 1.5 6 2-2.13 2-6 2z" fill="#CC2927"/>
        </svg>
      )
    },
    {
      name: 'Linux',
      category: 'devops',
      categoryLabel: 'Operating System',
      color: 'hover:border-amber-500/40 hover:bg-amber-950/10 shadow-amber-500/5',
      icon: <img src="/logos/Pinguino-Linux.png" alt="Linux" className="w-9 h-9 object-contain" />
    },
    {
      name: 'Git',
      category: 'devops',
      categoryLabel: 'Version Control',
      color: 'hover:border-orange-600/40 hover:bg-orange-950/10 shadow-orange-600/5',
      icon: <img src="/logos/Git_icon.svg.webp" alt="Git" className="w-9 h-9 object-contain" />
    },
    {
      name: 'OpenCV',
      category: 'ai-tools',
      categoryLabel: 'Computer Vision',
      color: 'hover:border-green-600/40 hover:bg-green-950/10 shadow-green-600/5',
      icon: <img src="/logos/opencv_logo_icon_170887.webp" alt="OpenCV" className="w-9 h-9 object-contain" />
    },
    {
      name: 'MediaPipe',
      category: 'ai-tools',
      categoryLabel: 'ML Inference',
      color: 'hover:border-purple-500/40 hover:bg-purple-950/10 shadow-purple-500/5',
      icon: <img src="/logos/logo-mediapipe.png" alt="MediaPipe" className="w-9 h-9 object-contain" />
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? techItems
    : techItems.filter(item => item.category === activeFilter);

  return (
    <section id="tech-stack" className="py-24 px-6 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] bg-accent-secondary/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-gradient mb-4">
            {t('techStack.title')}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg font-light leading-relaxed">
            {t('techStack.subtitle')}
          </p>
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-full border transition-all duration-300 cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-text-primary text-bg-primary border-text-primary'
                  : 'bg-bg-secondary text-text-secondary border-border-primary hover:border-text-secondary hover:text-text-primary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Stack interactive grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto"
        >
          {filteredItems.map((tech) => (
            <motion.div
              layout
              key={tech.name}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className={`glass-card rounded-2xl p-5 flex flex-col items-center text-center justify-center border border-border-primary bg-bg-secondary/20 shadow-xs group transition-all duration-300 cursor-default select-none ${tech.color}`}
            >
              {/* Tech Icon wrapper */}
              <div className="text-text-secondary group-hover:scale-110 transition-transform duration-300 mb-4 h-12 flex items-center justify-center">
                {tech.icon}
              </div>
              
              <h3 className="font-display font-semibold text-sm text-text-primary mb-1">
                {tech.name}
              </h3>
              
              <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider block">
                {tech.categoryLabel}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Small stack validation badge */}
        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-text-tertiary select-none">
          <Check className="w-4 h-4 text-green-500" />
          <span>{t('techStack.checkText')}</span>
        </div>
      </div>
    </section>
  );
};
