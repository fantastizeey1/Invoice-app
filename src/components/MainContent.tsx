// components/MainContent.tsx
import React, { useState } from "react";

import Header from "./Header";
import type { MainContentProps } from "@/types";
import { InvoiceList } from "./InvoiceCard";
import CreateInvoiceModal from "./CreateInvoiceModal";

export const MainContent: React.FC<MainContentProps> = ({
  isDarkMode,
  isMobile,
  filter,
  setFilter,
  filteredInvoices,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={isMobile ? "p-4 pt-8" : "pl-20 p-12"}>
      <div className="max-w-6xl mx-auto">
        <Header
          isDarkMode={isDarkMode}
          totalInvoices={filteredInvoices.length}
          selectedFilter={filter}
          onFilterChange={setFilter}
          onNewInvoice={() => setIsModalOpen(true)}
        />

        <InvoiceList
          invoices={filteredInvoices}
          isMobile={isMobile}
          filter={filter === "" ? "all" : filter}
        />

        <CreateInvoiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};
