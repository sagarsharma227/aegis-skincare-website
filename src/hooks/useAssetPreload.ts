import { useEffect } from 'react';
import { PRODUCTS } from '../data/products';

/**
 * Preloads an image into browser cache using new Image()
 */
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!src) {
      resolve();
      return;
    }
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
};

/**
 * Hook to preload key product images and hero background assets immediately when the site loads,
 * ensuring high speed and a seamless, flicker-free experience when navigating shop and views.
 */
export const useAssetPreload = () => {
  useEffect(() => {
    // 1. Immediately preload all root product images
    PRODUCTS.forEach((product) => {
      // Preload the canonical root image
      preloadImage(`/${product.id}.jpg`);
      if (product.image && product.image !== `/${product.id}.jpg`) {
        preloadImage(product.image);
      }
    });

    // 2. Preload editorial journal art in background
    const journalArt = [
      '/art-male-dermal-biology.jpg',
      '/art-circadian-dermatology-nocturnal-repair.jpg',
      '/art-follicular-dysbiosis-sebum.jpg',
      '/art-minimalist-dermatology-protocols.jpg',
      '/art-photobiology-cellular-senescence.jpg',
      '/art-skin-barrier-tewl.jpg',
    ];

    journalArt.forEach((src) => {
      preloadImage(src);
    });
  }, []);
};
