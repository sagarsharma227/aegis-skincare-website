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
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
  }, [src]);

  // Synchronously verify if image is already cached/complete on mount or src change
  const handleRef = (el: HTMLImageElement | null) => {
    imgRef.current = el;
    if (el && el.complete && el.naturalWidth > 0) {
      setIsLoaded(true);
    }
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setIsLoaded(true);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-[#EAE5DD] ${containerClassName}`}
    >
      {/* Warm Mineral Shimmer Skeleton Screen */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-500 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        } bg-[#EAE5DD] flex items-center justify-center`}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FAF9F7]/50 to-transparent pointer-events-none"
          style={{
            animation: 'aegisShimmer 1.8s infinite linear',
            transform: 'translateX(-100%)'
          }}
        />
      </div>

      {/* High-Fidelity Image with Fast Smooth Transition */}
      <img
        ref={handleRef}
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : loading}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-300 ease-out ${
          isLoaded
            ? 'opacity-100 blur-0 scale-100'
            : 'opacity-0 blur-xs scale-[1.01]'
        } ${className}`}
      />

      {children}
    </div>
  );
};
