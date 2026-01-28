import { ActivitySignals } from '../../types';

/**
 * Selects visual style for image generation based on activity signals.
 *
 * Style selection is deterministic and based on activity characteristics.
 * Follows the style selection rules from the specification.
 *
 * @param {ActivitySignals} signals - Activity signals to base style selection on
 * @returns {'cartoon' | 'minimal' | 'abstract' | 'illustrated'} Selected visual style
 *
 * @remarks
 * Style selection rules (deterministic):
 * - High intensity + (Run|Ride|Trail Run) → illustrated
 * - Recovery/easy tags → minimal
 * - High elevation → illustrated
 * - Foggy weather → abstract
 * - Default → cartoon
 */
const selectStyle = (signals: ActivitySignals): 'cartoon' | 'minimal' | 'abstract' | 'illustrated' => {
  // Check for recovery/easy tags first
  const hasRecoveryTag = signals.tags.includes('recovery') || signals.tags.includes('easy');
  if (hasRecoveryTag) {
    return 'minimal';
  }
  
  // Check for foggy weather
  if (signals.weather === 'foggy') {
    return 'abstract';
  }
  
  // Check for high elevation
  if (signals.elevation === 'mountainous') {
    return 'illustrated';
  }
  
  // Check for high intensity + known activity types
  if (signals.intensity === 'high') {
    const highIntensityActivities = ['Run', 'Ride', 'TrailRun'];
    if (highIntensityActivities.includes(signals.activityType)) {
      return 'illustrated';
    }
  }
  
  // Default to cartoon
  return 'cartoon';
};

export default selectStyle;
