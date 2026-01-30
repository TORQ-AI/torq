import { test, expect, beforeEach, afterEach, mock } from 'bun:test';
import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'os';
import generateImage from './generate-image';
import { StravaActivityImagePrompt } from '../types';

type Case = [
  string,
  {
    prompt: StravaActivityImagePrompt;
    saveDirectory: string;
    baseUrl: string;
    fetchResponses: any[];
    shouldThrow: boolean;
    expectedError?: string;
    expectedUsedFallback: boolean;
    expectedRetriesPerformed: number;
  },
];

const testState = {
  originalEnv: process.env.DIAL_KEY,
  originalImageProvider: process.env.IMAGE_PROVIDER,
  originalFetch: global.fetch,
  testDir: join(tmpdir(), `test-images-${Date.now()}`),
};

beforeEach(async () => {
  testState.originalEnv = process.env.DIAL_KEY;
  testState.originalImageProvider = process.env.IMAGE_PROVIDER;
  testState.originalFetch = global.fetch;
  await mkdir(testState.testDir, { recursive: true });
});

afterEach(async () => {
  if (testState.originalEnv !== undefined) {
    process.env.DIAL_KEY = testState.originalEnv;
  } else {
    delete process.env.DIAL_KEY;
  }
  if (testState.originalImageProvider !== undefined) {
    process.env.IMAGE_PROVIDER = testState.originalImageProvider;
  } else {
    delete process.env.IMAGE_PROVIDER;
  }
  global.fetch = testState.originalFetch;
  try {
    await rm(testState.testDir, { recursive: true, force: true });
  } catch {
    // Ignore cleanup errors
  }
});

test.each<Case>([
  [
    'successfully generates image on first attempt',
    {
      prompt: {
        style: 'cartoon',
        mood: 'energetic',
        subject: 'runner',
        scene: 'park',
        text: 'cartoon style, runner, energetic mood, park',
      },
      saveDirectory: testState.testDir,
      baseUrl: 'http://localhost:3000',
      fetchResponses: [
        {
          ok: true,
          arrayBuffer: async () => new TextEncoder().encode('fake-image').buffer,
          statusText: 'OK',
        },
      ],
      shouldThrow: false,
      expectedUsedFallback: false,
      expectedRetriesPerformed: 0,
    },
  ],
])(
    '%#. %s',
    async (
      _name,
      {
        prompt,
        saveDirectory,
        baseUrl,
        fetchResponses,
        shouldThrow,
        expectedError,
        expectedUsedFallback,
        expectedRetriesPerformed,
      }
    ) => {
      let callCount = 0;
      // @ts-expect-error fix ts errors
      global.fetch = mock((url: RequestInfo | URL) => {
        const response = fetchResponses[callCount] ?? fetchResponses[fetchResponses.length - 1];
        callCount++;
        const urlString = typeof url === 'string' ? url : url.toString();

        // Handle DIAL provider responses
        if (urlString.includes('ai-proxy.lab.epam.com') && !urlString.includes('chat/completions')) {
          return Promise.resolve({
            ok: true,
            arrayBuffer: async () => new TextEncoder().encode('fake-image').buffer,
            statusText: 'OK',
          } as Response);
        }

        // Handle Pollinations provider responses (default)
        if (urlString.includes('pollinations.ai')) {
          return Promise.resolve({
            ok: true,
            arrayBuffer: async () => new TextEncoder().encode('fake-image').buffer,
            statusText: 'OK',
          } as Response);
        }

        // Handle DIAL API JSON responses
        return Promise.resolve({
          json: async () => response,
        } as Response);
      });

      if (shouldThrow) {
        await expect(generateImage({ prompt })).rejects.toThrow(expectedError);
      } else {
        const result = await generateImage({ prompt });
        expect(result.fallback).toBe(expectedUsedFallback);
        expect(result.attempts).toBe(expectedRetriesPerformed);
        expect(result.imageData).toBeTruthy();
        expect(typeof result.imageData).toBe('string');
        expect(result.imageData).toMatch(/^data:image\/png;base64,/);
      }
    }
  );

test('throws error when prompt text exceeds 400 characters', async () => {
  delete process.env.IMAGE_PROVIDER; // Use default (pollinations)

  const longPrompt: StravaActivityImagePrompt = {
    style: 'cartoon',
    mood: 'energetic',
    subject: 'runner',
    scene: 'park',
    text: 'a'.repeat(401),
  };

  await expect(generateImage({ prompt: longPrompt })).rejects.toThrow('exceeds 400 character limit');
});

test('uses Pollinations provider by default', async () => {
  delete process.env.IMAGE_PROVIDER;
  delete process.env.DIAL_KEY;

  const mockImageBuffer = new TextEncoder().encode('fake-image-data').buffer;
  const mockFetch = mock(() =>
    Promise.resolve({
      ok: true,
      arrayBuffer: async () => mockImageBuffer,
    } as Response)
  );
  global.fetch = mockFetch as any;

  const prompt: StravaActivityImagePrompt = {
    style: 'cartoon',
    mood: 'energetic',
    subject: 'runner',
    scene: 'park',
    text: 'cartoon style, runner, energetic mood, park',
  };

  const result = await generateImage({ prompt });

  expect(result.imageData).toMatch(/^http:\/\/localhost:3000\/images\/[a-f0-9-]+$/);
  expect(mockFetch).toHaveBeenCalled();
  // @ts-expect-error fix ts errors
  const fetchUrl = mockFetch.mock.calls[0][0];
  // @ts-expect-error fix ts errors
  expect(fetchUrl).toContain('pollinations.ai');
});
