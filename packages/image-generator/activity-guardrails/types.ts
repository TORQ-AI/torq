import { Activity, ActivitySignals, ActivityImagePrompt, ValidationResult } from '../types';

/**
 * Validation result for activity data.
 */
export type ActivityValidationResult = ValidationResult<Activity>;

/**
 * Validation result for activity signals.
 */
export type ActivitySignalsValidationResult = ValidationResult<ActivitySignals>;

/**
 * Validation result for activity image prompt.
 */
export type ActivityImagePromptValidationResult = ValidationResult<ActivityImagePrompt>;
