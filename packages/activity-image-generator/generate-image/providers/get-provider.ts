<<<<<<< HEAD
import { ImageGenerationProvider } from './types';
=======
import { ImageGenerationProvider } from '../types';
>>>>>>> a24e8e8b4d99cfd9ac6c73aead3b30e8b87836b0
import { ImageGenerationProviderName } from '../../types';
import pollinations from './pollinations';

/**
 * Gets the configured image generation provider.
<<<<<<< HEAD
 * Defaults to `Pollinations` if not set.
 * 
 * @returns {ImageProvider} Image generation provider instance.
 * @throws {Error} Throws if provider name is invalid.
 * 
 * @remarks
 * Supported providers:
 * - 'pollinations' (default): Free, unlimited, no authentication.
 * 
 * @example
 * ```typescript
 * const provider1 = getProvider(); // Uses default 'pollinations'.
=======
 * Reads IMAGE_PROVIDER environment variable or defaults to 'Pollinations'.
 *
 * Supported providers:
 * - 'pollinations' (default): Free, unlimited, no authentication.
 *
 * Priority:
 * 1. Explicit providerName parameter
 * 2. IMAGE_PROVIDER environment variable
 * 3. Default to 'pollinations'
 *
 * @param {ImageGenerationProviderName} [providerName] - Override provider name
 * @returns {ImageGenerationProvider} Image generation provider instance.
 * @throws {Error} Throws if provider name is invalid.
 *
 * @example
 * ```typescript
 * const provider1 = getProvider(); // Uses IMAGE_PROVIDER env or defaults to 'pollinations'
>>>>>>> a24e8e8b4d99cfd9ac6c73aead3b30e8b87836b0
 * const provider2 = getProvider('pollinations');
 * ```
 */
const getProvider = (
<<<<<<< HEAD
  providerName: ImageGenerationProviderName = 'pollinations',
): ImageGenerationProvider => {
  switch (providerName) {
=======
  providerName?: ImageGenerationProviderName,
): ImageGenerationProvider => {
  const name = providerName ?? (process.env.IMAGE_PROVIDER as ImageGenerationProviderName) ?? 'pollinations';

  switch (name) {
>>>>>>> a24e8e8b4d99cfd9ac6c73aead3b30e8b87836b0
    case 'pollinations': {
      return pollinations;
    }
    default: {
<<<<<<< HEAD
      throw new Error(`Unknown image generation provider: ${providerName}.`);
=======
      throw new Error(`Unknown image generation provider: ${String(name)}.`);
>>>>>>> a24e8e8b4d99cfd9ac6c73aead3b30e8b87836b0
    }
  }
};

export default getProvider;
