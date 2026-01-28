import { ActivitySignals, ActivityImagePrompt } from '../types';
import { validateActivityImagePrompt } from '../guardrails';
import selectStyle from './select-style';
import selectMood from './select-mood';
import composeScene from './compose-scene';
import assemblePrompt from './assemble-prompt';
import { DEFAULT_PROMPT } from './constants';
/**
 * Generates image generation prompt from activity signals.
 *
 * Main entry point for prompt generation. Creates a complete prompt
 * structure by selecting style, mood, and composing scene based on
 * activity signals. Validates the prompt and falls back to safe default
 * if validation fails.
 *
 * @param {ActivitySignals} signals - Activity signals to generate prompt from
 * @returns {ActivityImagePrompt} Generated and validated prompt
 *
 * @remarks
 * Prompt generation process:
 * 1. Select visual style (deterministic)
 * 2. Select mood descriptor
 * 3. Compose scene description
 * 4. Assemble final prompt text
 * 5. Validate prompt via Activity Guardrails
 * 6. Use fallback if validation fails
 */
const generatePrompt = (signals: ActivitySignals): ActivityImagePrompt => {
  // Select style
  const style = selectStyle(signals);
  
  // Select mood
  const mood = selectMood(signals);
  
  // Compose scene
  const { subject, scene } = composeScene(signals);
  
  // Assemble prompt
  const text = assemblePrompt({
    style,
    mood,
    subject,
    scene,
  });
  
  // Create prompt object
  const prompt: ActivityImagePrompt = {
    style,
    mood,
    subject,
    scene,
    text,
  };
  
  // Validate prompt
  const validation = validateActivityImagePrompt(prompt);
  
  if (!validation.valid) {
    // Use sanitized version if available, otherwise fallback
    if (validation.sanitized) {
      return validation.sanitized;
    } else {
      return DEFAULT_PROMPT;
    }
  }
  
  return prompt;
};

export default generatePrompt;
