/**
 * Initial backoff delay in milliseconds.
 */
export const STRAVA_API_INITIAL_BACKOFF_MS = 1000;

/**
 * Maximum backoff delay in milliseconds.
 */
export const STRAVA_API_MAX_BACKOFF_MS = 16000;

/**
 * Maximum number of retries.
 */
export const STRAVA_API_MAX_RETRIES = 3;

/**
 * Base URL for the Strava API.
 */
export const STRAVA_API_BASE_URL = 'https://www.strava.com/api/v3';

/**
 * Endpoints for the Strava API.
 */
export const STRAVA_API_ENDPOINTS = {
  ACTIVITIES: '/athlete/activities',
  ACTIVITY: '/activities',
};
