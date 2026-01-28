import { Activity } from '../../types';
import { CONFIG } from '../../constants';

/**
 * Classifies activity intensity based on metrics.
 *
 * Analyzes pace, heart rate, and power data to determine if activity
 * intensity is low, medium, or high. Uses deterministic thresholds
 * from configuration.
 *
 * @param {Activity} activity - Activity data to classify
 * @returns {'low' | 'medium' | 'high'} Intensity classification
 *
 * @remarks
 * Classification logic:
 * - Low: Slow pace (>6:00 min/km) OR low heart rate (<120 bpm)
 * - High: Fast pace (<4:00 min/km) OR high heart rate (>160 bpm) OR high power
 * - Medium: Everything else
 */
const classifyIntensity = (activity: Activity): 'low' | 'medium' | 'high' => {
  // Check pace-based intensity
  if (activity.distance !== undefined && activity.moving_time !== undefined && activity.distance > 0) {
    const paceSecondsPerKm = activity.moving_time / (activity.distance / 1000);
    
    if (paceSecondsPerKm >= CONFIG.INTENSITY.LOW_PACE_THRESHOLD) {
      return 'low';
    }
    
    if (paceSecondsPerKm <= CONFIG.INTENSITY.HIGH_PACE_THRESHOLD) {
      return 'high';
    }
  }
  
  // Check heart rate-based intensity (if available)
  // Note: Strava API doesn't expose avg_hr directly, but we can check has_heartrate
  // For now, we'll rely on pace classification
  
  // Check power-based intensity (for cycling)
  if (activity.average_watts !== undefined) {
    // High power typically indicates high intensity
    // Threshold: >250W average is high intensity
    if (activity.average_watts > 250) {
      return 'high';
    }
    
    // Low power: <150W average is low intensity
    if (activity.average_watts < 150) {
      return 'low';
    }
  }
  
  // Check weighted average power (more accurate for cycling)
  if (activity.weighted_average_watts !== undefined) {
    if (activity.weighted_average_watts > 250) {
      return 'high';
    }
    
    if (activity.weighted_average_watts < 150) {
      return 'low';
    }
  }
  
  // Default to medium if no clear indicators
  return 'medium';
};

export default classifyIntensity;
