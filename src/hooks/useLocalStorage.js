import { useState, useEffect } from "react";

/**
 * Custom hook: persists state to the browser's localStorage as JSON.
 * Demonstrates:
 *   - browser storage (localStorage)
 *   - JSON.stringify / JSON.parse
 *   - useState + useEffect working together
 *   - writing a reusable custom hook
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage: could not read "${key}"`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`useLocalStorage: could not write "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
