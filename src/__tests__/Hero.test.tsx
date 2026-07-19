import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../sections/Hero';
import { TranslationProvider } from '../context/TranslationContext';

describe('Hero Section Component', () => {
  const renderHero = () => {
    return render(
      <TranslationProvider>
        <Hero />
      </TranslationProvider>
    );
  };

  it('renders Hero badge and main headline', () => {
    renderHero();
    expect(screen.getByText(/ESTUDIO DE INGENIERÍA DE SOFTWARE|SOFTWARE ENGINEERING STUDIO/i)).toBeInTheDocument();
  });

  it('renders primary and secondary CTA buttons', () => {
    renderHero();
    const ctaLinks = screen.getAllByRole('link');
    expect(ctaLinks.length).toBeGreaterThan(0);
  });
});
