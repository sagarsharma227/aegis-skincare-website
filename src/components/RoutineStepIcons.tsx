import React from 'react';

interface StepIconProps {
  className?: string;
  size?: number;
  color?: string;
}

// 01. CLEANSE: Minimalist amino-acid water droplet with pH 5.5 ripple arc
export const CleanseIcon: React.FC<StepIconProps> = ({
  className = '',
  size = 18,
  color = '#526442'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Droplet outline */}
    <path
      d="M12 2.5C12 2.5 6.5 9.5 6.5 14.5C6.5 17.5376 8.96243 20 12 20C15.0376 20 17.5 17.5376 17.5 14.5C17.5 9.5 12 2.5 12 2.5Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Inner fluid curve */}
    <path
      d="M9.5 14C9.5 15.6569 10.6193 17 12 17"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeDasharray="1 2"
    />
    {/* Base cleansing meniscus line */}
    <path
      d="M4 22H20"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

// 02. CORRECT: Precision clinical pipette / active serum molecule
export const CorrectIcon: React.FC<StepIconProps> = ({
  className = '',
  size = 18,
  color = '#526442'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Pipette body */}
    <path
      d="M15.5 3.5L20.5 8.5M14 5L19 10L11 18L6 18L6 13L14 5Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Calibration micro ticks */}
    <path
      d="M10.5 8.5L12.5 10.5M8.5 10.5L10.5 12.5"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    {/* Precision micro-droplet */}
    <circle cx="4" cy="20" r="1.5" fill={color} />
  </svg>
);

// 03. DEFEND: Minimalist geometric photoprotection shield with solar vector
export const DefendIcon: React.FC<StepIconProps> = ({
  className = '',
  size = 18,
  color = '#526442'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Protective shield silhouette */}
    <path
      d="M12 3L4.5 6V11.5C4.5 16.5 7.7 20.8 12 22C16.3 20.8 19.5 16.5 19.5 11.5V6L12 3Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Solar ray focal arc */}
    <circle cx="12" cy="11.5" r="3" stroke={color} strokeWidth="1.4" strokeDasharray="2 2" />
    <path d="M12 7V8.5M12 14.5V16M7.5 11.5H9M15 11.5H16.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// 04. PURIFY: Dual-ring particulate dissolution & deep pore clarifier
export const PurifyIcon: React.FC<StepIconProps> = ({
  className = '',
  size = 18,
  color = '#526442'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Outer vortex ring */}
    <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
    {/* Inner clarifying diamond vortex */}
    <path
      d="M12 6L14.5 12L12 18L9.5 12L12 6Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="1.5" fill={color} />
  </svg>
);

// 05. REPAIR: Biomimetic 3:1:1 lipid bilayer & lamellar matrix
export const RepairIcon: React.FC<StepIconProps> = ({
  className = '',
  size = 18,
  color = '#526442'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    {/* Top lipid layer */}
    <path
      d="M4 6C8 7.5 16 4.5 20 6"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Mid lipid bridging layer */}
    <path
      d="M4 12C8 13.5 16 10.5 20 12"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Deep lamellar anchor layer */}
    <path
      d="M4 18C8 19.5 16 16.5 20 18"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    {/* Intercellular hydrophobic lipid ties */}
    <path d="M8 7V11M16 5V11M10 13V17M14 13V17" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
