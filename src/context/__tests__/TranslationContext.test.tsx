import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { TranslationProvider, useTranslation } from '../TranslationContext';

describe('TranslationContext', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TranslationProvider>{children}</TranslationProvider>
  );

  it('provides default language as English and translates keys correctly', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });

    expect(result.current.language).toBe('en');
    expect(result.current.t('navbar.services')).toBe('Services');
  });

  it('switches language cleanly when setLanguage is called', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });

    act(() => {
      result.current.setLanguage('es');
    });

    expect(result.current.language).toBe('es');
    expect(result.current.t('navbar.services')).toBe('Servicios');
  });

  it('falls back gracefully to key string if translation key is missing', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });

    expect(result.current.t('non.existent.key')).toBe('non.existent.key');
  });
});
