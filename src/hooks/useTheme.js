import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Custom hook: reads/writes the theme name ("light" | "dark"), persists it
 * with useLocalStorage, and syncs it onto <html data-theme="..."> so CSS
 * variables in index.css can react to it instantly.
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage("meditrack:theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return { theme, toggleTheme };
}
