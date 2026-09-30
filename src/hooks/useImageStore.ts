import { useState, useEffect } from 'react';

export const resolveProductImage = (id: string, defaultImage?: string): string => {
  if (id) {
    return `/${id}.jpg`;
  }
  return defaultImage || '/aegis-wash.jpg';
};

export const useImageStore = (id: string, defaultImage: string) => {
  const [image, setImage] = useState(() => resolveProductImage(id, defaultImage));

  useEffect(() => {
    setImage(resolveProductImage(id, defaultImage));
  }, [id, defaultImage]);

  const setCustomImage = (_dataUrl: string) => {
    console.log("Custom images disabled. Using permanent asset system.");
  };

  return { image, setCustomImage };
};
