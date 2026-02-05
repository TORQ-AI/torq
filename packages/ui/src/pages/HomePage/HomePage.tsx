import { useAuthStatus } from '../../hooks/useAuthStatus';
import useRemoveAuthUrlParams from './useRemoveAuthParams';
import Preloader from '../../components/Preloader';
import Deferred from '../../components/Deferred';
import Guest from './Guest';
import Member from './Member';

/**
 * Home page component.
 * Shows login button or welcome message based on authentication status.
 * Uses /strava/auth/status endpoint to check auth - does not fetch activities.
 * @returns {JSX.Element} Home page component.
 */
const HomePage = (): JSX.Element => {
  const { isAuthenticated, loading } = useAuthStatus();

  useRemoveAuthUrlParams();

  return (
    <Deferred ready={!loading} fallback={<Preloader />}>
      {isAuthenticated ? <Member /> : <Guest />}
    </Deferred>
  );
};

export default HomePage;
