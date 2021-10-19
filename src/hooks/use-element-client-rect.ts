import type { RefObject } from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';

export type ElementClientRect = Omit<DOMRectReadOnly, 'toJSON'>;

export const useElementClientRect = (elementRef: RefObject<HTMLElement>): ElementClientRect => {
  const animationFrameId = useRef<number>(0);
  const [elementHeight, setElementHeight] = useState<ElementClientRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const updateClientRect = useCallback(() => {
    if (!elementRef.current) {
      return;
    }

    const { width, top, right, height, bottom, left, x, y } = elementRef.current.getBoundingClientRect();

    setElementHeight({
      bottom,
      height,
      left,
      right,
      top,
      width,
      x,
      y,
    });
  }, [elementRef]);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const elementResizeObserver = new ResizeObserver(() => {
      animationFrameId.current = window.requestAnimationFrame(updateClientRect);
    });

    elementResizeObserver.observe(element);

    return () => {
      if (element !== null) {
        elementResizeObserver.unobserve(element);
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [elementRef, updateClientRect]);

  return elementHeight;
};
