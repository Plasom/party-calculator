// UI Constants
export const UI_CONSTANTS = {
  // Long press configuration
  LONG_PRESS_DURATION: 500, // milliseconds
  
  // Animation durations
  ANIMATION_DURATION: 300, // milliseconds
  
  // Bottom sheet transition
  BOTTOM_SHEET_TRANSITION_DURATION: 300, // milliseconds
  
  // Other UI constants can be added here
  // Example:
  // DEBOUNCE_DELAY: 500,
  // TOAST_DURATION: 3000,
} as const;

// Export individual constants for easier import
export const LONG_PRESS_DURATION = UI_CONSTANTS.LONG_PRESS_DURATION;
export const ANIMATION_DURATION = UI_CONSTANTS.ANIMATION_DURATION;
export const BOTTOM_SHEET_TRANSITION_DURATION = UI_CONSTANTS.BOTTOM_SHEET_TRANSITION_DURATION;
