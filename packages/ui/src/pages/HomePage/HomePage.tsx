import { Page } from '@geist-ui/core';

import { useAuthStatus } from '../../hooks/useAuthStatus';
import Preloader from '../../components/Preloader';
import useRemoveAuthUrlParameters from './useRemoveAuthUrlParameters';
import Deferred from '../../components/Deferred';
import Guest from './Guest';
import Member from './Member';

/**
 * Home page component.
 * Shows login button or welcome message based on authentication status.
 * Uses /strava/auth/status endpoint to check auth - does not fetch activities.
 *
 * @returns {JSX.Element} Home page component.
 */
const HomePage = (): JSX.Element => {
  const { isAuthenticated, loading } = useAuthStatus();

  useRemoveAuthUrlParameters();

  return (
    <Deferred ready={!loading} fallback={<Preloader />}>
      <Page.Content
        aria-live='polite'
        role='main'>
        {isAuthenticated ? <Member /> : <Guest />}
      </Page.Content>
    </Deferred>
  );
};

export default HomePage;
