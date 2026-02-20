'use client';


import useEmoji from './useEmoji';
import { cn } from '@/lib/utils';

/**
 * Interactive activity emoji component.
 * Changes emoji every 5 seconds with smooth fade and scale animation.
 * Cycles through comprehensive list of sport activities with skin tone variations.
 * @returns {JSX.Element} Interactive activity emoji component with rotation animation.
 */
const ActivityEmoji = (): JSX.Element => {
  const { emoji, isEmojiAnimating } = useEmoji();
  const rootClassList = cn(
    'inline-block text-[1.2em] transition-all duration-[400ms] ease-in-out',
    isEmojiAnimating && 'animate-emoji-transition'
  );

  return (
    <span
      className={rootClassList}
      role="img"
      aria-label={`Activity emoji: ${emoji}`}
      title="Rotating sport activity emoji"
    >
      {emoji}
    </span>
  );
};

export default ActivityEmoji;
