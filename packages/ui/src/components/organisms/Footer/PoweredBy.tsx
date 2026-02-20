import { LINKS } from './constants';

/**
 * Powered by information.
 * @returns {JSX.Element} PoweredBy component.
 */
const PoweredBy = () => (
  <div className="flex flex-col gap-2">
    <h4 className="text-sm font-semibold text-muted-foreground">Powered by</h4>
    <a
      href={LINKS.POLLINATIONS_AI}
      target="_blank"
      rel="noreferrer"
      className="text-xs text-muted-foreground underline hover:text-foreground transition-colors w-fit"
    >
      Pollinations.AI
    </a>
    <a
      href={LINKS.NETLIFY}
      target="_blank"
      rel="noreferrer"
      className="text-xs text-muted-foreground underline hover:text-foreground transition-colors w-fit"
    >
      Netlify
    </a>
  </div>
);

export default PoweredBy;
