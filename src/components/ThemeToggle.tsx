// components/ThemeToggle.tsx
import React from "react";
import { Button } from "./ui/button";
import type { ThemeToggleProps } from "@/types";

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
} as const;

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDarkMode,
  toggleTheme,
  size = "md",
  className = "",
}) => {
  const iconSize = sizeMap[size];

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      className={`transition-colors ${className}`}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
    >
      {isDarkMode ? (
        <img src="/sun.svg" alt="sun" className={iconSize} />
      ) : (
        <img src="/Moon.svg" alt="Moon" className={iconSize} />
      )}
    </Button>
  );
};
