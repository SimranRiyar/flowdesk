"use client";

import { useTheme } from "./ThemeProvider";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="text-sm px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}