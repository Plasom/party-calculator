import { useEffect, useState, RefObject, DependencyList } from 'react';

/**
 * Custom hook to track the height of an element using ResizeObserver
 * @param ref - React ref object pointing to the element to track
 * @param dependencies - Optional dependencies array to re-observe when changed
 * @returns The current height of the element
 */
export function useElementHeight<T extends HTMLElement>(
    ref: RefObject<T | null>,
    dependencies: DependencyList = []
): number {
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            setHeight(0);
            return;
        }

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const newHeight = entry.target.getBoundingClientRect().height;
                setHeight(newHeight);
            }
        });

        resizeObserver.observe(element);

        // Set initial height
        const initialHeight = element.getBoundingClientRect().height;
        setHeight(initialHeight);

        return () => {
            resizeObserver.disconnect();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, ...dependencies]);

    return height;
}
