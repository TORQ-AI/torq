import { Github, Globe } from 'lucide-react';

import { LINKS } from './constants';

/**
 * Copywrite information.
 * @returns {JSX.Element} Copywrite component.
 */
const Copywrite = () => (
  <div className="flex flex-col gap-8">
    <span className="text-sm text-muted-foreground">
      © {new Date().getFullYear()} TORQ by Mr.B.Lab
    </span>
    <div className="flex gap-2">
      <a
        href={LINKS.PROJECT_GITHUB}
        target="_blank"
        rel="noreferrer"
        aria-label="Go to TORQ GitHub"
        title="Go to TORQ GitHub"
        className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Github size={14} />
      </a>
      <a
        href={LINKS.AUTHOR_BLOG}
        target="_blank"
        rel="noreferrer"
        aria-label="Go to Mr.B. Blog"
        title="Go to Mr.B. Blog"
        className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-input bg-background text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Globe size={14} />
      </a>
    </div>
  </div>
);

export default Copywrite;
