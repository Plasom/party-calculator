import { useRef } from 'react';
import { LONG_PRESS_DURATION } from '@/config/constants';

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
    onMouseMove: cancelLongPress, // Cancel on mouse drag
    
    // Touch events (for mobile/iOS support)
    onTouchStart: startLongPress,
    onTouchEnd: endLongPress,
    onTouchCancel: cancelLongPress,
    onTouchMove: cancelLongPress, // Cancel on touch drag
  };
}
