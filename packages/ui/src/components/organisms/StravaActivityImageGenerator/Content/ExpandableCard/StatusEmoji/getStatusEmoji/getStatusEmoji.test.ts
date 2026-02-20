import { describe, test, expect } from 'bun:test';

import getStatusEmoji from './getStatusEmoji';
import { Status } from '../../types';
import { EMOJIS } from '../constants';
import { Output } from './types';

type Case = [
  string,
  Status,
  Output,
];

describe('getStatusEmoji', () => {
  test.each<Case>([
    [
      'loading status showing spinner with rotation',
      'loading',
      {
        emoji: EMOJIS.LOADING,
        animationClass: 'animate-spin-status',
      },
    ],
    [
      'successful completion showing checkmark',
      'loaded',
      {
        emoji: EMOJIS.DONE,
      },
    ],
    [
      'error status showing dizzy face',
      'error',
      {
        emoji: EMOJIS.ERROR,
      },
    ],
    [
      'waiting status showing hourglass with flip',
      'pending',
      {
        emoji: EMOJIS.PENDING,
        animationClass: 'animate-flip',
      },
    ],
  ])('%#. %s', (_name, status, expected) => {
    const result = getStatusEmoji(status);

    expect(result).toStrictEqual(expected);
  });
});
