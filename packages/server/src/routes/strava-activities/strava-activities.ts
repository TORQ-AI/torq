import { getTokens } from '../../cookies';
import type { ServerConfig, ServerTokenResult } from '../../types';

/**
 * Strava API base URL.
 */
const STRAVA_API_BASE_URL = 'https://www.strava.com/api/v3';

/**
 * Strava athlete activities endpoint.
 */
const STRAVA_ATHLETE_ACTIVITIES_ENDPOINT = '/athlete/activities';

/**
 * Creates error response for unauthorized requests.
 *
 * @returns {Response} 401 Unauthorized response
 * @internal
 */
const createUnauthorizedResponse = (): Response => {
  return new Response(
    JSON.stringify({
      error: 'Unauthorized',
      message: 'Authentication required. Please authenticate with Strava.',
    }),
    {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

/**
 * Determines status code and error message from HTTP status code.
 *
 * @param {number} statusCode - HTTP status code
 * @returns {{ statusCode: number; errorMessage: string }} Status code and error message
 * @internal
 */
const determineErrorDetails = (statusCode: number): { statusCode: number; errorMessage: string } => {
  if (statusCode === 401) {
    return {
      statusCode: 401,
      errorMessage: 'Authentication failed. Token may be expired or invalid.',
    };
  } else if (statusCode === 403) {
    return {
      statusCode: 403,
      errorMessage: 'Insufficient permissions to access activities',
    };
  } else if (statusCode === 429) {
    return {
      statusCode: 429,
      errorMessage: 'Rate limit exceeded. Please try again later.',
    };
  } else if (statusCode >= 500) {
    return {
      statusCode: 500,
      errorMessage: 'Strava API server error',
    };
  } else {
    return {
      statusCode: 500,
      errorMessage: 'Failed to fetch activities',
    };
  }
};

/**
 * Creates error response for activities fetch failures.
 *
 * @param {number} statusCode - HTTP status code from API response
 * @returns {Response} Error response with appropriate status code
 * @internal
 */
const createErrorResponse = (statusCode: number): Response => {
  const details = determineErrorDetails(statusCode);

  return new Response(
    JSON.stringify({
      error: details.errorMessage,
    }),
    {
      status: details.statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

/**
 * Fetches activities from Strava API and creates success response.
 *
 * @param {ServerTokenResult} tokens - OAuth tokens from cookies
 * @returns {Promise<Response>} Success response with activities data
 * @internal
 */
const fetchActivitiesAndCreateResponse = async (tokens: ServerTokenResult): Promise<Response> => {
  const url = `${STRAVA_API_BASE_URL}${STRAVA_ATHLETE_ACTIVITIES_ENDPOINT}`;
  const headers = {
    Authorization: `Bearer ${tokens.accessToken}`,
  };

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  const isOk = response.ok;

  if (!isOk) {
    return createErrorResponse(response.status);
  } else {
    const activities = await response.json();

    return new Response(JSON.stringify(activities), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

/**
 * Handles activities fetch with error handling.
 *
 * @param {ServerTokenResult} tokens - OAuth tokens from cookies
 * @returns {Promise<Response>} Success or error response
 * @internal
 */
const handleActivitiesFetch = async (tokens: ServerTokenResult): Promise<Response> => {
  try {
    return await fetchActivitiesAndCreateResponse(tokens);
  } catch (error) {
    const fetchError = error as { status?: number };
    const hasStatus = fetchError.status !== undefined;
    const statusCode = hasStatus ? fetchError.status! : 500;

    if (!hasStatus) {
      return new Response(
        JSON.stringify({
          error: 'Failed to fetch activities',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      return createErrorResponse(statusCode);
    }
  }
};

/**
 * Handles GET /strava/activities - Fetches list of Strava activities.
 *
 * Retrieves a list of activities for the authenticated athlete from Strava API.
 * Returns default pagination (30 activities per request) in raw Strava API format.
 * Requires authentication via cookies containing Strava OAuth tokens.
 *
 * @param {Request} request - HTTP request
 * @param {ServerConfig} config - Server configuration
 * @returns {Promise<Response>} JSON response with activities list or error
 */
const stravaActivities = async (request: Request, config: ServerConfig): Promise<Response> => {
  const tokens = getTokens(request);
  const hasTokens = tokens !== null;

  if (!hasTokens) {
    return createUnauthorizedResponse();
  } else {
    return await handleActivitiesFetch(tokens);
  }
};

export default stravaActivities;
