import React from 'react';

interface AegisMonogramProps {
  className?: string;
  size?: number;
  color?: string; // default to currentColor or deep charcoal
  accentColor?: string;
}

export const AegisMonogram: React.FC<AegisMonogramProps> = ({
  className = 'w-6 h-6',
  size = 24,
  color = 'currentColor',
  accentColor = '#526442'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AEGIS Architectural Shield Monogram"
    >
      {/* Outer Protective Shield Perimeter */}
      <path
        d="M24 4L40 10.5V23.5C40 33.2 33.2 41.6 24 44C14.8 41.6 8 33.2 8 23.5V10.5L24 4Z"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Internal Architectural Chevron & "A" Glyph */}
      <path
        d="M24 11L33.5 32H28.5L24 21.5L19.5 32H14.5L24 11Z"
        fill={color}
      />

      {/* Clinical Cross-Beam with Center Molecular Diamond */}
      <path
        d="M18 26.5H30"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Apex Luminescence Diamond */}
      <polygon
        points="24,14 26,17.5 24,21 22,17.5"
        fill={accentColor}
      />

      {/* Base Foundation Pillar */}
      <circle
        cx="24"
        cy="37"
        r="1.75"
        fill={accentColor}
      />
    </svg>
  );
};

