// theme
export const THEME_CLASSES = {
  dark: "bg-[#0C0E16] text-white",
  light: "bg-white text-[#0C0E16]",
} as const;

// breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

// storage
export const STORAGE_KEYS = {
  theme: "theme",
  userPreferences: "userPreferences",
} as const;

// invoice
export const INVOICE_STATUS = {
  paid: "paid",
  pending: "pending",
  draft: "draft",
} as const;

export const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "draft", label: "Draft" },
] as const;
