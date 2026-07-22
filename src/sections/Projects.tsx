import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  illustration: React.ReactNode;
  themeColor: string; // Tailwind accent border/text
  link?: string; // Optional link to live site
}

export const Projects: React.FC = () => {
  const { t, language } = useTranslation();

  const projects: Project[] = [
    {
      title: 'Veerlow',
      subtitle: t('projects.veerlow.subtitle'),
      description: t('projects.veerlow.desc'),
      tags: ['FastAPI', 'React', 'Flutter', 'PostgreSQL', 'Docker', 'WebSockets'],
      link: 'https://veerlow.com',
      themeColor: 'group-hover:border-cyan-500/30 shadow-cyan-500/5 hover:shadow-cyan-500/10',
      illustration: (
        <div className="w-full h-full relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center p-4 sm:p-6 border border-white/5 group">
          {/* Browser Container Mockup */}
          <div className="w-full h-full bg-[#0d0e12] rounded-lg border border-white/10 shadow-2xl relative overflow-hidden flex flex-col">
            {/* Browser Header Bar */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-bg-secondary border-b border-white/5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
              <span className="text-[10px] font-mono text-text-tertiary ml-2 select-none">veerlow.com</span>
            </div>
            {/* Screen Image */}
            <div className="flex-1 overflow-hidden relative">
              <img 
                src="/veerlow-thumb.png" 
                alt="Veerlow Dashboard" 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'ViewLED',
      subtitle: t('projects.viewled.subtitle'),
      description: t('projects.viewled.desc'),
      tags: ['React', 'Node.js', 'Express', 'Socket.io', 'TailwindCSS'],
      link: 'https://viewled.com.ar',
      themeColor: 'group-hover:border-emerald-500/30 shadow-emerald-500/5 hover:shadow-emerald-500/10',
      illustration: (
        <div className="w-full h-full relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center p-4 sm:p-6 border border-white/5 group">
          {/* Browser Container Mockup */}
          <div className="w-full h-full bg-[#0d0e12] rounded-lg border border-white/10 shadow-2xl relative overflow-hidden flex flex-col">
            {/* Browser Header Bar */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-bg-secondary border-b border-white/5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/80" />
              <span className="text-[10px] font-mono text-text-tertiary ml-2 select-none">viewled.com.ar</span>
            </div>
            {/* Screen Image */}
            <div className="flex-1 overflow-hidden relative">
              <img 
                src="/viewled-thumb.png" 
                alt="ViewLED Platform" 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'AI Interactive Platform',
      subtitle: t('projects.aiPlatform.subtitle'),
      description: t('projects.aiPlatform.desc'),
      tags: ['Gesture Recognition', 'MediaPipe', 'FastAPI', 'Flutter'],
      themeColor: 'group-hover:border-purple-500/30 shadow-purple-500/5 hover:shadow-purple-500/10',
      illustration: (
        <div className="w-full h-full relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center p-6 border border-white/5">
          <div className="absolute inset-0 opacity-[0.05] grid-bg" />

          {/* Styled Hand Skeleton Illustration */}
          <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-purple-500/40 fill-none" strokeWidth="1.5">
            {/* Hand Nodes */}
            <circle cx="50" cy="85" r="3" className="fill-purple-500 animate-pulse" /> {/* Wrist */}
            
            {/* Palm & fingers */}
            <path d="M50 85L35 70M50 85L45 55M50 85L55 52M50 85L65 55M50 85L78 72" />
            <path d="M35 70L25 65L18 68" strokeDasharray="2" /> {/* Thumb */}
            <path d="M45 55L42 42L40 32" strokeDasharray="2" /> {/* Index */}
            <path d="M55 52L54 38L53 26" strokeDasharray="2" /> {/* Middle */}
            <path d="M65 55L64 42L63 32" strokeDasharray="2" /> {/* Ring */}
            <path d="M78 72L82 65L85 58" strokeDasharray="2" /> {/* Pinky */}
            
            {/* Joints dots */}
            <circle cx="25" cy="65" r="1.5" className="fill-purple-400" />
            <circle cx="42" cy="42" r="1.5" className="fill-purple-400" />
            <circle cx="54" cy="38" r="1.5" className="fill-purple-400" />
            <circle cx="64" cy="42" r="1.5" className="fill-purple-400" />
            
            {/* Fingertips glowing dots */}
            <circle cx="18" cy="68" r="2.5" className="fill-cyan-400 stroke-cyan-500" />
            <circle cx="40" cy="32" r="2.5" className="fill-cyan-400 stroke-cyan-500 animate-ping" />
            <circle cx="40" cy="32" r="2.5" className="fill-cyan-400 stroke-cyan-500" />
            <circle cx="53" cy="26" r="2.5" className="fill-cyan-400 stroke-cyan-500" />
            <circle cx="63" cy="32" r="2.5" className="fill-cyan-400 stroke-cyan-500" />
            <circle cx="85" cy="58" r="2.5" className="fill-cyan-400 stroke-cyan-500" />
          </svg>

          <div className="absolute left-4 bottom-4 glass px-2.5 py-1 rounded-md text-[9px] font-mono text-purple-400 border border-purple-400/20">
            Object Tracking
          </div>
        </div>
      )
    },
    {
      title: 'Sneaker TryOn',
      subtitle: t('projects.tryon.subtitle'),
      description: t('projects.tryon.desc'),
      tags: ['Python', 'DeepAR', 'Computer Vision', 'WebGL', '3D Rendering'],
      themeColor: 'group-hover:border-pink-500/30 shadow-pink-500/5 hover:shadow-pink-500/10',
      illustration: (
        <div className="w-full h-full relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center p-6 border border-white/5">
          <div className="absolute inset-0 opacity-[0.05] grid-bg" />
          
          {/* Smart Mirror Screen mock */}
          <div className="w-4/5 aspect-video bg-[#0d0e12] rounded-lg border border-white/10 shadow-2xl relative overflow-hidden flex flex-col p-2.5">
            {/* Header showing Camera Feed */}
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                <span className="text-[7px] font-mono text-pink-400">CAMERA ACTIVE [Try-On]</span>
              </div>
              <span className="text-[7px] font-mono text-text-tertiary">3D Render: 60 FPS</span>
            </div>
            
            {/* Visual illustration of foot bounding box & 3D sneaker mesh */}
            <div className="flex-1 flex items-center justify-center relative">
              {/* Foot bounding box */}
              <div className="absolute w-20 h-10 border border-dashed border-pink-500/35 rounded-full rotate-[-15deg] flex items-center justify-center">
                <span className="text-[5px] font-mono text-pink-400/60 uppercase">Foot Tracker</span>
              </div>
              
              {/* Abstract 3D shoe outline */}
              <svg viewBox="0 0 100 50" className="w-20 h-10 stroke-cyan-400 fill-none absolute rotate-[-15deg] translate-y-[-2px]" strokeWidth="1">
                {/* Shoe sole */}
                <path d="M10 40 Q30 42 50 38 T90 40" strokeWidth="1.5" />
                {/* Shoe body */}
                <path d="M10 40 L15 28 Q25 22 45 20 L55 28 L90 40 Z" />
                {/* Mesh grid lines inside shoe */}
                <path d="M15 28 L30 41 M25 22 L40 40 M35 21 L50 39 M45 20 L60 39" strokeWidth="0.5" className="stroke-cyan-500/40" />
                {/* Glowing points */}
                <circle cx="15" cy="28" r="1.5" className="fill-cyan-400 animate-pulse" />
                <circle cx="45" cy="20" r="1.5" className="fill-cyan-400 animate-pulse" />
              </svg>
            </div>
          </div>

          <div className="absolute right-4 bottom-4 glass px-2.5 py-1 rounded-md text-[9px] font-mono text-pink-400 border border-pink-400/20">
            DeepAR Mirror
          </div>
        </div>
      )
    },
    {
      title: 'Automation Platform',
      subtitle: t('projects.automation.subtitle'),
      description: t('projects.automation.desc'),
      tags: ['NestJS', 'Puppeteer', 'PostgreSQL'],
      themeColor: 'group-hover:border-emerald-500/30 shadow-emerald-500/5 hover:shadow-emerald-500/10',
      illustration: (
        <div className="w-full h-full relative overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center p-6 border border-white/5">
          <div className="absolute inset-0 opacity-[0.05] grid-bg" />

          {/* Abstract Queue Nodes Graph */}
          <div className="w-4/5 flex flex-col gap-3 font-mono">
            {/* Task Item 1 */}
            <div className="flex items-center justify-between bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-2 text-xs text-emerald-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Job #9011</span>
              </div>
              <span className="text-[10px] text-text-tertiary">Completed</span>
            </div>
            
            {/* Task Item 2 */}
            <div className="flex items-center justify-between bg-[#16171d] border border-white/5 rounded-lg p-2 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <span>Job #9012</span>
              </div>
              <span className="text-[10px] text-cyan-400">Puppeteer-Running</span>
            </div>

            {/* Task Item 3 */}
            <div className="flex items-center justify-between bg-[#16171d] border border-white/5 rounded-lg p-2 text-xs text-text-tertiary">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-text-tertiary" />
                <span>Job #9013</span>
              </div>
              <span className="text-[10px]">Queued</span>
            </div>
          </div>

          <div className="absolute right-4 bottom-4 glass px-2.5 py-1 rounded-md text-[9px] font-mono text-emerald-400 border border-emerald-400/20">
            RPA Engine
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden transition-colors duration-300">
      {/* Background glow orbs */}
      <div className="absolute top-[50%] left-[5%] w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-left">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-gradient mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-text-secondary text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`group glass-card rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 p-6 sm:p-8 md:p-10 gap-8 items-center cursor-default ${project.themeColor}`}
            >
              {/* Image/Illustration panel - Left/Right alternating for desktop */}
              <div className={`aspect-video w-full lg:order-last`}>
                {project.illustration}
              </div>

              {/* Text panel */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight group-hover:text-accent-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm font-semibold tracking-wide text-accent-secondary mt-1.5 uppercase">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light">
                  {project.description}
                </p>

                {/* Tech tags & Link */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-bg-secondary text-text-secondary border border-border-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <div className="pt-1">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-bg-secondary hover:bg-bg-tertiary border border-border-primary text-text-primary hover:text-accent-primary text-xs font-medium transition-all cursor-pointer shadow-xs"
                      >
                        <span>{language === 'en' ? 'Visit Project' : 'Visitar Proyecto'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
