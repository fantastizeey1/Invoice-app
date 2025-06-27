// components/MobileHeader.tsx
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import type { MobileHeaderProps } from "@/types";

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  isDarkMode,
  toggleTheme,
  isMobile,
  isTablet,
}) => {
  if (!(isMobile || isTablet)) return null;

  return (
    <header className="flex items-center justify-between bg-[#1E2139] ">
      <img src="/Logo.svg" alt="Company Logo" className="w-16 h-16" />

      <div className="flex items-center space-x-6">
        <ThemeToggle
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          size="md"
          className="bg-transparent text-slate-400 "
        />
        <div className="w-[1px] bg-[#494E6E] h-full min-h-[65px] flex"></div>

        <UserAvatar />
      </div>
    </header>
  );
};

const UserAvatar: React.FC = () => (
  <div className="w-8 h-8 bg-slate-600 mr-6 rounded-full flex items-center justify-center">
    <img src="/avatar.svg" alt="avatar" />
  </div>
);
