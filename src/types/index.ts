import { z } from "zod";

export interface Invoice {
  id: string;
  dueDate: string;
  clientName: string;
  amount: number;
  status: "paid" | "pending" | "draft" | string; // Allowing string for flexibility
}

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export type FilterStatus = "all" | "paid" | "pending" | "draft";
export type ViewMode = "list" | "detail" | "create" | "edit";

// Zod Schemas
export const invoiceItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Item name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
  total: z.number(),
});

export const invoiceSchema = z.object({
  id: z.string(),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Valid email is required"),
  clientAddress: z.string().min(1, "Client address is required"),
  clientPhone: z.string().optional(),
  description: z.string().min(1, "Invoice description is required"),
  paymentTerms: z.number().min(1, "Payment terms must be at least 1 day"),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
  dueDate: z.string(),
  amount: z.number(),
  status: z.enum(["paid", "pending", "draft"]),
  createdAt: z.string(),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;

// export interface Invoice {
//   id: string;
//   clientName: string;
//   amount: number;
//   status: "paid" | "pending" | "draft" | string; // Allowing string for flexibility
//   dueDate: string;
//   description: string;
//   createdAt: string;
// }

export type FilterType = "all" | "paid" | "pending" | "draft";

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface ResponsiveContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Component Props Types
export interface BaseComponentProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface MobileHeaderProps extends BaseComponentProps {
  isMobile: boolean;
  isTablet: boolean;
}

export interface DesktopSidebarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isDesktop: boolean;
}

export interface MainContentProps extends BaseComponentProps {
  isDarkMode: boolean;
  isMobile: boolean;
  filter: FilterType | "";
  setFilter: (filter: FilterType | "") => void;
  filteredInvoices: Invoice[];
}

export interface InvoiceListProps {
  invoices: Invoice[];
  isMobile: boolean;
  filter: FilterType;
}

export interface EmptyStateProps {
  filter: FilterType;
}

export interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface HeaderProps {
  isDarkMode: boolean;
  totalInvoices: number;
  selectedFilter: FilterType | "";
  onFilterChange: (filter: FilterType | "") => void;
}

export interface FilterDropdownProps {
  selected: FilterType | "";
  onSelect: (filter: FilterType | "") => void;
}

export interface InvoicesData {
  id: string;
  service: string;
  status: "pending" | "paid" | "draft";
  invoiceDate: string;
  dueDate: string;
  billTo: {
    name: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
  };
  clientName: string;
  sentTo: string;
  businessAddress: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  items: InvoiceItem[];
  amount: number;
}

export interface LayoutProps {
  children: React.ReactNode;
}