import type { FilterType, Invoice } from "@/types";

// utils/storage.ts
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage:`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage:`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing from localStorage:`, error);
    }
  },
};

// invoice

export const filterInvoices = (
  invoices: Invoice[],
  filter: FilterType
): Invoice[] => {
  return invoices.filter(
    (invoice) => filter === "all" || invoice.status === filter
  );
};

export const getInvoiceStats = (invoices: Invoice[]) => ({
  total: invoices.length,
  paid: invoices.filter((inv) => inv.status === "paid").length,
  pending: invoices.filter((inv) => inv.status === "pending").length,
  draft: invoices.filter((inv) => inv.status === "draft").length,
});

export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

// classNames
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
