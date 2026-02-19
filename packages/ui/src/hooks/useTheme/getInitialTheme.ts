'use client';

import { Theme } from '../../types';

/**
 * Gets initial theme from localStorage or system preference.
 * Returns 'light' during SSR when browser APIs are unavailable.
 * @returns {Theme} Initial theme.
 */
const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as Theme | null;

    if (savedTheme) {
      return savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      return prefersDark ? 'dark' : 'light';
    }
  } else {
    return 'light';
  }
};

export default getInitialTheme;
