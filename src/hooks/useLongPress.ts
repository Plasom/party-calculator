import { useRef } from 'react';
import { LONG_PRESS_DURATION } from '@/config/constants';

/**
 * Custom hook to track the height of an element using ResizeObserver
 * @param onLongPress - Callback function to be called on long press
 * @param duration - Duration in milliseconds for the long press
 * @param disabled - Flag to disable the long press functionality
 * @returns Event handlers for mouse and touch events
 */
interface UseLongPressOptions {
  onLongPress?: () => void;
  duration?: number;
  disabled?: boolean;
}

export function useLongPress({ 
  onLongPress, 
  duration = LONG_PRESS_DURATION, 
  disabled = false 
}: UseLongPressOptions) {
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const startLongPress = () => {
    if (onLongPress && !disabled) {
      longPressTimer.current = setTimeout(() => {
        onLongPress();
      }, duration);
    }
  };

  const endLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  // Return event handlers for both mouse and touch events
  return {
    // Mouse events
    onMouseDown: startLongPress,
    onMouseUp: endLongPress,
    onMouseLeave: cancelLongPress,
    
    // Touch events (for mobile/iOS support)
    onTouchStart: startLongPress,
    onTouchEnd: endLongPress,
    onTouchCancel: cancelLongPress,
    onTouchMove: cancelLongPress, // Cancel on touch drag
  };
}
