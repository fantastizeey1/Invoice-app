import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { invoicesData } from "@/data";
import { useResponsive } from "@/hooks";
import { Button } from "@/components/ui/button";
import CreateInvoiceModal from "@/components/CreateInvoiceModal";
import type { InvoiceData } from "@/types";
import { useMemo } from "react";

const InvoiceDetail: React.FC = () => {
  const { id } = useParams();
  const [invoices, setInvoices] = useState(invoicesData);
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const invoice = useMemo(() => {
    return invoices.find((inv) => inv.id === id);
  }, [invoices, id]);

  function calculateDueDate(date: Date | null, paymentTerms: string): string {
    if (!date) return "";
    const days = parseInt(paymentTerms.match(/\d+/)?.[0] || "30", 10); // e.g., "Net 30 Days" → 30
    const due = new Date(date);
    due.setDate(due.getDate() + days);
    return due.toISOString();
  }

  const handleInvoiceUpdate = (updated: InvoiceData) => {
    const transformed = {
      ...updated,
      invoiceDate: updated.invoiceDate?.toISOString() ?? "",
      dueDate: calculateDueDate(updated.invoiceDate, updated.paymentTerms), // you may already have this
      service: updated.projectDescription,
      billTo: {
        name: updated.client.name,
        address: updated.client.address.street,
        city: updated.client.address.city,
        postcode: updated.client.address.postCode,
        country: updated.client.address.country,
      },
      sentTo: updated.client.email,
      businessAddress: {
        street: updated.senderAddress.street,
        city: updated.senderAddress.city,
        postcode: updated.senderAddress.postCode,
        country: updated.senderAddress.country,
      },
      amount: updated.items.reduce((acc, item) => acc + item.total, 0),
    };

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === updated.id ? { ...inv, ...transformed } : inv
      )
    );

    setIsEditOpen(false);
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const mappedInvoice: InvoiceData = {
    id: invoice.id,
    senderAddress: {
      street: invoice.businessAddress.street,
      city: invoice.businessAddress.city,
      postCode: invoice.businessAddress.postcode,
      country: invoice.businessAddress.country,
    },
    client: {
      name: invoice.billTo.name,
      email: invoice.sentTo,
      address: {
        street: invoice.billTo.address,
        city: invoice.billTo.city,
        postCode: invoice.billTo.postcode,
        country: invoice.billTo.country,
      },
    },
    invoiceDate: new Date(invoice.invoiceDate),
    paymentTerms: "Net 30 Days",
    projectDescription: invoice.service,
    items: invoice.items,
  };

  return (
    <div className={isMobile ? "p-4 pt-8 pb-24" : "pl-20 p-12"}>
      <div className="max-w-[730px] mx-auto">
        <div
          className="flex items-center justify-start mt-[50px] cursor-pointer w-40 mb-6"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="w-5 h-5 text-[#7C5DFA] cursor-pointer mr-6" />
          <p className="dark:text-white font-bold">Go back</p>
        </div>

        {/* Mobile Status Card */}
        {isMobile && (
          <div className="flex items-center justify-between px-6 py-6 mb-4 bg-white dark:bg-[#1E2139] rounded-lg shadow">
            <span className="text-[#858BB2] dark:text-[#DFE3FA] text-sm">
              Status
            </span>
            <StatusBadge status={invoice.status} />
          </div>
        )}

        {/* Desktop Header with Status + Actions */}
        {!isMobile && (
          <div className="flex justify-between items-center bg-white dark:bg-[#1E2139] px-6 py-4 rounded-lg shadow mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 dark:text-gray-400">Status</span>
              <StatusBadge status={invoice.status} />
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleEdit}
                className="px-4 py-2 bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] rounded-full"
              >
                Edit
              </Button>
              <Button className="px-4 py-2 bg-[#EC5757] hover:bg-[#EC5757]/50 text-[#DFE3FA] rounded-full">
                Delete
              </Button>
              <Button className="px-4 py-2 bg-[#7C5DFA] hover:bg-[#7C5DFA]/50 text-[#DFE3FA] rounded-full">
                Mark as Paid
              </Button>
            </div>
          </div>
        )}

        {/* Main Invoice Info */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#1E2139] rounded-lg p-6 md:p-8">
            {/* Invoice Header */}
            <div
              className={`${
                isMobile ? "mb-8" : "flex justify-between items-start mb-12"
              }`}
            >
              <div className={isMobile ? "mb-6" : ""}>
                <h1 className="text-xl md:text-2xl font-bold text-[#0C0E16] dark:text-[#ffffff] mb-2">
                  #{invoice.id}
                </h1>
                <p className="text-[#7E88C3] dark:text-[#DFE3FA] text-sm md:text-base">
                  {invoice.service}
                </p>
              </div>
              <div
                className={`text-[#7E88C3] dark:text-[#DFE3FA] text-sm ${
                  isMobile ? "text-left" : "text-right"
                }`}
              >
                <p>{invoice.businessAddress.street}</p>
                <p>{invoice.businessAddress.city}</p>
                <p>{invoice.businessAddress.postcode}</p>
                <p>{invoice.businessAddress.country}</p>
              </div>
            </div>

            {/* Invoice Details */}
            {isMobile ? (
              <div className="mb-8">
                {/* First Row: Invoice Date and Bill To */}
                <div className="flex justify-between mb-8">
                  <div className="w-1/2 pr-4">
                    <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] mb-3 text-sm font-medium">
                      Invoice Date
                    </h3>
                    <p className="text-[#0C0E16] dark:text-[#ffffff] font-bold text-lg">
                      {invoice.invoiceDate}
                    </p>

                    <div className=" mt-12">
                      <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] mb-3 text-sm font-medium">
                        Payment Due
                      </h3>
                      <p className="text-[#0C0E16] dark:text-[#ffffff] font-bold text-lg">
                        {invoice.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2 pl-4">
                    <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] mb-3 text-sm font-medium">
                      Bill To
                    </h3>
                    <p className="text-[#0C0E16] dark:text-[#ffffff] font-bold text-lg mb-2">
                      {invoice.billTo.name}
                    </p>
                    <div className="text-[#7E88C3] dark:text-[#DFE3FA] space-y-1 text-sm">
                      <p>{invoice.billTo.address}</p>
                      <p>{invoice.billTo.city}</p>
                      <p>{invoice.billTo.postcode}</p>
                      <p>{invoice.billTo.country}</p>
                    </div>
                  </div>
                </div>

                {/* Third Row: Sent to */}
                <div className="mb-6">
                  <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] mb-3 text-sm font-medium">
                    Sent to
                  </h3>
                  <p className="text-[#0C0E16] dark:text-[#ffffff] font-bold text-lg">
                    {invoice.sentTo}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-row w-full mb-12">
                <div className="w-2/7">
                  <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] mb-4">
                    Invoice Date
                  </h3>
                  <p className="text-[#0C0E16] dark:text-[#ffffff] font-bold text-lg">
                    {invoice.invoiceDate}
                  </p>
                  <div className="mt-12">
                    <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] mb-4">
                      Payment Due
                    </h3>
                    <p className="text-[#0C0E16] dark:text-[#ffffff] font-bold text-lg">
                      {invoice.dueDate}
                    </p>
                  </div>
                </div>

                <div className="w-2/7">
                  <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] mb-4">
                    Bill To
                  </h3>
                  <p className="text-[#0C0E16] dark:text-[#ffffff] font-bold text-lg mb-2">
                    {invoice.billTo.name}
                  </p>
                  <div className="text-[#7E88C3] dark:text-[#DFE3FA] space-y-1">
                    <p>{invoice.billTo.address}</p>
                    <p>{invoice.billTo.city}</p>
                    <p>{invoice.billTo.postcode}</p>
                    <p>{invoice.billTo.country}</p>
                  </div>
                </div>

                <div className="w-2/7">
                  <h3 className="text-[#7E88C3] dark:text-[#DFE3FA] mb-4">
                    Sent to
                  </h3>
                  <p className="text-[#0C0E16] dark:text-[#ffffff] font-bold text-lg">
                    {invoice.sentTo}
                  </p>
                </div>
              </div>
            )}

            {/* Items Table */}
            <div className="bg-[#F9FAFE] dark:bg-[#252945] rounded-lg overflow-hidden">
              {/* Desktop Table Header */}
              {!isMobile && (
                <div className="flex flex-row gap-4 p-6 bg-gray-750 text-[#7E88C3] dark:text-[#DFE3FA] text-sm font-medium w-full">
                  <div className="w-3/6">Item Name</div>
                  <div className="text-center w-1/6">QTY.</div>
                  <div className="text-right w-1/6">Price</div>
                  <div className="text-right w-1/6">Total</div>
                </div>
              )}

              {/* Items */}
              <div
                className={`${
                  isMobile ? "p-6 space-y-6" : "divide-y divide-gray-600 w-full"
                }`}
              >
                {invoice.items.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      isMobile
                        ? "flex justify-between items-center"
                        : "flex flex-row gap-4 p-6"
                    }`}
                  >
                    {isMobile ? (
                      <>
                        <div className="flex-1">
                          <div className="text-[#0C0E16] dark:text-[#ffffff] font-bold text-sm mb-1">
                            {item.name}
                          </div>
                          <div className="text-[#7E88C3] dark:text-[#DFE3FA] text-sm">
                            {item.quantity} x £ {item.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-[#0C0E16] dark:text-[#ffffff] font-bold text-sm">
                          £ {item.total.toFixed(2)}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-[#0C0E16] dark:text-[#ffffff] font-bold w-3/6">
                          {item.name}
                        </div>
                        <div className="text-center text-[#7E88C3] dark:text-[#DFE3FA] text-sm font-medium w-1/6">
                          {item.quantity}
                        </div>
                        <div className="text-right text-[#7E88C3] dark:text-[#DFE3FA] text-sm font-medium w-1/6">
                          £ {item.price.toFixed(2)}
                        </div>
                        <div className="text-right text-[#0C0E16] dark:text-[#ffffff] font-bold w-1/6">
                          £ {item.total.toFixed(2)}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-[#373B53] dark:bg-black p-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm md:text-lg">
                    {isMobile ? "Grand Total" : "Amount Due"}
                  </span>
                  <span className="text-white text-xl md:text-2xl font-bold">
                    £ {invoice.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Actions */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E2139] shadow-lg border-t border-gray-200 dark:border-gray-700 p-4 flex gap-2">
            <button
              onClick={handleEdit}
              className="flex-1 py-4 rounded-full bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] text-sm font-bold"
            >
              Edit
            </button>
            <button className="flex-1 py-4 rounded-full bg-[#EC5757] hover:bg-[#EC5757]/90 text-white text-sm font-bold">
              Delete
            </button>
            <button className="flex-1 py-4 rounded-full bg-[#7C5DFA] hover:bg-[#7C5DFA]/90 text-white text-sm font-bold">
              Mark as Paid
            </button>
          </div>
        )}
      </div>
      {isEditOpen && (
        <CreateInvoiceModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          initialInvoice={mappedInvoice}
          onInvoiceCreate={handleInvoiceUpdate}
          mode="edit"
        />
      )}
    </div>
  );
};

export default InvoiceDetail;
