import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Services } from '../sections/Services';
import { AILab } from '../sections/AILab';
import { Projects } from '../sections/Projects';
import { Footer } from '../components/Footer';
import { TranslationProvider } from '../context/TranslationContext';

describe('Sections & Components Verification', () => {
  it('renders Services section cleanly', () => {
    render(
      <TranslationProvider>
        <Services />
      </TranslationProvider>
    );
    expect(screen.getByRole('heading', { level: 2, name: /Engineering Services|Servicios de Ingeniería/i })).toBeInTheDocument();
  });

  it('renders AI Lab section interactive elements', () => {
    render(
      <TranslationProvider>
        <AILab />
      </TranslationProvider>
    );
    expect(screen.getByRole('heading', { level: 2, name: /Interactive AI & Software Lab|Laboratorio/i })).toBeInTheDocument();
  });

  it('renders Projects section with featured portfolio cards', () => {
    render(
      <TranslationProvider>
        <Projects />
      </TranslationProvider>
    );
    expect(screen.getByRole('heading', { level: 2, name: /Featured Projects|Proyectos Destacados/i })).toBeInTheDocument();
  });

  it('renders Footer component with brand and copyright', () => {
    render(
      <TranslationProvider>
        <Footer />
      </TranslationProvider>
    );
    const brandElements = screen.getAllByText(/KVRVA/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });
});
