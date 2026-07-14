import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send, Loader2, Mail, Phone } from 'lucide-react';

import { useTranslation } from '../context/TranslationContext';

export const CTA: React.FC = () => {
  const { t, language } = useTranslation();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'saas',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const projectOptions = [
    { value: 'saas', label: language === 'en' ? 'SaaS Platform Development' : 'Desarrollo de Plataforma SaaS' },
    { value: 'backend', label: language === 'en' ? 'Backend & API Engineering' : 'Ingeniería de Backend y APIs' },
    { value: 'ai', label: language === 'en' ? 'AI & OpenCV Integration' : 'Integración de IA y OpenCV' },
    { value: 'custom', label: language === 'en' ? 'Custom Software Development' : 'Desarrollo de Software a Medida' },
    { value: 'consulting', label: language === 'en' ? 'Architecture & DevOps Consulting' : 'Consultoría de Arquitectura y DevOps' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus('loading');
    // Simulate sending email / booking
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', projectType: 'saas', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const steps = [
    t('cta.step1'),
    t('cta.step2'),
    t('cta.step3')
  ];

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden transition-colors duration-300">
      {/* Background neon glows */}
      <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-accent-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-3xl p-8 sm:p-12 md:p-16 border border-border-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] grid-bg" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
            
            {/* Value / Intro panel (6 cols) */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-xs font-semibold tracking-widest text-accent-primary uppercase block">
                  {t('cta.label')}
                </span>
                <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-gradient leading-tight">
                  {t('cta.title')}
                </h2>
                <p className="text-text-secondary text-base sm:text-lg font-light max-w-lg leading-relaxed">
                  {t('cta.subtitle')}
                </p>
              </div>

              {/* Next steps list */}
              <div className="space-y-4 pt-4 border-t border-border-primary">
                <h4 className="font-display font-semibold text-text-primary text-sm tracking-wider uppercase">
                  {t('cta.nextSteps')}
                </h4>
                <ul className="space-y-3">
                  {steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent-secondary shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary font-light">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Contact info */}
              <div className="space-y-3 pt-6 border-t border-border-primary">
                <h4 className="font-display font-semibold text-text-primary text-sm tracking-wider uppercase">
                  {language === 'en' ? 'Direct Contact' : 'Contacto Directo'}
                </h4>
                <div className="flex flex-col sm:flex-row sm:gap-6 space-y-2 sm:space-y-0">
                  <a
                    href="mailto:contacto@kvrva.com"
                    className="text-sm text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-2 font-light"
                  >
                    <Mail className="w-4 h-4 text-accent-primary" />
                    <span>contacto@kvrva.com</span>
                  </a>
                  <a
                    href="tel:+56930876984"
                    className="text-sm text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-2 font-light"
                  >
                    <Phone className="w-4 h-4 text-accent-primary" />
                    <span>+56 9 3087 6984</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiry Form panel (6 cols) */}
            <div className="lg:col-span-6">
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-border-primary bg-bg-primary/40 backdrop-blur-md">
                
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-green-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-text-primary">
                        {t('cta.form.successTitle')}
                      </h3>
                      <p className="text-sm text-text-secondary font-light max-w-sm mx-auto leading-relaxed">
                        {t('cta.form.successDesc')}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5 text-left"
                    >
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
                          {t('cta.form.name')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder={t('cta.form.namePlaceholder')}
                          className="w-full px-4 py-3 rounded-lg border border-border-primary bg-bg-secondary text-text-primary text-sm focus:outline-hidden focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all font-light"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
                          {t('cta.form.email')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder={t('cta.form.emailPlaceholder')}
                          className="w-full px-4 py-3 rounded-lg border border-border-primary bg-bg-secondary text-text-primary text-sm focus:outline-hidden focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all font-light"
                        />
                      </div>

                      {/* Project Type select */}
                      <div className="space-y-1.5">
                        <label htmlFor="project-type" className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
                          {t('cta.form.scope')}
                        </label>
                        <select
                          id="project-type"
                          value={formState.projectType}
                          onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-border-primary bg-bg-secondary text-text-primary text-sm focus:outline-hidden focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all font-light"
                        >
                          {projectOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-bg-tertiary text-text-primary">
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message area */}
                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
                          {t('cta.form.desc')}
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          placeholder={t('cta.form.descPlaceholder')}
                          className="w-full px-4 py-3 rounded-lg border border-border-primary bg-bg-secondary text-text-primary text-sm focus:outline-hidden focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all font-light resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-text-primary text-bg-primary hover:bg-opacity-90 font-medium text-sm transition-all shadow-md group disabled:opacity-50 cursor-pointer"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{t('cta.form.processing')}</span>
                          </>
                        ) : (
                          <>
                            <span>{t('cta.form.submit')}</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
