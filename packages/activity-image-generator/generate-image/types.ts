import { ImageGenerationProviderName, StravaActivityImagePrompt } from '../types';

/**
 * Input for image generation.
 */
export interface GenerateImageInput {
  /** Image generation prompt from activity data. */
  prompt: StravaActivityImagePrompt;
  /** Number of retry attempts made so far. */
  attempts?: number;
  provider?: ImageGenerationProviderName;
<<<<<<< HEAD
};
=======
}
>>>>>>> a24e8e8b4d99cfd9ac6c73aead3b30e8b87836b0

/**
 * Output from image generation.
 */
export interface GenerateImageOutput {
  /** Base64-encoded image data URL. */
  imageData: string;
  /** Whether fallback was used. */
  fallback: boolean;
  /** Number of retry attempts performed. */
  attempts: number;
<<<<<<< HEAD
};
=======
}

/**
 * Common interface for all image generation providers.
 * Generates an image from a text prompt.
 * 
 * @param {string} prompt - Text prompt for image generation.
 * @returns {Promise<string>} Promise resolving to base64-encoded image data URL (`data:image/png;base64,...`).
 * @throws {Error} Throws error if generation fails.
 */
export type ImageGenerationProvider = (prompt: string) => Promise<string>;
>>>>>>> a24e8e8b4d99cfd9ac6c73aead3b30e8b87836b0
