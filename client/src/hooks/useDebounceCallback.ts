import { useCallback, useRef } from "react";

export function useDebouncedCallback<T extends unknown[]>(
    delay: number,
    callback: (...args: T) => void
): (...args: T) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback((...args: T) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
}