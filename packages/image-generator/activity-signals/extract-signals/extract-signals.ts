import { Activity, ActivitySignals } from '../../types';
import validateActivity from '../../activity-guardrails/validate-activity';
import validateActivitySignals from '../../activity-guardrails/validate-signals';
import classifyIntensity from '../classify-intensity';
import classifyElevation from '../classify-elevation';
import extractTimeSignals from '../extract-time-signals';
import extractWeatherSignals from '../extract-weather-signals';
import extractTagSignals from '../extract-tag-signals';
import normalizeText from '../normalize-text';

/**
 * Extracts semantic signals from Strava activity data.
 *
 * Main entry point for signal extraction. Processes activity data to extract
 * all semantic signals needed for prompt generation, including intensity,
 * elevation, time of day, weather, tags, and semantic context from user text.
 *
 * @param {Activity} activity - Strava activity data to extract signals from
 * @returns {Promise<ActivitySignals>} Promise resolving to extracted and validated activity signals
 * @throws {Error} Throws error if activity validation fails
 *
 * @remarks
 * Signal extraction process:
 * 1. Validates activity data via Activity Guardrails
 * 2. Extracts activity type from sport_type
 * 3. Classifies intensity based on pace/heart rate/power
 * 4. Classifies elevation based on elevation gain
 * 5. Extracts time of day from activity timestamps
 * 6. Extracts weather signals if available
 * 7. Normalizes and extracts tags
 * 8. Processes user text (name, description) for semantic context
 * 9. Validates extracted signals via Activity Guardrails
 */
const extractSignals = async (activity: Activity): Promise<ActivitySignals> => {
  // Validate activity first
  const activityValidation = validateActivity(activity);
  if (!activityValidation.valid) {
    throw new Error(`Activity validation failed: ${activityValidation.errors.join(', ')}`);
  }
  
  // Extract activity type
  const activityType = activity.sport_type ?? activity.type ?? 'Unknown';
  
  // Classify intensity
  const intensity = classifyIntensity(activity);
  
  // Classify elevation
  const elevation = classifyElevation(activity);
  
  // Extract time of day
  const timeOfDay = extractTimeSignals(activity);
  
  // Extract weather (optional)
  const weather = extractWeatherSignals(activity);
  
  // Extract tags
  const tags = extractTagSignals(activity);
  
  // Extract semantic context from user text
  const semanticContextParts: string[] = [];
  
  if (activity.name) {
    const nameSignals = normalizeText(activity.name);
    semanticContextParts.push(...nameSignals);
  }
  
  if (activity.description) {
    const descSignals = normalizeText(activity.description);
    semanticContextParts.push(...descSignals);
  }
  
  const semanticContext = semanticContextParts.length > 0 ? semanticContextParts : undefined;
  
  // Extract brands from gear (if available and compliant)
  const brands: string[] | undefined = activity.gear?.name
    ? [activity.gear.name]
    : undefined;
  
  // Build signals object
  const signals: ActivitySignals = {
    activityType,
    intensity,
    elevation,
    timeOfDay,
    weather,
    tags,
    brands,
    semanticContext,
  };
  
  // Validate signals
  const signalsValidation = validateActivitySignals(signals);
  if (!signalsValidation.valid) {
    // Use sanitized version if available, otherwise throw
    if (signalsValidation.sanitized) {
      return signalsValidation.sanitized;
    }
    throw new Error(`Signal validation failed: ${signalsValidation.errors.join(', ')}`);
  }
  
  return signals;
};

export default extractSignals;
