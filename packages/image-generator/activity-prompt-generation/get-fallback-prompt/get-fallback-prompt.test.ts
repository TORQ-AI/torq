import { describe, test, expect } from 'bun:test';
import getFallbackPrompt from './get-fallback-prompt';
import validateActivityImagePrompt from '../../activity-guardrails/validate-prompt';

describe('get-fallback-prompt', () => {
  test('returns valid fallback prompt', () => {
    const prompt = getFallbackPrompt();
    
    expect(prompt.style).toBe('minimal');
    expect(prompt.mood).toBe('neutral');
    expect(prompt.subject).toBe('athlete');
    expect(prompt.scene).toBe('simple outdoor setting');
    expect(prompt.text).toBe('minimal style, athlete, neutral mood, simple outdoor setting');
  });
  
  test('fallback prompt passes validation', () => {
    const prompt = getFallbackPrompt();
    const validation = validateActivityImagePrompt(prompt);
    
    expect(validation.valid).toBe(true);
    expect(validation.errors).toStrictEqual([]);
  });
});
