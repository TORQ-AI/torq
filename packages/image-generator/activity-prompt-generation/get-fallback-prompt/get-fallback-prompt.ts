import { ActivityImagePrompt } from '../../types';

/**
 * Returns a safe fallback prompt for error cases.
 *
 * Provides a minimal, safe prompt that complies with all guardrails.
 * Used when valid prompt generation fails or unsafe content is detected.
 *
 * @returns {ActivityImagePrompt} Safe fallback prompt
 *
 * @remarks
 * Fallback prompt uses minimal style and generic subject to ensure
 * safety and compliance with all guardrails.
 */
const getFallbackPrompt = (): ActivityImagePrompt => {
  return {
    style: 'minimal',
    mood: 'neutral',
    subject: 'athlete',
    scene: 'simple outdoor setting',
    text: 'minimal style, athlete, neutral mood, simple outdoor setting',
  };
};

export default getFallbackPrompt;
