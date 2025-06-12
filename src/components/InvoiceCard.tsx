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
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer group">
      {isDesktop ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-slate-300 font-medium">#{invoice.id}</div>
            <div className="text-slate-400 text-sm">{dueDateText}</div>
            <div className="text-slate-300">{invoice.clientName}</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white font-semibold text-lg">
              {formattedAmount}
            </div>
            <StatusBadge status={invoice.status} />
            <ChevronDown className="w-4 h-4 text-slate-400 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="text-slate-300 font-medium">#{invoice.id}</div>
            <div className="text-slate-300">{invoice.clientName}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-slate-400 text-sm mb-1">{dueDateText}</div>
              <div className="text-white font-semibold text-lg">
                {formattedAmount}
              </div>
            </div>
            <StatusBadge status={invoice.status} />
          </div>
        </>
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
  filter,
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
