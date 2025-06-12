// components/InvoiceList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import StatusBadge from "./StatusBadge";

import type { Invoice, InvoiceListProps } from "@/types";
import EmptyState from "./EmptyState";

interface InvoiceCardProps {
  invoice: Invoice;
  isDesktop: boolean;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, isDesktop }) => {
  const formattedAmount = `£ ${invoice.amount.toLocaleString()}`;
  const dueDateText = `Due ${invoice.dueDate}`;
  const href = `/invoices/${invoice.id}`;

  const CardContent = (
    <div className="bg-[#ffffff] dark:bg-[#1E2139]  rounded-xl p-6 hover:border-[1px] hover:border-[#7C5DFA] transition-all duration-300 cursor-pointer group">
      {isDesktop ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start w-3/5  lg:space-x-4">
            <div className="text-[#0C0E16] dark:text-white font-bold w-1/3">
              <span className=" text-[#7E88C3] lg:ml-3">#</span>
              {invoice.id}
            </div>
            <div className="text-[#7E88C3] dark:text-[#DFE3FA] font-medium text-sm w-1/3">
              {dueDateText}
            </div>
            <div className="text-[#858BB2] dark:text-white font-medium w-1/3">
              {invoice.clientName}
            </div>
          </div>
          <div className="flex  w-2/5 space-x-4  xl:space-x-10">
            <div className="dark:text-white text-[#0C0E16] flex  justify-end items-center  font-bold w-1/2 text-lg">
              {formattedAmount}
            </div>
            <div className="flex items-center justify-end lg:gap-5  w-1/2">
              <StatusBadge status={invoice.status} />
              <ChevronDown className="w-4 h-4 text-[#7C5DFA] rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="text-[#0C0E16] dark:text-white font-bold">
              <span className=" text-[#7E88C3]">#</span>
              {invoice.id}
            </div>
            <div className="text-[#858BB2] dark:text-white font-medium">
              {invoice.clientName}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[#7E88C3] dark:text-[#DFE3FA] text-sm mb-2">
                {dueDateText}
              </div>
              <div className="dark:text-white text-[#0C0E16] font-semibold text-lg">
                {formattedAmount}
              </div>
            </div>
            <StatusBadge status={invoice.status} />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Link to={href} className="block">
      {CardContent}
    </Link>
  );
};

export const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  isMobile,
}) => {
  if (invoices.length === 0) {
    return <EmptyState />;
  }

  return (
    <section
      className={`space-y-4 ${isMobile ? "" : "space-y-3"}`}
      aria-label="Invoice list"
    >
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} isDesktop={!isMobile} />
      ))}
    </section>
  );
};
