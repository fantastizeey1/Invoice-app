import type { DesktopSidebarProps } from "@/types";

import { ThemeToggle } from "./ThemeToggle";

const Sidebar: React.FC<Omit<DesktopSidebarProps, "isDesktop">> = ({
  isDarkMode,
  toggleTheme,
}) => {
  return (
    <div className="flex flex-col h-full justify-between items-center rounded-tr-3xl  bg-[#1E2139]">
      {/* Logo */}
      <div>
        <img src="/Logo.svg" alt="Company Logo" className="w-16 h-16" />
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col items-center space-y-6 min-w-full">
        <ThemeToggle
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          size="md"
          className="bg-transparent text-slate-400 "
        />
        <div className=" bg-[#494E6E] h-[1px] w-full" />
        <UserAvatar />
      </div>
    </div>
  );
};

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  isDarkMode,
  toggleTheme,
  isDesktop,
}) => {
  if (!isDesktop) return null;

  return (
    <aside className="fixed left-0 top-0 h-full z-10">
      <Sidebar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </aside>
  );
};

const UserAvatar: React.FC = () => (
  <div className="w-8 h-8 bg-slate-600 mb-6 rounded-full flex items-center justify-center">
    <img src="/avatar.svg" alt="avatar" />
  </div>
);
