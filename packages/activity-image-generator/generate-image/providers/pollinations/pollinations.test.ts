import { test, expect } from 'bun:test';
import pollinationsProvider from './pollinations';

test('pollinationsProvider is a function', () => {
  expect(typeof pollinationsProvider).toBe('function');
});
