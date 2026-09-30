import React, { useState, useEffect, useRef } from 'react';

interface AegisImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

export const AegisImage: React.FC<AegisImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackSrc,
  loading = 'lazy',
  priority = false,
  onClick,
  children
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-[#EAE5DD] ${containerClassName}`}
    >
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : loading}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={handleError}
        className={`w-full h-full object-cover block ${className}`}
      />

      {children}
    </div>
  );
};
