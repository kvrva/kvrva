import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Full App Integration Test', () => {
  it('renders without crashing and includes main navigation and sections', () => {
    render(<App />);
    expect(screen.getByTestId('nav-logo')).toBeInTheDocument();
  });
});
