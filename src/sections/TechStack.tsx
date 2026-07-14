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
          <path d="M11.9 0c-3.1 0-4.1.1-4.4.1C4.4.3 3 1.7 2.8 4.7v2.8h6v.9H2.8c-2 0-2.8.8-2.8 2.8v5.5c0 2 1 2.8 2.8 2.8h2.3V16c0-2.5 2-4.5 4.5-4.5h4.5c2.3 0 4.1-1.8 4.1-4.1V3.2c0-1.8-1.5-3.2-3.3-3.2-3-.1-4-.1-4.3-.1v.1zm-2.4 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zM18 8.2v3.1c0 2.5-2 4.5-4.5 4.5H9c-2.3 0-4.1 1.8-4.1 4.1v4.2c0 1.8 1.5 3.3 3.3 3.3 3.1 0 4.1.1 4.4.1 3.1 0 4.5-1.4 4.7-4.4v-2.8h-6v-.9h6c2 0 2.8-.8 2.8-2.8V9c0-1.8-1-2.8-2.8-2.8h-2.3V8c0 .2 0 .2.3.2zm-3.4 12c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z"/>
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
          <path d="M12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.8 9.9l-8.1 8.1c-.3.3-.9.3-1.3 0l-2.3-2.3c-.3-.3-.3-.9 0-1.3l8.1-8.1c.3-.3.9-.3 1.3 0l2.3 2.3c.4.3.4.9 0 1.3zm-3.5-4.5c.3-.3.9-.3 1.3 0l2.3 2.3c.3.3.3.9 0 1.3L9.8 17.1c-.3.3-.9.3-1.3 0l-2.3-2.3c-.3-.3-.3-.9 0-1.3l8.1-8.1z"/>
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
          <path d="M12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm.8 17.8l-3.4-3.4 4.8-4.8c.3-.3.3-.9 0-1.3l-1.3-1.3c-.3-.3-.9-.3-1.3 0L5.9 10.9c-.3.3-.3.9 0 1.3l6.9 6.9c.3.3.9.3 1.3 0l1.3-1.3c.3-.3.3-.9 0-1.3l-2.6-2.7z"/>
        </svg>
      )
    },
    {
      name: 'React',
      category: 'frameworks',
      categoryLabel: 'Frontend UI',
      color: 'hover:border-cyan-400/30 hover:text-cyan-400 shadow-cyan-400/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 10.6c0-1.2-.8-2.1-1.8-2.3 1.1-.2 1.8-1.1 1.8-2.3 0-1.3-.9-2.3-2.1-2.3-.4 0-.8.1-1.1.3C20.1 1.7 17.9 0 15.2 0 12.7 0 10.6 1.5 9.7 3.6 8.7 3.4 7.6 3.3 6.5 3.3c-3.6 0-6.5 2.9-6.5 6.5v4.5c0 3.6 2.9 6.5 6.5 6.5 1.2 0 2.3-.1 3.2-.3.9 2.1 3.1 3.6 5.5 3.6 2.7 0 4.9-1.7 5.6-4.1.3.2.7.3 1.1.3 1.2 0 2.1-1 2.1-2.3 0-1.2-.8-2.1-1.8-2.3 1.1-.2 1.8-1.1 1.8-2.3v-1.6zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
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
          <path d="M14.3 0L2.3 12l3.7 3.7 12-12h-3.7zM21.7 12l-6 6 6 6V12zm-3.7-3.7L6 20.3h3.7l12-12h-3.7z"/>
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
          <path d="M12 0L2.5 5.5v11L12 22l9.5-5.5v-11L12 0zm-1.8 17.2l-3-1.7v-7l3-1.7 3 1.7v7l-3 1.7z"/>
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
          <path d="M14 11.1h2.1c.1 0 .2-.1.2-.2V8.8c0-.1-.1-.2-.2-.2H14c-.1 0-.2.1-.2.2v2.1c0 .1.1.2.2.2zM11.3 11.1h2.1c.1 0 .2-.1.2-.2V8.8c0-.1-.1-.2-.2-.2H11.3c-.1 0-.2.1-.2.2v2.1c0 .1.1.2.2.2zm-2.7 0H10.7c.1 0 .2-.1.2-.2V8.8c0-.1-.1-.2-.2-.2H8.6c-.1 0-.2.1-.2.2v2.1c0 .1.1.2.2.2zm-2.7 0H8c.1 0 .2-.1.2-.2V8.8c0-.1-.1-.2-.2-.2H5.9c-.1 0-.2.1-.2.2v2.1c0 .1.1.2.2.2zm5.4-2.7h2.1c.1 0 .2-.1.2-.2V6c0-.1-.1-.2-.2-.2H11.3c-.1 0-.2.1-.2.2v2.1c0 .1.1.2.2.2zm-2.7 0H10.7c.1 0 .2-.1.2-.2V6c0-.1-.1-.2-.2-.2H8.6c-.1 0-.2.1-.2.2v2.1c0 .1.1.2.2.2zm0-2.7H10.7c.1 0 .2-.1.2-.2V3.3c0-.1-.1-.2-.2-.2H8.6c-.1 0-.2.1-.2.2v2.1c0 .1.1.2.2.2zM19.9 11.1h-2.1c-.1 0-.2.1-.2.2v2.1c0 .1.1.2.2.2h2.1c.1 0 .2-.1.2-.2v-2.1c0-.1-.1-.2-.2-.2zM2.6 11.1H4.7c.1 0 .2-.1.2-.2V8.8c0-.1-.1-.2-.2-.2H2.6c-.1 0-.2.1-.2.2v2.1c0 .1.1.2.2.2zM23.7 12.3c-.2-2.2-1.6-4-3.5-4.9l-.4-.2v.7c0 .5-.2.9-.6 1.2-.3.3-.8.4-1.2.4h-.4V10.8c0 .4-.3.7-.6.7h-1.6c-.4 0-.7-.3-.7-.7V7.8c0-.4.3-.7.7-.7h1.2c.4 0 .7-.3.7-.7V4.5l-.2-.1C17.2 4 15.6 4.3 14.5 5.2c-1 .8-1.5 2-1.5 3.2v2.8c0 .4-.3.7-.7.7h-1.5c-.4 0-.6-.3-.6-.7v-1.5c0-.4.3-.6.7-.6h.8c.4 0 .6-.3.6-.6V7c0-.4-.3-.6-.6-.6h-1.5c-.4 0-.6.3-.6.6v1.5c0 .4-.3.6-.6.6h-.8c-.4 0-.6.3-.6.6v1.5c0 .4-.3.7-.6.7H4.2c-.4 0-.6-.3-.6-.7v-1.2c0-.4.3-.7.6-.7h1.2c.4 0 .6-.3.6-.7V6.6c0-.4-.3-.7-.6-.7H3.9c-.4 0-.6.3-.6.6v2.1c0 .4-.3.7-.6.7H1.5c-.4 0-.6.3-.6.6v2c0 .4.3.7.6.7h1.4c.4 0 .6.3.6.6v2c0 .4-.3.7-.6.7H1.5c-.4 0-.6.3-.6.6v1.5c0 4.1 3.4 7.5 7.5 7.5 7 0 11.2-5.4 12.3-10.1.8-.2 1.5-.6 2-1.2.3-.5.4-1.1.4-1.7z"/>
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
          <path d="M12.1.1l-8.5 3.1c-.6.2-1 .8-1 1.4v8.8c0 .7.4 1.2 1 1.4l8.5 3.1c.1 0 .3.1.4.1s.3 0 .4-.1l8.5-3.1c.6-.2 1-.8 1-1.4V6c0-.7-.4-1.2-1-1.4L12.3.1c-.1 0-.1-.1-.2-.1s-.1.1-.1.1zM12 2.2l7.1 2.6L12 7.3 4.9 4.8 12 2.2zm7.8 4.2V13.6L13 11V3.9l6.8 2.5zm-8.8-2.5V11L4.2 13.6V6.4L11 3.9zm-6.8 11v1.7l6.8 2.5V11L4.2 14.9zm8.8 7.1v-7.1l6.8-2.5v7.1L13 22z"/>
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
          <path d="M14.5 16.3c-1.5 1.1-3.4 1.8-5.5 1.8-3.1 0-5.8-1.4-7.3-3.5-.4-.5 0-1.1.6-.9 2.1.8 4.7 1.2 7.2 1.2 1.8 0 3.9-.2 5.6-.8.6-.2 1 .4.5.8l-.1.4zm8.4-2.6c-.2-.3-.6-.4-.9-.3-3.8 1.2-8.3.6-12.3-1.4-.5-.3-1 .3-.5.7 3.7 3 9.1 3.3 13.1 1.2.5-.2.9-.7.6-1.2zM22 5.2c-1.3.9-2.6 1.8-4 2.5-.3.2-.8-.1-.6-.5.6-1.4 1.3-2.9 1.8-4.5.1-.4.5-.5.7-.2.8.9 1.6 1.9 2.4 2.9.3.3 0 .8-.3.8zm-5.1 6.8c-.7 0-1.2-.5-1.2-1.2 0-.7.5-1.2 1.2-1.2.7 0 1.2.5 1.2 1.2 0 .7-.5 1.2-1.2 1.2z"/>
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
          <path d="M19.4 10c-.7-3.4-3.7-6-7.4-6-2.9 0-5.4 1.6-6.6 4-3 0-5.4 2.5-5.4 5.6 0 3.3 2.7 6 6 6h13c2.8 0 5-2.2 5-5 0-2.6-2-4.8-4.6-5zm-.4 8H6c-2.2 0-4-1.8-4-4 0-2 1.5-3.8 3.6-4l1.1-.1.5-.9c1.1-2 3-3.1 5.2-3.1 2.6 0 4.9 1.9 5.4 4.4l.3 1.5 1.5.1c1.6.1 2.8 1.4 2.8 3 0 1.6-1.4 3-3 3z"/>
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
          <path d="M12.1 0C5.5 0 0 5.4 0 12c0 2.3.6 4.4 1.8 6.2l-.1.1c-.2.2-.2.6 0 .8l2.7 2.7c.2.2.6.2.8 0l1.9-1.9c1.6.8 3.3 1.2 5.1 1.2 6.7 0 12.1-5.4 12.1-12S18.8 0 12.1 0zm0 22.1c-2.5 0-4.7-.8-6.6-2.2l5-5c.2-.2.2-.6 0-.8l-1.6-1.6c-.2-.2-.6-.2-.8 0l-5 5c-1.4-1.8-2.2-4.1-2.2-6.6C1 6.1 5.7 1.4 11.5 1.4s10.6 4.7 10.6 10.6-4.7 10.6-10.6 10.6zm2.4-15c-.5.5-1.2.5-1.6 0a1.2 1.2 0 0 1 0-1.6c.5-.5 1.2-.5 1.6 0 .5.4.5 1.1 0 1.6z"/>
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
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm3.8 16.2H12v-2.1h3.8v2.1zm-4.9 0H7.1v-2.1h3.8v2.1zm0-3.2H7.1v-2.1h3.8v2.1zm4.9 0H12v-2.1h3.8v2.1zm0-3.2H12V7.7h3.8v2.1zm-4.9 0H7.1V7.7h3.8v2.1z"/>
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
          <path d="M12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm4.5 14H15v1.5h-1.5V14H12v1.5h-1.5V14H9v-1.5h1.5V11H9V9.5h1.5V8H12v1.5h1.5V8H15v1.5h1.5V11H15v1.5h1.5v1.5z"/>
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
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm1.7 17.5c-.8.8-2 .8-2.8 0-1-.8-1-2 0-2.8.8-.8 2-.8 2.8 0 1 .8 1 2 0 2.8zm-1.7-5c-.7 0-1.2-.5-1.2-1.2S11.3 10 12 10s1.2.5 1.2 1.2-.5 1.3-1.2 1.3zm3.8-3.7H12v-1.5h3.8v1.5zm-4.9 0H7.1v-1.5h3.8v1.5z"/>
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
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm-2 16.5c-2.5 0-4.5-2-4.5-4.5S7.5 7.5 10 7.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5zm5.5-4.5c0 3-2.5 5.5-5.5 5.5S4.5 15 4.5 12 7 6.5 10 6.5s5.5 2.5 5.5 5.5z"/>
        </svg>
      )
    },
    {
      name: 'MediaPipe',
      category: 'ai-tools',
      categoryLabel: 'ML Inference',
      color: 'hover:border-purple-500/30 hover:text-purple-400 shadow-purple-500/5',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
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
