// pages/Home.tsx
import React from "react";

import { DesktopSidebar } from "../components/SideBar";
import { useInvoiceFilter, useResponsive, useTheme } from "@/hooks";
import { MobileHeader } from "../components/MobileHeader";
import { MainContent } from "../components/MainContent";
import { THEME_CLASSES } from "@/constants";

const Home: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const isMobile = useResponsive();
  const isDesktop = isMobile.isDesktop;
  const { filter, setFilter, filteredInvoices } = useInvoiceFilter();

  const themeClasses = isDarkMode ? THEME_CLASSES.dark : THEME_CLASSES.light;

  return (
    <div
      className={`min-h-screen  transition-colors duration-300 ${themeClasses}`}
    >
      {isDesktop && (
        <DesktopSidebar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          isDesktop={isDesktop}
        />
      )}

      <MobileHeader
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMobile={isMobile.isMobile}
        isTablet={isMobile.isTablet}
      />

      <MainContent
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMobile={isMobile.isMobile}
        filter={filter}
        setFilter={(filter) => setFilter(filter as any)}
        filteredInvoices={filteredInvoices}
      />
    </div>
  );
};

export default Home;
