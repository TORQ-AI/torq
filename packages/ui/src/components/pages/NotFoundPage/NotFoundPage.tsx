/**
 * Not-found page.
 * @returns {JSX.Element} Not-found page.
 */
const NotFoundPage = (): JSX.Element => (
  <div
    className="'flex flex-col items-center justify-center min-h-screen gap-4'"
  >
    <h1 style={{ margin: 0 }}>404</h1>
    <p style={{ margin: 0 }}>Page Not Found</p>
  </div>
);

export default NotFoundPage;
