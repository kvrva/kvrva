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
      color: 'hover:border-blue-500/30 hover:text-blue-400 shadow-blue-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.002 0c-3.158 0-4.175.14-4.5.176C4.48.36 3.09 1.7 2.87 4.7l-.02 3h6.05v.9H2.85V11.3c0 2 1.05 2.8 2.87 2.8H7.95v-1.7c0-2.5 2-4.5 4.5-4.5h4.5c2.3 0 4.1-1.8 4.1-4.1V3.2c0-1.8-1.5-3.2-3.3-3.2-.8 0-3.3-.03-5.75 0zm-2.4 2a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zm8.46 6.2H14.1c-2.3 0-4.1 1.8-4.1 4.1V16.5c0 1.8 1.5 3.3 3.3 3.3.8 0 3.3.03 5.75 0 3.16 0 4.18-.14 4.5-.176 3.02-.19 4.4-1.5 4.63-4.53l.02-3h-6.05v-.9h6.05V8.5c0-2-1.05-2.8-2.87-2.8H18.06zm-3.46 12a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z"/>
        </svg>
      )
    },
    {
      name: 'FastAPI',
      category: 'frameworks',
      categoryLabel: 'API Framework',
      color: 'hover:border-teal-500/30 hover:text-teal-400 shadow-teal-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L1.5 4.5v6.9c0 6.6 4.5 12.1 10.5 13.6 6-1.5 10.5-7 10.5-13.6V4.5L12 0zm3.9 10.7l-5.3 7.8c-.1.2-.4.3-.6.2l-3.3-1.4c-.3-.1-.3-.5-.1-.7l5.3-5.5-2.9-1.2c-.3-.1-.4-.5-.1-.8l5.3-4.5c.2-.2.6-.1.6.2l1.2 5.2c.1.3-.2.5-.5.4l-2.9-1.2.2.8z"/>
        </svg>
      )
    },
    {
      name: 'NestJS',
      category: 'frameworks',
      categoryLabel: 'Backend Framework',
      color: 'hover:border-red-500/30 hover:text-red-400 shadow-red-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.013 0l-10.33 6.002v11.996l10.33 6.002 10.33-6.002v-11.996l-10.33-6.002zm8.544 17.067l-8.544 4.966-8.544-4.966v-9.932l8.544-4.966 8.544 4.966v9.932zm-3.666-4.966v2.336l-4.878 2.835-4.878-2.835v-5.67l4.878-2.835 4.878 2.835v3.334l-3.335-1.94v-1.395l-1.543-.898-1.543.898v3.593l1.543.898 1.543-.898v-1.334l1.79 1.042z"/>
        </svg>
      )
    },
    {
      name: 'React',
      category: 'frameworks',
      categoryLabel: 'Frontend UI',
      color: 'hover:border-cyan-400/30 hover:text-cyan-400 shadow-cyan-400/5',
      icon: (
        <svg viewBox="-11.5 -10.2 23 20.4" className="w-8 h-8 fill-none stroke-current" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.2">
          <circle cx="0" cy="0" r="2.05" className="fill-current"/>
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </svg>
      )
    },
    {
      name: 'Flutter',
      category: 'frameworks',
      categoryLabel: 'Mobile App SDK',
      color: 'hover:border-blue-400/30 hover:text-blue-300 shadow-blue-400/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.314 0L2.3 12l3.7 3.7 12-12h-3.7zM21.7 12l-6 6 6 6V12zm-3.7-3.7L6 20.3h3.7l12-12h-3.7z"/>
        </svg>
      )
    },
    {
      name: 'Node.js',
      category: 'languages',
      categoryLabel: 'Runtime Environment',
      color: 'hover:border-green-500/30 hover:text-green-400 shadow-green-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L2.5 5.5v11L12 22l9.5-5.5v-11L12 0zm-1.8 17.2l-3-1.7v-7l3-1.7 3 1.7v7l-3 1.7zm3.6-5.2l-1.8-1v2.1l1.8 1v-2.1z"/>
        </svg>
      )
    },
    {
      name: 'Docker',
      category: 'devops',
      categoryLabel: 'Container Engine',
      color: 'hover:border-cyan-500/30 hover:text-cyan-400 shadow-cyan-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.59c0-.103-.084-.186-.186-.186h-2.119c-.103 0-.186.083-.186.186v2.303c0 .102.083.185.186.185zm-2.736 0h2.119c.102 0 .185-.083.185-.185V8.59c0-.103-.083-.186-.185-.186h-2.119c-.103 0-.186.083-.186.186v2.303c0 .102.083.185.186.185zm-2.735 0h2.119c.102 0 .185-.083.185-.185V8.59c0-.103-.083-.186-.185-.186H8.512c-.103 0-.186.083-.186.186v2.303c0 .102.083.185.186.185zm-2.736 0h2.119c.102 0 .186-.083.186-.185V8.59c0-.103-.084-.186-.186-.186H5.776c-.102 0-.186.083-.186.186v2.303c0 .102.084.185.186.185zm5.47-2.737h2.119c.102 0 .185-.083.185-.185V5.852c0-.102-.083-.186-.185-.186h-2.119c-.103 0-.186.084-.186.186v2.303c0 .102.083.185.186.185zm-2.735 0h2.119c.102 0 .185-.083.185-.185V5.852c0-.102-.083-.186-.185-.186H8.512c-.103 0-.186.084-.186.186v2.303c0 .102.083.185.186.185zm0-2.737h2.119c.102 0 .185-.083.185-.186V3.114c0-.102-.083-.186-.185-.186H8.512c-.103 0-.186.084-.186.186v2.303c0 .103.083.186.186.186zm9.208 5.474h-2.119c-.103 0-.186.083-.186.185v2.302c0 .103.083.186.186.186h2.119c.102 0 .186-.083.186-.186v-2.302c0-.102-.084-.185-.186-.185zm-17.29 0h2.119c.103 0 .186-.083.186-.185V8.59c0-.103-.083-.186-.186-.186H2.601c-.102 0-.185.083-.185.186v2.303c0 .102.083.185.185.185zm21.32 1.346c-.227-2.464-1.666-4.478-3.794-5.466l-.427-.197v.758c0 .543-.228.988-.67 1.325-.373.284-.88.423-1.37.423h-.443v1.396c0 .488-.316.82-.727.82h-1.895c-.411 0-.727-.332-.727-.82V8.47c0-.488.316-.82.727-.82h1.39v-.748c0-.487.316-.82.727-.82h1.391v-1.63l-.221-.1C16.924 3.73 15.01 4.148 13.784 5.2c-1.127.967-1.745 2.37-1.745 3.74v3.136c0 .488-.317.82-.728.82H9.416c-.411 0-.727-.332-.727-.82V10.39c0-.488.316-.82.727-.82h.93c.411 0 .727-.332.727-.82V7.355c0-.488-.316-.82-.727-.82H8.8c-.41 0-.727.332-.727.82V8.75c0 .488-.317.82-.728.82H6.416c-.411 0-.728-.332-.728-.82V7.355c0-.488-.316-.82-.727-.82H3.567c-.41 0-.727.332-.727.82v1.396c0 .488-.316.82-.727.82H.872c-.41 0-.727.332-.727.82v2.17c0 .488.317.82.727.82h1.606c.411 0 .727.332.727.82v2.17c0 .488-.316.82-.727.82H.872c-.41 0-.727.332-.727.82v1.63c0 4.542 3.82 8.243 8.5 8.243 7.823 0 12.57-5.918 13.847-11.139.957-.22 1.705-.678 2.217-1.353.385-.515.565-1.15.565-1.802z"/>
        </svg>
      )
    },
    {
      name: 'Kubernetes',
      category: 'devops',
      categoryLabel: 'Orchestration',
      color: 'hover:border-indigo-500/30 hover:text-indigo-400 shadow-indigo-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .002L1.83 3.705v7.41c0 6.276 4.341 12.148 10.17 12.883 5.829-.735 10.17-6.607 10.17-12.883v-7.41L12 .002zm0 2.27l7.9 4.56v9.118l-7.9 4.558-7.9-4.558V6.832l7.9-4.56z"/>
        </svg>
      )
    },
    {
      name: 'AWS',
      category: 'devops',
      categoryLabel: 'Cloud Platform',
      color: 'hover:border-orange-500/30 hover:text-orange-400 shadow-orange-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 13.5c-.3-.2-.7-.1-.9.2-2.1 3-5.6 4.8-9.4 4.8-5.2 0-9.8-3.3-11.2-8.1-.1-.4.3-.7.7-.6 4 .8 8.2 1.2 12.3 1.2 2.7 0 5.4-.2 8-.8.3-.1.6.3.3.5l-.8.8c-.3.3-.7.3-1 0zm1.7-8.6c-.6.9-1.4 1.7-2.3 2.3-.3.2-.7-.1-.6-.5.4-1.4.7-2.9.8-4.4 0-.4.4-.5.6-.2.8.9 1.6 1.9 2.4 2.9.2.3-.1.7-.5.7l-.4-.2z"/>
        </svg>
      )
    },
    {
      name: 'GCP',
      category: 'devops',
      categoryLabel: 'Cloud Platform',
      color: 'hover:border-blue-500/30 hover:text-blue-400 shadow-blue-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
        </svg>
      )
    },
    {
      name: 'PostgreSQL',
      category: 'databases',
      categoryLabel: 'RDBMS Database',
      color: 'hover:border-sky-600/30 hover:text-sky-400 shadow-sky-600/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.92 11.233c.092-.123.163-.264.21-.415.706-2.28-.432-4.707-2.613-5.556-2.18-.85-4.72.062-5.748 2.083a4.702 4.702 0 0 0-2.148-.521H3.61c-.504 0-.913.409-.913.913v6.056c0 1.25.42 2.457 1.196 3.44l.288.358c.84 1.037 2.057 1.705 3.398 1.865a7.35 7.35 0 0 0 3.738-.282c2.028-.718 3.518-2.38 3.98-4.444.295-.084.58-.204.85-.357 1.077-.611 1.954-1.572 2.483-2.735a4.718 4.718 0 0 0 .93-3.418zm-8.888-2.656c-.347 0-.63-.283-.63-.63s.283-.63.63-.63.63.283.63.63-.283.63-.63.63zm-4.72 5.093H3.61v-2.316h2.702v2.316zm0-3.32H3.61V8.034h2.702V10.35z"/>
        </svg>
      )
    },
    {
      name: 'MySQL',
      category: 'databases',
      categoryLabel: 'SQL Database',
      color: 'hover:border-blue-600/30 hover:text-blue-400 shadow-blue-600/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.43 3.123c-.22-.387-.665-.544-1.073-.393a5.53 5.53 0 0 0-3.454 4.095c-.32 1.488.163 3.018 1.252 4.053a4.2 4.2 0 0 0 2.235.975c1.078.147 2.12-.224 2.875-1.01a4.23 4.23 0 0 0 1.127-2.825c0-1.487-.818-2.825-2.12-3.525l-.842-1.37zm-2.673 4.053a.6.6 0 1 1 0-1.2.6.6 0 0 1 0 1.2zm6.2-2.1c.3 0 .5.2.5.5s-.2.5-.5.5-.5-.2-.5-.5.2-.5.5-.5z"/>
        </svg>
      )
    },
    {
      name: 'SQL Server',
      category: 'databases',
      categoryLabel: 'Enterprise SQL',
      color: 'hover:border-red-600/30 hover:text-red-400 shadow-red-600/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C7.58 2 4 3.79 4 6v4c0 2.21 3.58 4 8 4s8-1.79 8-4V6c0-2.21-3.58-4-8-4zm0 10c-3.87 0-6-1.5-6-2s2.13-2 6-2 6 1.5 6 2-2.13 2-6 2zm0 2c-4.42 0-8-1.79-8-4v4c0 2.21 3.58 4 8 4s8-1.79 8-4v-4c0 2.21-3.58 4-8 4zm0 6c-3.87 0-6-1.5-6-2s2.13-2 6-2 6 1.5 6 2-2.13 2-6 2z"/>
        </svg>
      )
    },
    {
      name: 'Linux',
      category: 'devops',
      categoryLabel: 'Operating System',
      color: 'hover:border-amber-500/30 hover:text-amber-400 shadow-amber-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C9.24 2 7 4.24 7 7c0 .93.25 1.8.7 2.55C6.07 10.75 5 12.75 5 15c0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.25-1.07-4.25-2.7-5.45.45-.75.7-1.62.7-2.55 0-2.76-2.24-5-5-5zm0 1.5c1.93 0 3.5 1.57 3.5 3.5S13.93 10.5 12 10.5 8.5 8.93 8.5 7s1.57-3.5 3.5-3.5zM11 12.5h2v3h-2v-3zm0 4h2v1.5h-2v-1.5z"/>
        </svg>
      )
    },
    {
      name: 'Git',
      category: 'devops',
      categoryLabel: 'Version Control',
      color: 'hover:border-orange-600/30 hover:text-orange-400 shadow-orange-600/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.3 10.9L13.1.7c-.8-.8-2-.8-2.8 0L8.7 2.3l3.2 3.2c.8-.3 1.8-.1 2.4.6.6.6.8 1.6.5 2.4l3.2 3.2c.8-.3 1.8-.1 2.4.6.9.8.9 2.2 0 3-.8.9-2.2.9-3 0-.6-.6-.8-1.6-.5-2.4L13.7 9.7c-.3.3-.6.4-1 .4-.4 0-.8-.1-1-.4l-3-3-4.6 4.6c-.8.8-.8 2 0 2.8l10.2 10.2c.8.8 2 .8 2.8 0l10.2-10.2c.8-.8.8-2 0-2.8z"/>
        </svg>
      )
    },
    {
      name: 'OpenCV',
      category: 'ai-tools',
      categoryLabel: 'Computer Vision',
      color: 'hover:border-green-600/30 hover:text-green-400 shadow-green-600/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9.5a3.5 3.5 0 1 1-2.5 1" />
          <path d="M7 16.5a3.5 3.5 0 1 1 2.5-1" />
          <path d="M17 16.5a3.5 3.5 0 1 1-1.5-2.8" />
        </svg>
      )
    },
    {
      name: 'MediaPipe',
      category: 'ai-tools',
      categoryLabel: 'ML Inference',
      color: 'hover:border-purple-500/30 hover:text-purple-400 shadow-purple-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="4" r="2.5" className="fill-current"/>
          <circle cx="5" cy="12" r="2.5" className="fill-current"/>
          <circle cx="19" cy="12" r="2.5" className="fill-current"/>
          <circle cx="12" cy="20" r="2.5" className="fill-current"/>
          <line x1="12" y1="6.5" x2="5" y2="9.5"/>
          <line x1="12" y1="6.5" x2="19" y2="9.5"/>
          <line x1="5" y1="14.5" x2="12" y2="17.5"/>
          <line x1="19" y1="14.5" x2="12" y2="17.5"/>
          <line x1="5" y1="12" x2="19" y2="12" strokeDasharray="2 2"/>
        </svg>
      )
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
