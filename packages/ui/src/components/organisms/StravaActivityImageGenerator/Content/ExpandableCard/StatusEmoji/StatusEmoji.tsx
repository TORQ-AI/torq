'use client';

import { Status } from '../types';
import getStatusEmoji from './getStatusEmoji';

interface StatusEmojiProps {
  status: Status;
}

/**
 * Status emoji.
 * @param {StatusEmojiProps} props - Component props.
 * @param {Status} props.status - The current status of the content.
 * @returns {JSX.Element | string} Status emoji.
 */
const StatusEmoji = ({ status }: StatusEmojiProps) => {
  const { emoji, animationClass } = getStatusEmoji(status);

  return (
    <span className={`inline-block ${animationClass || ''}`}>
      {emoji}
    </span>
  );
};

export default StatusEmoji;
