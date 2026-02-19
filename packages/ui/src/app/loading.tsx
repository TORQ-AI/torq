import Preloader from '../components/Preloader';

/**
 * Root loading state shown by Next.js Suspense during page navigation.
 *
 * @returns {JSX.Element} Loading indicator.
 */
const Loading = (): JSX.Element => <Preloader />;

export default Loading;
