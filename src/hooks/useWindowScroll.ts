import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

/**
 * Custom hook to track the height of an element using ResizeObserver
 * @param threshold - Scroll threshold in pixels to determine direction change
 * @returns The current scroll direction ('up', 'down', or null)
 */
export function useWindowScroll(threshold = 0): ScrollDirection {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>(null);
  let lastScrollY = 0;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (Math.abs(diff) < threshold) {
        return;
      }

      if (diff > 0) {
        setScrollDir('down');
      } else if (diff < 0) {
        setScrollDir('up');
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollDir;
}