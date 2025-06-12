// hooks/useTheme.ts
import { invoicesData } from "@/data";
import type { FilterType, Invoice } from "@/types";
import { useState, useEffect, useMemo } from "react";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return { isDarkMode, toggleTheme };
};

// useResponsive

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
} as const;

export const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: windowWidth < BREAKPOINTS.mobile,
    isTablet:
      windowWidth >= BREAKPOINTS.mobile && windowWidth < BREAKPOINTS.tablet,
    isDesktop: windowWidth >= BREAKPOINTS.tablet,
    windowWidth,
  };
};

// useInvoiceFilter

export const useInvoiceFilter = () => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredInvoices = useMemo<Invoice[]>(() => {
    return invoicesData.filter(
      (invoice) => filter === "all" || invoice.status === filter
    );
  }, [filter]);

  const invoiceStats = useMemo(
    () => ({
      total: invoicesData.length,
      paid: invoicesData.filter((inv) => inv.status === "paid").length,
      pending: invoicesData.filter((inv) => inv.status === "pending").length,
      draft: invoicesData.filter((inv) => inv.status === "draft").length,
    }),
    []
  );

  return {
    filter,
    setFilter,
    filteredInvoices,
    invoiceStats,
  };
};
