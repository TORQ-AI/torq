import { ActivityImagePrompt } from '../../types';
import { CONFIG } from '../../constants';

/**
 * Assembles final prompt text from prompt components.
 *
 * Constructs the complete prompt text within character limit.
 * Truncates scene details first if needed, preserving core subject and style.
 *
 * @param {ActivityImagePrompt} prompt - Prompt components to assemble
 * @returns {string} Assembled prompt text (max 400 characters)
 *
 * @remarks
 * Prompt structure: "{style} style, {subject}, {mood} mood, {scene}"
 * If over character limit, truncates scene details first.
 */
const assemblePrompt = (prompt: Omit<ActivityImagePrompt, 'text'>): string => {
  // Build base prompt
  let promptText = `${prompt.style} style, ${prompt.subject}, ${prompt.mood} mood, ${prompt.scene}`;
  
  // Truncate if over limit
  if (promptText.length > CONFIG.MAX_PROMPT_LENGTH) {
    // Calculate available space for scene (preserve style, subject, mood)
    const baseText = `${prompt.style} style, ${prompt.subject}, ${prompt.mood} mood, `;
    const maxSceneLength = CONFIG.MAX_PROMPT_LENGTH - baseText.length;
    
    // Truncate scene
    const truncatedScene = prompt.scene.substring(0, Math.max(0, maxSceneLength - 3)) + '...';
    promptText = baseText + truncatedScene;
  }
  
  return promptText;
};

export default assemblePrompt;
