import { StravaActivityConfig, StravaActivityApiResponse, StravaActivityError } from '../../activity/types';
import { STRAVA_API_BASE_URL, STRAVA_API_ATHLETE_ACTIVITIES_ENDPOINT } from '../../activity/constants';
import getAuthHeaders from '../../activity/get-auth-headers';

/**
 * Creates an ActivityError wrapped in an Error object.
 *
 * @param {StravaActivityError['code']} code - Error code from StravaActivityErrorCode union type
 * @param {string} message - User-friendly error message
 * @param {boolean} [retryable=false] - Whether the error is retryable (default: false)
 * @returns {Error} Error object with JSON-stringified StravaActivityError in message
 * @internal
 */
const createActivityError = (
  code: StravaActivityError['code'],
  message: string,
  retryable: boolean = false
): Error => {
  const error: StravaActivityError = {
    code,
    message,
    retryable,
  };
  return new Error(JSON.stringify(error));
};

/**
 * Fetches the API response from Strava API.
 *
 * @param {string} url - The full API endpoint URL
 * @param {HeadersInit} headers - Request headers including authorization
 * @returns {Promise<Response>} Promise resolving to the fetch response
 * @throws {Error} Throws StravaActivityError with 'NETWORK_ERROR' code if fetch fails
 * @internal
 */
const fetchApiResponse = async (url: string, headers: HeadersInit): Promise<Response> => {
  try {
    return await fetch(url, {
      method: 'GET',
      headers,
    });
  } catch (error) {
    throw createActivityError(
      'NETWORK_ERROR',
      'Failed to connect to Strava API',
      true
    );
  }
};

/**
 * Parses JSON data from the API response.
 *
 * @param {Response} response - Response object to parse
 * @returns {Promise<StravaActivityApiResponse[]>} Promise resolving to parsed API response array
 * @throws {Error} Throws StravaActivityError with 'MALFORMED_RESPONSE' code if JSON parsing fails
 * @internal
 */
const parseApiJsonData = async (response: Response): Promise<StravaActivityApiResponse[]> => {
  try {
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw createActivityError(
        'MALFORMED_RESPONSE',
        'Expected array response from Strava API',
        false
      );
    }
    return data as StravaActivityApiResponse[];
  } catch (error) {
    const activityError = error as StravaActivityError;
    if (activityError.code !== undefined) {
      throw error;
    }
    throw createActivityError(
      'MALFORMED_RESPONSE',
      'Invalid response format from Strava API',
      false
    );
  }
};

/**
 * Fetches activities list from the Strava API.
 *
 * Makes an authenticated HTTP GET request to the Strava API to retrieve
 * a list of activities for the authenticated athlete. Handles various HTTP
 * error responses and maps them to appropriate StravaActivityError codes.
 *
 * @param {StravaActivityConfig} config - Activity module configuration with access token and optional base URL
 * @returns {Promise<StravaActivityApiResponse[]>} Promise resolving to the raw Strava API response data array
 * @throws {Error} Throws an error with StravaActivityError structure for various failure scenarios:
 *   - 'NETWORK_ERROR' (retryable): Network connection failure
 *   - 'UNAUTHORIZED' (not retryable): Invalid or expired token (401)
 *   - 'FORBIDDEN' (not retryable): Insufficient permissions (403)
 *   - 'RATE_LIMITED' (retryable): Rate limit exceeded (429)
 *   - 'SERVER_ERROR' (retryable): Strava API server error (5xx)
 *   - 'MALFORMED_RESPONSE' (not retryable): Invalid JSON response or not an array
 *
 * @see {@link https://developers.strava.com/docs/reference/#api-Activities-getLoggedInAthleteActivities | Strava Get Activities API}
 *
 * @example
 * ```typescript
 * const activities = await fetchActivitiesFromApi({
 *   accessToken: 'abc123',
 *   baseUrl: 'https://www.strava.com/api/v3'
 * });
 * ```
 */
const fetchActivitiesFromApi = async (
  config: StravaActivityConfig
): Promise<StravaActivityApiResponse[]> => {
  const baseUrl = config.baseUrl ?? STRAVA_API_BASE_URL;
  const url = `${baseUrl}${STRAVA_API_ATHLETE_ACTIVITIES_ENDPOINT}`;
  const headers = getAuthHeaders(config);

  const response = await fetchApiResponse(url, headers);

  if (response.status === 401) {
    throw createActivityError(
      'UNAUTHORIZED',
      'Authentication failed. Token may be expired or invalid.',
      false
    );
  }

  if (response.status === 403) {
    throw createActivityError(
      'FORBIDDEN',
      'Insufficient permissions to access activities',
      false
    );
  }

  if (response.status === 429) {
    const error = createActivityError(
      'RATE_LIMITED',
      'Rate limit exceeded. Please try again later.',
      true
    );
    // Store cloned response in error for rate limit handling (clone to preserve headers)
    (error as any).response = response.clone();
    throw error;
  }

  if (response.status >= 500) {
    throw createActivityError(
      'SERVER_ERROR',
      'Strava API server error',
      true
    );
  }

  if (!response.ok) {
    throw createActivityError(
      'SERVER_ERROR',
      `Unexpected API error: ${response.status}`,
      false
    );
  }

  const jsonData = await parseApiJsonData(response);

  return jsonData;
};

export default fetchActivitiesFromApi;
