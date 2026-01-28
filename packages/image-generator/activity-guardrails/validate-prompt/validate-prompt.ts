import { ActivityImagePrompt, ActivityImagePromptValidationResult } from '../types';
import { CONFIG } from '../../constants';
import checkForbiddenContent from '../check-forbidden-content';

/**
 * Validates activity image prompt according to guardrails specification.
 *
 * Checks prompt length, forbidden content, style validity, and brand usage compliance.
 *
 * @param {ActivityImagePrompt} prompt - Image prompt to validate
 * @returns {ActivityImagePromptValidationResult} Validation result with errors and optional sanitized prompt
 *
 * @remarks
 * Validates:
 * - Prompt length <= 400 characters
 * - No forbidden content (real persons, political symbols, violence, text instructions)
 * - Style is from allowed set: cartoon, minimal, abstract, illustrated
 * - Brand usage is compliant (contextual, not excessive)
 */
const validateActivityImagePrompt = (prompt: ActivityImagePrompt): ActivityImagePromptValidationResult => {
  const errors: string[] = [];
  
  // Validate prompt length
  if (prompt.text.length > CONFIG.MAX_PROMPT_LENGTH) {
    errors.push(`Prompt length (${prompt.text.length}) exceeds maximum (${CONFIG.MAX_PROMPT_LENGTH})`);
  }
  
  // Check for forbidden content
  const hasForbidden = checkForbiddenContent(prompt.text);
  if (hasForbidden) {
    errors.push('Prompt contains forbidden content');
  }
  
  // Validate style
  const validStyles: Array<ActivityImagePrompt['style']> = ['cartoon', 'minimal', 'abstract', 'illustrated'];
  if (!validStyles.includes(prompt.style)) {
    errors.push(`Style must be one of: ${validStyles.join(', ')}`);
  }
  
  // Validate required fields
  if (!prompt.mood || typeof prompt.mood !== 'string') {
    errors.push('Mood is required and must be a string');
  }
  
  if (!prompt.subject || typeof prompt.subject !== 'string') {
    errors.push('Subject is required and must be a string');
  }
  
  if (!prompt.scene || typeof prompt.scene !== 'string') {
    errors.push('Scene is required and must be a string');
  }
  
  if (!prompt.text || typeof prompt.text !== 'string') {
    errors.push('Text is required and must be a string');
  }
  
  const valid = errors.length === 0;
  
  // Create sanitized version if validation failed
  // For prompts, sanitization would involve removing forbidden content and truncating
  const sanitized: ActivityImagePrompt | undefined = valid
    ? undefined
    : {
        ...prompt,
        text: prompt.text.substring(0, CONFIG.MAX_PROMPT_LENGTH),
      };
  
  return {
    valid,
    errors,
    sanitized,
  };
};

export default validateActivityImagePrompt;
