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
      icon: <img src="/logos/fastapi-logo-png-svg.webp" alt="FastAPI" className="w-9 h-9 object-contain" />
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
      name: 'AWS',
      category: 'devops',
      categoryLabel: 'Cloud Platform',
      color: 'hover:border-orange-500/40 hover:bg-orange-950/10 shadow-orange-500/5',
      icon: <img src="/logos/amazon-web-services-aws-logo-11760037608kihongewng.webp" alt="AWS" className="w-9 h-9 object-contain" />
    },
    {
      name: 'GCP',
      category: 'devops',
      categoryLabel: 'Cloud Platform',
      color: 'hover:border-blue-500/40 hover:bg-blue-950/10 shadow-blue-500/5',
      icon: <img src="/logos/Logo-google-cloud-icon-vector-PNG.png" alt="GCP" className="w-9 h-9 object-contain" />
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
      icon: <img src="/logos/mySQLlogo.png" alt="MySQL" className="w-9 h-9 object-contain" />
    },
    {
      name: 'SQL Server',
      category: 'databases',
      categoryLabel: 'Enterprise SQL',
      color: 'hover:border-red-600/40 hover:bg-red-950/10 shadow-red-600/5',
      icon: <img src="/logos/png-clipart-microsoft-sql-server-computer-servers-sql-server-management-studio-microsoft-angle-triangle.png" alt="SQL Server" className="w-9 h-9 object-contain" />
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
