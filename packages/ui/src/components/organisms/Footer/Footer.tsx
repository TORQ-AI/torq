
import Copywrite from './Copywrite';
import PoweredBy from './PoweredBy';

/**
 * Application footer.
 * @returns {JSX.Element} Footer component.
 */
const Footer = () => (
  <footer className="flex justify-center items-center w-full py-4 border-t border-border">
    <div className="w-full max-w-[1000px] grid grid-cols-1 gap-8 md:grid-cols-2">
      <Copywrite />
      <PoweredBy />
    </div>
  </footer>
);

export default Footer;
