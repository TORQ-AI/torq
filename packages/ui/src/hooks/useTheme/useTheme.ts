'use client';

import { useCallback, useEffect, useState } from 'react';

import getInitialTheme from './getInitialTheme';
import { Theme } from '../../types';

interface Output {
  theme: Theme;
  onThemeChange: (newTheme: Theme) => void;
}

/**
 * Controls theme state and persistence.
 * @returns {Output} Theme controls.
 */
const useTheme = (): Output => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  /**
   * Handles theme change and persists to localStorage.
   * @param {Theme} newTheme - New theme to apply
   * @returns {void}
   */
  const handleThemeChange = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  }, []);

  /**
   * Sync `data-theme` attribute when theme changes.
   */
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return {
    onThemeChange: handleThemeChange,
    theme,
  };
};

export default useTheme;
