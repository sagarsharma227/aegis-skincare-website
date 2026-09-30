/**
 * AEGIS MEN Skincare - Centralized Color Palette & Design Tokens
 * Single source of truth for all color references across the application.
 */

export const AEGIS_PALETTE = {
  // Primary Brand Colors
  olive: {
    DEFAULT: '#526442',      // Deep Botanical Olive (Primary CTA & Accents)
    hover: '#3E453D',        // Dark Olive Hover
    muted: '#8C9B86',        // Botanical Sage Accent
    subtle: 'rgba(82, 100, 66, 0.12)',
  },
  cream: {
    DEFAULT: '#F2EFE9',      // Warm Mineral Canvas (Main App Background)
    canvas: '#F2EFE9',       // Limestone/Mineral Canvas
    surface: '#FAF9F7',      // Warm Ivory Card Surface
    border: '#E2DDD5',       // Soft Stone Border
    container: '#EAE5DD',    // Image Placeholder / Shimmer Base
  },
  charcoal: {
    DEFAULT: '#1A1C1B',      // Deep Charcoal / Contrast Black
    surface: '#222523',      // Dark Card Surface
    border: '#3E453D',       // Dark Border Contrast
    muted: '#5E645F',        // Muted Charcoal Body Text
    deep: '#151714',         // Pure Dark Charcoal
  },
  accent: {
    clay: '#9A806C',         // Muted Terracotta Clay
    sage: '#8C9B86',         // Light Botanical Sage
    success: '#526442',      // Clinical Green
    gold: '#A87B32',         // Subtle Gold Accent
  }
} as const;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        olive: AEGIS_PALETTE.olive.DEFAULT,
        'olive-hover': AEGIS_PALETTE.olive.hover,
        'olive-muted': AEGIS_PALETTE.olive.muted,
        
        cream: AEGIS_PALETTE.cream.DEFAULT,
        'cream-canvas': AEGIS_PALETTE.cream.canvas,
        'cream-surface': AEGIS_PALETTE.cream.surface,
        'cream-border': AEGIS_PALETTE.cream.border,
        'cream-container': AEGIS_PALETTE.cream.container,
        
        charcoal: AEGIS_PALETTE.charcoal.DEFAULT,
        'charcoal-surface': AEGIS_PALETTE.charcoal.surface,
        'charcoal-border': AEGIS_PALETTE.charcoal.border,
        'charcoal-muted': AEGIS_PALETTE.charcoal.muted,
        
        clay: AEGIS_PALETTE.accent.clay,
        sage: AEGIS_PALETTE.accent.sage,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
