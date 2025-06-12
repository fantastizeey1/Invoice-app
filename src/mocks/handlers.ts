// src/mocks/handlers.ts
import type { InvoicesData } from "@/types";
import { http } from "msw";

const mockInvoices: InvoicesData[] = [
  {
    id: "INV-001",
    service: "Website Redesign",
    status: "pending",
    invoiceDate: "2025-06-10",
    dueDate: "2025-07-10",
    clientName: "Alice Johnson",
    billTo: {
      name: "Alice Johnson",
      address: "123 Maple Street",
      city: "New York",
      postcode: "10001",
      country: "USA",
    },
    sentTo: "alice@example.com",
    businessAddress: {
      street: "456 Agency Blvd",
      city: "San Francisco",
      postcode: "94101",
      country: "USA",
    },
    items: [
      {
        id: "ITEM-001",
        name: "Landing Page",
        quantity: 1,
        price: 500,
        total: 500,
      },
      {
        id: "ITEM-002",
        name: "SEO Optimization",
        quantity: 1,
        price: 300,
        total: 300,
      },
    ],

    amount: 800,
  },
];

export const handlers = [
  http.get("/api/invoices", (req) => {
    return new Response(JSON.stringify(mockInvoices), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
];
