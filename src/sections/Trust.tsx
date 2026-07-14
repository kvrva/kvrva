import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';

interface Technology {
  name: string;
  color: string; // Tailwind glow class (e.g. shadow-purple-500/20)
  borderColor: string; // Tailwind hover border class
  textColor: string; // Brand text color
  logo: React.ReactNode;
}

export const Trust: React.FC = () => {
  const { t } = useTranslation();
  const technologies: Technology[] = [
    {
      name: 'Python',
      color: 'shadow-blue-500/10 hover:shadow-blue-500/20',
      borderColor: 'hover:border-blue-500/30',
      textColor: 'group-hover:text-[#3776AB]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.897.007a6.248 6.248 0 0 0-4.474 1.839 5.673 5.673 0 0 0-1.42 3.9v2.85h5.992v.855H6.003a5.952 5.952 0 0 0-4.148 1.637 5.253 5.253 0 0 0-1.642 3.79c-.068 3.513-.024 4.545.244 5.48a5.539 5.539 0 0 0 2.227 3.255 7.155 7.155 0 0 0 3.86 1.139h2.327v-3.14a4.42 4.42 0 0 1 4.538-4.492h4.526a4.11 4.11 0 0 0 4.145-4.133V7.21a5.612 5.612 0 0 0-1.748-4.041A6.29 6.29 0 0 0 16.388.01c-3.178-.052-4.174-.047-4.49.002v-.005zm-2.456 2.062a1.002 1.002 0 1 1 0 2.003 1.002 1.002 0 0 1 0-2.003zM18 8.16v3.14a4.42 4.42 0 0 1-4.538 4.492H8.936a4.11 4.11 0 0 0-4.145 4.133v3.916a5.613 5.613 0 0 0 1.748 4.041 6.29 6.29 0 0 0 4.908 3.16c3.178.051 4.174.047 4.49-.002a6.248 6.248 0 0 0 4.474-1.839 5.673 5.673 0 0 0 1.42-3.9v-2.85h-5.992v-.855h5.992a5.952 5.952 0 0 0 4.148-1.637 5.253 5.253 0 0 0 1.642-3.79c.068-3.513.024-4.545-.244-5.48a5.539 5.539 0 0 0-2.227-3.255 7.155 7.155 0 0 0-3.86-1.139H18v-.002zm-3.442 12.068a1.002 1.002 0 1 1 0 2.003 1.002 1.002 0 0 1 0-2.003z"/>
        </svg>
      )
    },
    {
      name: 'FastAPI',
      color: 'shadow-teal-500/10 hover:shadow-teal-500/20',
      borderColor: 'hover:border-teal-500/30',
      textColor: 'group-hover:text-[#009688]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.82 9.948l-8.087 8.096c-.347.348-.916.348-1.264 0l-2.289-2.293a.895.895 0 0 1 0-1.264l8.087-8.096c.348-.348.917-.348 1.265 0l2.288 2.293a.895.895 0 0 1 0 1.264zm-3.535-4.482c.348-.348.917-.348 1.265 0l2.288 2.293a.895.895 0 0 1 0 1.264L9.75 17.119a.895.895 0 0 1-1.264 0l-2.289-2.293a.895.895 0 0 1 0-1.264L14.285 5.466z"/>
        </svg>
      )
    },
    {
      name: 'NestJS',
      color: 'shadow-red-500/10 hover:shadow-red-500/20',
      borderColor: 'hover:border-red-500/30',
      textColor: 'group-hover:text-[#E0234E]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.83 17.848l-3.37-3.376 4.766-4.773a.895.895 0 0 0 0-1.264L11.937 6.14a.895.895 0 0 0-1.264 0L5.908 10.91a.895.895 0 0 0 0 1.264l6.921 6.938a.895.895 0 0 0 1.264 0l1.264-1.264a.895.895 0 0 0 0-1.264l-2.527-2.736z"/>
        </svg>
      )
    },
    {
      name: 'React',
      color: 'shadow-cyan-400/10 hover:shadow-cyan-400/20',
      borderColor: 'hover:border-cyan-400/30',
      textColor: 'group-hover:text-[#61DAFB]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 10.604c0-1.167-.788-2.102-1.848-2.274 1.06-.172 1.848-1.107 1.848-2.274 0-1.272-.942-2.3-2.104-2.3-.393 0-.76.11-1.077.302C20.144 1.705 17.9 0 15.228 0c-2.483 0-4.595 1.472-5.541 3.558C8.74 3.366 7.632 3.255 6.474 3.255c-3.57 0-6.474 2.904-6.474 6.474v4.542c0 3.57 2.904 6.474 6.474 6.474 1.158 0 2.266-.11 3.213-.303.946 2.086 3.058 3.558 5.541 3.558 2.673 0 4.916-1.705 5.594-4.058.317.192.684.302 1.077.302 1.162 0 2.104-1.028 2.104-2.3 0-1.167-.788-2.102-1.848-2.274 1.06-.172 1.848-1.107 1.848-2.274v-1.636zM12 14c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"/>
        </svg>
      )
    },
    {
      name: 'Flutter',
      color: 'shadow-blue-400/10 hover:shadow-blue-400/20',
      borderColor: 'hover:border-blue-400/30',
      textColor: 'group-hover:text-[#02569B]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.314 0L2.3 12 6 15.7l12.014-12.014h-3.7zM21.7 12l-6.014 6.014 6.014 6.014V12zm-3.7-3.7L6 20.314H9.7l12.014-12.014h-3.714z"/>
        </svg>
      )
    },
    {
      name: 'PostgreSQL',
      color: 'shadow-sky-600/10 hover:shadow-sky-600/20',
      borderColor: 'hover:border-sky-600/30',
      textColor: 'group-hover:text-[#336791]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.11 0C5.45 0 .05 5.37.05 12c0 2.28.64 4.41 1.76 6.22l-.12.12c-.22.22-.22.58 0 .8l2.67 2.67c.22.22.58.22.8 0l1.9-1.9c1.55.77 3.28 1.2 5.09 1.2 6.66 0 12.06-5.37 12.06-12S18.77 0 12.11 0zm.04 22.09c-2.45 0-4.73-.83-6.55-2.22l4.98-4.98a.56.56 0 0 0 0-.8l-1.6-1.6a.56.56 0 0 0-.8 0l-4.98 4.98c-1.39-1.82-2.22-4.1-2.22-6.55 0-5.83 4.74-10.57 10.57-10.57S22.68 5.17 22.68 11s-4.74 10.57-10.57 10.57zm2.4-15.03c-.45.45-1.18.45-1.63 0a1.15 1.15 0 0 1 0-1.63c.45-.45 1.18-.45 1.63 0 .45.45.45 1.18 0 1.63z"/>
        </svg>
      )
    },
    {
      name: 'Docker',
      color: 'shadow-cyan-500/10 hover:shadow-cyan-500/20',
      borderColor: 'hover:border-cyan-500/30',
      textColor: 'group-hover:text-[#2496ED]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.983 11.078h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM11.261 11.078h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-2.722 0h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186H8.539c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-2.722 0h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186H5.817c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zM11.261 8.355h2.119c.102 0 .186-.084.186-.186V6.05c0-.102-.084-.186-.186-.186h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm-2.722 0h2.119c.102 0 .186-.084.186-.186V6.05c0-.102-.084-.186-.186-.186H8.539c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm0-2.722h2.119c.102 0 .186-.084.186-.186V3.328c0-.102-.084-.186-.186-.186H8.539c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm11.255 5.445c-.09-.03-.21-.06-.33-.06h-2.119c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186h2.119c.102 0 .186-.084.186-.186v-2.119c0-.054-.024-.108-.056-.126zm-17.155.126h2.119c.102 0 .186-.084.186-.186V8.773c0-.102-.084-.186-.186-.186H2.639c-.102 0-.186.084-.186.186v2.119c0 .102.084.186.186.186zm21.135 1.155c-.24-2.16-1.59-3.99-3.48-4.92l-.39-.18v.72c0 .48-.21.93-.57 1.23-.33.27-.75.42-1.2.42h-.36v1.35c0 .36-.27.66-.63.66h-1.62c-.36 0-.66-.27-.66-.63v-3.03c0-.36.27-.66.66-.66h1.23c.36 0 .66-.27.66-.63V4.498l-.24-.09c-1.32-.45-2.88-.18-3.96.72-.99.81-1.53 1.98-1.53 3.24v2.76c0 .36-.27.66-.63.66h-1.53c-.36 0-.63-.27-.63-.66v-1.5c0-.36.27-.63.63-.63h.78c.36 0 .63-.27.63-.63V6.953c0-.36-.27-.63-.63-.63h-1.53c-.36 0-.63.27-.63.63v1.53c0 .36-.27.63-.63.63h-.78c-.36 0-.63.27-.63.63v1.5c0 .36-.27.66-.63.66H4.229c-.36 0-.63-.3-.63-.66v-1.2c0-.36.27-.66.63-.66h1.23c.36 0 .63-.3.63-.66V6.623c0-.36-.27-.66-.63-.66H3.929c-.36 0-.63.3-.63.66v2.13c0 .36-.27.66-.63.66H1.529c-.36 0-.63.3-.63.66v2.01c0 .36.27.66.63.66h1.41c.36 0 .63.3.63.66v2.01c0 .36-.27.66-.63.66H1.529c-.36 0-.63.3-.63.66v1.5c0 4.14 3.36 7.5 7.5 7.5 7.02 0 11.22-5.4 12.33-10.14.78-.18 1.47-.6 1.95-1.2.33-.42.48-.96.42-1.53z"/>
        </svg>
      )
    },
    {
      name: 'AWS',
      color: 'shadow-orange-500/10 hover:shadow-orange-500/20',
      borderColor: 'hover:border-orange-500/30',
      textColor: 'group-hover:text-[#FF9900]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.542 16.326c-1.464 1.134-3.415 1.761-5.495 1.761-3.084 0-5.753-1.378-7.25-3.52-.358-.51-.027-1.127.56-.913 2.128.775 4.673 1.205 7.24 1.205 1.848 0 3.864-.236 5.56-.763.565-.175.986.37.525.757l-.14.073zm8.397-2.613c-.225-.296-.566-.411-.913-.302-3.805 1.196-8.318.592-12.261-1.391-.502-.25-.975.318-.544.664 3.738 2.996 9.07 3.313 13.064 1.248.513-.266.862-.733.654-1.219zM22.046 5.158c-1.258.913-2.618 1.782-4.041 2.532-.34.18-.767-.09-.595-.453.649-1.373 1.341-2.906 1.768-4.545.093-.362.47-.487.72-.218.847.904 1.637 1.879 2.378 2.916.24.337-.024.78-.23.768zm-5.06 6.822c-.675 0-1.15-.544-1.15-1.15 0-.67.475-1.15 1.15-1.15.676 0 1.15.48 1.15 1.15 0 .606-.474 1.15-1.15 1.15z"/>
        </svg>
      )
    },
    {
      name: 'Google Cloud',
      color: 'shadow-blue-500/10 hover:shadow-blue-500/20',
      borderColor: 'hover:border-blue-500/30',
      textColor: 'group-hover:text-[#4285F4]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
        </svg>
      )
    },
    {
      name: 'Kubernetes',
      color: 'shadow-indigo-600/10 hover:shadow-indigo-600/20',
      borderColor: 'hover:border-indigo-600/30',
      textColor: 'group-hover:text-[#326CE5]',
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.11.05a1.59 1.59 0 0 0-.22 0l-8.52 3.1c-.6.22-1 .78-1 1.43v8.83c0 .65.4 1.21 1 1.43l8.52 3.1c.14.05.28.08.43.08s.29-.03.43-.08l8.52-3.1c.6-.22 1-.78 1-1.43V5.98c0-.65-.4-1.21-1-1.43L12.33.08a1.68 1.68 0 0 0-.22-.03zM12 2.18l7.08 2.58L12 7.34 4.92 4.76 12 2.18zm7.83 4.22v7.19L13 10.97V3.88l6.83 2.52zm-8.83-2.5v7.09L4.17 13.6V6.4L11 3.9zm-6.83 11v1.65l6.83 2.48v-7.09L4.17 14.9zm8.83 7.09v-7.09l6.83-2.48v7.09l-6.83 2.48z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-12 border-y border-border-primary bg-bg-secondary/40 backdrop-blur-sm relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-semibold tracking-widest text-text-tertiary uppercase mb-8">
          {t('trust.title')}
        </p>

        {/* Responsive Grid / Flex wrapper */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border-primary bg-bg-primary/50 shadow-xs backdrop-blur-xs transition-all duration-300 hover:bg-bg-primary cursor-default ${tech.color} ${tech.borderColor}`}
            >
              <div className={`text-text-secondary transition-colors duration-300 ${tech.textColor}`}>
                {tech.logo}
              </div>
              <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
