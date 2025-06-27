import React from "react";
import { useInvoiceFilter, useResponsive, useTheme } from "@/hooks";
import { MainContent } from "../components/MainContent";

const Home: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isMobile } = useResponsive();
  const { filter, setFilter, filteredInvoices } = useInvoiceFilter();

  return (
    <MainContent
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
      isMobile={isMobile}
      filter={filter}
      setFilter={(filter) => setFilter(filter as any)}
      filteredInvoices={filteredInvoices}
    />
  );
};

export default Home;
