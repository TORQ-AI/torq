import { Activity } from '../../types';
import { CONFIG } from '../../constants';

/**
 * Classifies elevation terrain based on elevation gain.
 *
 * Categorizes terrain as flat, rolling, or mountainous based on
 * total elevation gain from the activity.
 *
 * @param {Activity} activity - Activity data to classify
 * @returns {'flat' | 'rolling' | 'mountainous'} Elevation classification
 *
 * @remarks
 * Classification thresholds:
 * - Flat: < 50m elevation gain
 * - Rolling: 50m - 500m elevation gain
 * - Mountainous: > 500m elevation gain
 */
const classifyElevation = (activity: Activity): 'flat' | 'rolling' | 'mountainous' => {
  if (activity.total_elevation_gain === undefined) {
    return 'flat';
  }
  
  const elevationGain = activity.total_elevation_gain;
  
  if (elevationGain < CONFIG.ELEVATION.FLAT_THRESHOLD) {
    return 'flat';
  }
  
  if (elevationGain >= CONFIG.ELEVATION.ROLLING_THRESHOLD) {
    return 'mountainous';
  }
  
  return 'rolling';
};

export default classifyElevation;
