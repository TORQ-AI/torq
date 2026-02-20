import { logout as logoutBase } from '@/api/logout';

/**
 * Clears all cookies by setting them to expire in the past.
 * Note: HTTP-only cookies cannot be cleared from JavaScript,
 * but this will clear any non-HTTP-only cookies.
 */
const clearCookies = (): void => {
  // Get all cookies.
  const cookies = document.cookie.split(';');

  // Clear each cookie by setting it to expire in the past
  cookies.forEach((cookie) => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

    // Try to clear cookie for current domain and parent domains.
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;

    // Also try with leading dot for subdomain cookies.
    const parts = window.location.hostname.split('.');
    if (parts.length > 1) {
      const domain = '.' + parts.slice(-2).join('.');
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`;
    }
  });
};

/**
 * Logs out the user by clearing authentication cookies.
 * Calls backend logout endpoint to clear HTTP-only cookies.
 * @returns {Promise<void>} Promise that resolves when logout is complete.
 */
export const logout = async (): Promise<void> => {
  const theme = localStorage.getItem('theme');

  try {
    await logoutBase();
  } catch (error) {
    console.error('Logout request failed:', error);
  }

  clearCookies();
  localStorage.clear();

  if (theme) {
    localStorage.setItem('theme', theme);
  }

  window.location.replace('/');
};
