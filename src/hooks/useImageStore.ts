import { useState, useEffect } from 'react';

// Module-level in-memory cache ensuring instant synchronization across lifecycles
const memoryImageStore = new Map<string, string>();

export const resolveImageUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  
  // Ensure single clean leading slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath;
};

export const getStoredImage = (id: string, fallback: string): string => {
  if (!id) return resolveImageUrl(fallback);

  if (memoryImageStore.has(id)) {
    return memoryImageStore.get(id)!;
  }

  // Normalization keys to check for uploaded custom images
  const cleanId = id.toLowerCase().trim();
  const strippedId = cleanId.replace(/^aegis-/, '');

  const possibleKeys = [
    `custom_image_${id}`,
    `custom_image_${cleanId}`,
    `custom_image_${strippedId}`,
    `custom_image_aegis-${strippedId}`,
    `custom_image_${cleanId.replace(/-/g, '_')}`,
    `custom_image_${strippedId.replace(/-/g, '_')}`,
    id,
    cleanId,
    strippedId,
    ...(cleanId.includes('starter') || cleanId.includes('bundle')
      ? [
          'custom_image_starter',
          'custom_image_starter_bundle',
          'custom_image_starter-bundle',
          'custom_image_aegis_starter_bundle',
          'custom_image_aegis-starter-bundle'
        ]
      : []),
    ...(cleanId.includes('after')
      ? ['custom_image_after', 'custom_image_aegis_after', 'custom_image_aegis-after']
      : []),
    ...(cleanId.includes('wash')
      ? ['custom_image_wash', 'custom_image_aegis_wash', 'custom_image_aegis-wash']
      : []),
    ...(cleanId.includes('hydra')
      ? ['custom_image_hydra', 'custom_image_aegis_hydra', 'custom_image_aegis-hydra']
      : []),
    ...(cleanId.includes('shield')
      ? ['custom_image_shield', 'custom_image_aegis_shield', 'custom_image_aegis-shield']
      : [])
  ];

  try {
    if (typeof sessionStorage !== 'undefined') {
      for (const key of possibleKeys) {
        const sessionVal = sessionStorage.getItem(key);
        if (sessionVal && sessionVal.trim().length > 0) {
          memoryImageStore.set(id, sessionVal);
          return sessionVal;
        }
      }
    }
  } catch {}

  try {
    if (typeof localStorage !== 'undefined') {
      for (const key of possibleKeys) {
        const localVal = localStorage.getItem(key);
        if (localVal && localVal.trim().length > 0) {
          memoryImageStore.set(id, localVal);
          return localVal;
        }
      }
    }
  } catch {}

  // Default image resolution
  if (fallback) {
    return resolveImageUrl(fallback);
  }
  return `/${id}.jpg`;
};

export const clearCustomImage = (id: string, defaultImage: string) => {
  memoryImageStore.delete(id);
  try {
    sessionStorage.removeItem(`custom_image_${id}`);
  } catch {}
  try {
    localStorage.removeItem(`custom_image_${id}`);
  } catch {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('custom_image_update', {
        detail: { id, dataUrl: resolveImageUrl(defaultImage) }
      })
    );
  }
};

export const useImageStore = (id: string, defaultImage: string) => {
  const resolvedDefault = resolveImageUrl(defaultImage || `/${id}.jpg`);
  const [image, setImage] = useState(() => getStoredImage(id, resolvedDefault));

  // Keep in sync if id or defaultImage changes
  useEffect(() => {
    setImage(getStoredImage(id, resolvedDefault));
  }, [id, resolvedDefault]);

  const setCustomImage = (dataUrl: string) => {
    if (!dataUrl) return;
    memoryImageStore.set(id, dataUrl);
    try {
      sessionStorage.setItem(`custom_image_${id}`, dataUrl);
    } catch {}
    try {
      localStorage.setItem(`custom_image_${id}`, dataUrl);
    } catch (e) {
      console.warn("Storage quota limit reached for localStorage. Using in-memory & session storage.", e);
    }
    setImage(dataUrl);

    // Sync to server so it becomes available across browsers
    try {
      fetch('/api/sync-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: [{ id, dataUrl }] })
      }).catch((err) => console.warn('Background image sync error:', err));
    } catch {}

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('custom_image_update', { detail: { id, dataUrl } })
      );
    }
  };

  useEffect(() => {
    const handleUpdate = (e: any) => {
      if (e.detail?.id === id) {
        setImage(e.detail.dataUrl || resolvedDefault);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('custom_image_update', handleUpdate);
      return () => window.removeEventListener('custom_image_update', handleUpdate);
    }
  }, [id, resolvedDefault]);

  return { image, setCustomImage };
};
