// Mobile-specific constants optimized for OPPO Reno 14
// Screen: 6.59" AMOLED (~1256 x 2760 pixels, ~19.5:9 aspect ratio)

export const MOBILE_CONSTANTS = {
    // Device Specifications
    SCREEN_WIDTH: 1256,           // px
    SCREEN_HEIGHT: 2760,          // px
    ASPECT_RATIO: 19.5 / 9,       // Ultra-tall
    PIXEL_DENSITY: 460,           // ppi

    // Touch Targets (Minimum 44px iOS guideline, 48px Android)
    MIN_TOUCH_TARGET: 48,         // px
    BUTTON_HEIGHT: 56,            // px (comfortable tap area)
    NAVIGATION_BAR_HEIGHT: 80,    // px (bottom nav bar)
    HEADER_HEIGHT: 64,            // px (top header)

    // Spacing System (Mobile-first)
    SPACING_XS: 4,                // px
    SPACING_SM: 8,                // px
    SPACING_MD: 16,               // px
    SPACING_LG: 24,               // px
    SPACING_XL: 32,               // px
    SPACING_XXL: 48,              // px

    // Typography Scale (Mobile optimized)
    FONT_SIZE_XS: 12,             // px
    FONT_SIZE_SM: 14,             // px
    FONT_SIZE_BASE: 16,           // px
    FONT_SIZE_LG: 18,             // px
    FONT_SIZE_XL: 24,             // px
    FONT_SIZE_XXL: 32,            // px
    FONT_SIZE_XXXL: 40,           // px

    // Breakpoints (Mobile-first approach)
    BREAKPOINT_MOBILE: 480,       // px (small phones)
    BREAKPOINT_TABLET: 768,       // px (tablets)
    BREAKPOINT_DESKTOP: 1024,     // px (desktops)

    // Animation Timing (Smooth for 120Hz display)
    ANIMATION_FAST: 150,          // ms
    ANIMATION_NORMAL: 300,        // ms
    ANIMATION_SLOW: 500,          // ms

    // Card Sizes
    PLAYER_CARD_MIN_HEIGHT: 120,  // px
    PLAYER_CARD_MAX_WIDTH: 400,   // px

    // Safe Areas (for notch/camera cutout)
    SAFE_AREA_TOP: 44,            // px (iOS style)
    SAFE_AREA_BOTTOM: 34,         // px (iOS style)

    // OPPO Reno 14 Specific Optimizations
    RENO14_SCREEN_WIDTH: 1256,    // px
    RENO14_SCREEN_HEIGHT: 2760,   // px
    RENO14_ASPECT_RATIO: 2.2,     // height/width
};

// Utility functions for mobile calculations
export const calculateResponsiveHeight = (percentage: number): number => {
    return Math.round(MOBILE_CONSTANTS.SCREEN_HEIGHT * (percentage / 100));
};

export const calculateResponsiveWidth = (percentage: number): number => {
    return Math.round(MOBILE_CONSTANTS.SCREEN_WIDTH * (percentage / 100));
};

// Tailwind-like spacing utility
export const spacing = {
    xs: `${MOBILE_CONSTANTS.SPACING_XS}px`,
    sm: `${MOBILE_CONSTANTS.SPACING_SM}px`,
    md: `${MOBILE_CONSTANTS.SPACING_MD}px`,
    lg: `${MOBILE_CONSTANTS.SPACING_LG}px`,
    xl: `${MOBILE_CONSTANTS.SPACING_XL}px`,
    xxl: `${MOBILE_CONSTANTS.SPACING_XXL}px`,
};

// Font size utility
export const fontSize = {
    xs: `${MOBILE_CONSTANTS.FONT_SIZE_XS}px`,
    sm: `${MOBILE_CONSTANTS.FONT_SIZE_SM}px`,
    base: `${MOBILE_CONSTANTS.FONT_SIZE_BASE}px`,
    lg: `${MOBILE_CONSTANTS.FONT_SIZE_LG}px`,
    xl: `${MOBILE_CONSTANTS.FONT_SIZE_XL}px`,
    xxl: `${MOBILE_CONSTANTS.FONT_SIZE_XXL}px`,
    xxxl: `${MOBILE_CONSTANTS.FONT_SIZE_XXXL}px`,
};

// Touch target validation
export const isValidTouchTarget = (size: number): boolean => {
    return size >= MOBILE_CONSTANTS.MIN_TOUCH_TARGET;
};

// Mobile-first responsive classes
export const MOBILE_CLASSES = {
    container: 'w-full max-w-md mx-auto px-4',
    card: 'rounded-2xl p-6 shadow-lg',
    button: `h-${MOBILE_CONSTANTS.BUTTON_HEIGHT / 4} min-h-[${MOBILE_CONSTANTS.BUTTON_HEIGHT}px] px-6 rounded-xl`,
    input: 'h-14 px-4 text-base rounded-xl',
    header: `h-${MOBILE_CONSTANTS.HEADER_HEIGHT / 4} pt-safe`,
    footer: `h-${MOBILE_CONSTANTS.NAVIGATION_BAR_HEIGHT / 4} pb-safe`,
};