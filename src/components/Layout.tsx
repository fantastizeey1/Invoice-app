import { THEME_CLASSES } from "@/constants";
import { useResponsive, useTheme } from "@/hooks";
import { DesktopSidebar } from "./SideBar";
import { MobileHeader } from "./MobileHeader";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const themeClasses = isDarkMode ? THEME_CLASSES.dark : THEME_CLASSES.light;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses}`}
    >
      <div className="flex">
        {isDesktop && (
          <DesktopSidebar
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            isDesktop={isDesktop}
          />
        )}

        <div className="flex-1 flex flex-col">
          {(isMobile || isTablet) && (
            <MobileHeader
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          )}

          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
