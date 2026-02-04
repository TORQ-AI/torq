import { Page } from '@geist-ui/core';
import { Router, Route, Switch } from 'wouter';
import { lazy, Suspense } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { Theme } from './types';

const HomePageLazy = lazy(() => import('./pages/HomePage'));
const ActivitiesPageLazy = lazy(() => import('./pages/ActivitiesPage'));

interface AppProps {
  onThemeChange: (theme: Theme) => void;
}

/**
 * Main application component with routing.
 * 
 * @param {AppProps} props - Component props.
 * @param {Function} props.onThemeChange - Callback to change theme.
 * @returns {JSX.Element} Main app component with routing.
 */
const App = ({ onThemeChange }: AppProps) => (
  <Page>
    <Header onThemeChange={onThemeChange} />
    <Suspense fallback={<Preloader />}>
      <Router>
        <Switch>
          <Route path='/' component={HomePageLazy} />
          <Route path='/activities' component={ActivitiesPageLazy} />
          <Route>404 - Page Not Found</Route>
        </Switch>
      </Router>
    </Suspense>
    <Footer />
  </Page>
);

export default App;
