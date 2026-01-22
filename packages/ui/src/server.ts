#!/usr/bin/env bun

/**
 * UI Server for PACE
 *
 * Provides web endpoints for Strava OAuth authorization and token management.
 */

import getConfig from '../config';
import { handleStravaAuth, handleStravaAuthCallback, handleRoot } from '../routes';

const config = getConfig();

const server = Bun.serve({
  hostname: config.hostname,
  routes: {
    '/': {
      GET: (request) => handleRoot(request, config),
    },
    '/strava/auth': {
      GET: (request) => handleStravaAuth(request, config),
    },
    '/strava/auth/callback': {
      GET: async (request) => await handleStravaAuthCallback(request, config),
    },
  },
  development: {
    hmr: false,
    console: true,
  },
  error(error) {
    console.error('Server error:', error);
    return new Response('Internal Server Error', { status: 500 });
  },
});

const serverUrl = `http://${config.hostname}${server.port ? `:${server.port}` : ''}`;
console.log(`🚀 PACE UI Server running on ${serverUrl}`);
console.log(`📋 Strava Auth: ${serverUrl}/strava/auth`);
