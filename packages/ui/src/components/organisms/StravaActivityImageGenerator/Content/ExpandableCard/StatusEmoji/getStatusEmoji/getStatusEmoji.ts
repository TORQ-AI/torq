'use client';

import { Status } from '../../types';
import { EMOJIS } from '../constants';
import { Output } from './types';

/**
 * Gets the corresponding emoji for a given status. 
 * @param {Status} status - The current status of the content.
 * @returns {Output} The emoji and optional animation representing the status.
 */
const getStatusEmoji = (status: Status): Output => {
  switch (status) {
    case 'loading': {
      return {
        emoji: EMOJIS.LOADING,
        animationClass: 'animate-spin-status',
      };
    }
    case 'loaded': {
      return {
        emoji: EMOJIS.DONE,
      };
    }
    case 'error': {
      return {
        emoji: EMOJIS.ERROR,
      };
    }
    case 'pending': {
      return {
        emoji: EMOJIS.PENDING,
        animationClass: 'animate-flip',
      };
    }
    default: {
      return {
        emoji: EMOJIS.PENDING,
      };
    }
  }
};

export default getStatusEmoji;
