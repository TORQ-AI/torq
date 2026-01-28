import { describe, test, expect } from 'bun:test';
import validateActivity from './validate-activity';
import { Activity } from '../../types';

type Case = [
  string,
  {
    activity: Activity;
    expectedValid: boolean;
    expectedErrors?: string[];
  }
];

describe('validate-activity', () => {
  test.each<Case>([
    [
      'valid activity with required fields',
      {
        activity: {
          id: 123456,
          type: 'Ride',
          sport_type: 'MountainBikeRide',
        },
        expectedValid: true,
        expectedErrors: [],
      },
    ],
    [
      'activity missing type field',
      {
        activity: {
          id: 123456,
          sport_type: 'MountainBikeRide',
        } as Activity,
        expectedValid: false,
        expectedErrors: ['Activity type is required and must be a string'],
      },
    ],
    [
      'activity missing sport_type field',
      {
        activity: {
          id: 123456,
          type: 'Ride',
        } as Activity,
        expectedValid: false,
        expectedErrors: ['Activity sport_type is required and must be a string'],
      },
    ],
    [
      'activity with invalid distance',
      {
        activity: {
          id: 123456,
          type: 'Ride',
          sport_type: 'MountainBikeRide',
          distance: -100,
        },
        expectedValid: false,
        expectedErrors: ['Distance must be greater than 0'],
      },
    ],
    [
      'activity with zero distance',
      {
        activity: {
          id: 123456,
          type: 'Ride',
          sport_type: 'MountainBikeRide',
          distance: 0,
        },
        expectedValid: false,
        expectedErrors: ['Distance must be greater than 0'],
      },
    ],
    [
      'activity with negative elevation gain',
      {
        activity: {
          id: 123456,
          type: 'Ride',
          sport_type: 'MountainBikeRide',
          total_elevation_gain: -50,
        },
        expectedValid: false,
        expectedErrors: ['Elevation gain must be non-negative'],
      },
    ],
    [
      'activity with valid optional fields',
      {
        activity: {
          id: 123456,
          type: 'Ride',
          sport_type: 'MountainBikeRide',
          distance: 10000,
          total_elevation_gain: 500,
          moving_time: 3600,
        },
        expectedValid: true,
        expectedErrors: [],
      },
    ],
  ])('%s', (_name, { activity, expectedValid, expectedErrors }) => {
    const result = validateActivity(activity);
    
    expect(result.valid).toBe(expectedValid);
    
    if (expectedErrors !== undefined) {
      expect(result.errors).toStrictEqual(expectedErrors);
    }
  });
});
