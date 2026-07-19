import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { TranslationProvider } from '../context/TranslationContext';

describe('Navbar Component', () => {
  const toggleThemeMock = vi.fn();

  const renderNavbar = (theme: 'dark' | 'light' = 'dark') => {
    return render(
      <TranslationProvider>
        <Navbar theme={theme} toggleTheme={toggleThemeMock} />
      </TranslationProvider>
    );
  };

  it('renders KVRVA brand logo and quick contact button', () => {
    renderNavbar();
    expect(screen.getByTestId('nav-logo')).toBeInTheDocument();
    expect(screen.getByTestId('nav-contact-button')).toBeInTheDocument();
  });

  it('toggles mobile menu overlay when menu button is clicked', () => {
    renderNavbar();
    const menuButton = screen.getByTestId('nav-menu-button');
    expect(screen.queryByText(/Navigation|Navegación/i)).not.toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(screen.getByText(/Navigation|Navegación/i)).toBeInTheDocument();
  });

  it('calls toggleTheme callback when theme toggle button is clicked', () => {
    renderNavbar();
    const themeButton = screen.getByTestId('nav-theme-toggle');
    fireEvent.click(themeButton);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
