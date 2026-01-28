import { ActivitySignals } from '../../types';

/**
 * Selects mood descriptor based on activity signals.
 *
 * Mood selection is deterministic and aligns with activity characteristics.
 * Priority: tags → intensity → weather.
 *
 * @param {ActivitySignals} signals - Activity signals to base mood selection on
 * @returns {string} Mood descriptor (e.g., "calm", "intense", "focused")
 *
 * @remarks
 * Mood selection priority:
 * 1. Tag signals (recovery → calm, race → intense)
 * 2. Intensity level (low → calm, high → intense)
 * 3. Weather conditions (sunny → energetic, rainy → contemplative)
 */
const selectMood = (signals: ActivitySignals): string => {
  // Priority 1: Tag-based mood
  if (signals.tags.includes('recovery')) {
    return 'calm';
  }
  
  if (signals.tags.includes('race')) {
    return 'intense';
  }
  
  if (signals.tags.includes('commute')) {
    return 'routine';
  }
  
  if (signals.tags.includes('with kid')) {
    return 'playful';
  }
  
  // Priority 2: Weather-based mood (before intensity, as per spec)
  if (signals.weather === 'sunny') {
    return 'energetic';
  }
  
  if (signals.weather === 'rainy') {
    return 'contemplative';
  }
  
  if (signals.weather === 'foggy') {
    return 'mysterious';
  }
  
  // Priority 3: Intensity-based mood
  if (signals.intensity === 'low') {
    return 'calm';
  }
  
  if (signals.intensity === 'high') {
    return 'intense';
  }
  
  if (signals.intensity === 'medium') {
    return 'focused';
  }
  
  // Default mood
  return 'focused';
};

export default selectMood;
