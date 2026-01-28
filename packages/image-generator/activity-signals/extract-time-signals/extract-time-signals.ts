import { Activity } from '../../types';
import { CONFIG } from '../../constants';

/**
 * Extracts time of day signal from activity timestamps.
 *
 * Determines time of day (morning, day, evening, night) based on
 * activity start time. Uses local time if available, otherwise UTC.
 *
 * @param {Activity} activity - Activity data to extract time from
 * @returns {'morning' | 'day' | 'evening' | 'night'} Time of day classification
 *
 * @remarks
 * Time classifications:
 * - Morning: 5:00 - 10:00
 * - Day: 10:00 - 17:00
 * - Evening: 17:00 - 20:00
 * - Night: 20:00 - 5:00
 */
const extractTimeSignals = (activity: Activity): 'morning' | 'day' | 'evening' | 'night' => {
  // Prefer local time, fall back to UTC
  const timeString = activity.start_date_local ?? activity.start_date;
  
  if (!timeString) {
    return 'day'; // Default to day if no time available
  }
  
  const date = new Date(timeString);
  const hour = date.getHours();
  
  if (hour >= CONFIG.TIME_OF_DAY.MORNING_START && hour < CONFIG.TIME_OF_DAY.MORNING_END) {
    return 'morning';
  }
  
  if (hour >= CONFIG.TIME_OF_DAY.MORNING_END && hour < CONFIG.TIME_OF_DAY.EVENING_START) {
    return 'day';
  }
  
  if (hour >= CONFIG.TIME_OF_DAY.EVENING_START && hour < CONFIG.TIME_OF_DAY.NIGHT_START) {
    return 'evening';
  }
  
  return 'night';
};

export default extractTimeSignals;
