import { describe, test, expect } from 'bun:test';
import extractSignals from './extract-signals';
import { Activity } from '../../../types';

describe('extract-signals', () => {
  test('extracts signals from valid activity', async () => {
    const activity: Activity = {
      id: 123456,
      type: 'Ride',
      sport_type: 'MountainBikeRide',
      distance: 28099,
      moving_time: 4207,
      total_elevation_gain: 516,
      start_date_local: '2018-02-16T06:52:54Z',
    };
    
    const signals = await extractSignals(activity);
    
    expect(signals.activityType).toBe('MountainBikeRide');
    expect(signals.intensity).toBeDefined();
    expect(signals.elevation).toBeDefined();
    expect(signals.timeOfDay).toBeDefined();
    expect(Array.isArray(signals.tags)).toBe(true);
  });
  
  test('throws error for invalid activity', async () => {
    const activity: Activity = {
      id: 123456,
      // Missing required fields
    } as Activity;
    
    await expect(extractSignals(activity)).rejects.toThrow();
  });
});
