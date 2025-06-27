import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { ChevronLeft } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { invoicesData } from "@/data";
import { useResponsive } from "@/hooks";

const InvoiceDetail: React.FC = () => {
  const { id } = useParams();
  const invoice = invoicesData.find((invoice) => invoice.id === id);
  const navigate = useNavigate();
  const { isDesktop } = useResponsive();

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div className="px-4 md:px-8">
      <div
        className="flex items-center justify-start mt-[50px] mb-6"
        onClick={() => navigate("/")}
      >
        <ChevronLeft className="w-5 h-5 text-[#7C5DFA] cursor-pointer mr-6" />
        <p className="dark:text-white font-bold">Go back</p>
      </div>

      {/* Mobile Status Card */}
      <div className="flex md:hidden items-center justify-between px-6 py-10 mb-3 bg-white dark:bg-[#1E2139] rounded-lg shadow">
        <span className="text-[#858BB2] dark:text-[#DFE3FA]">Status</span>
        <StatusBadge status={invoice.status} />
      </div>

      {/* Header with Status + Actions */}
      <div className="hidden md:flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-gray-500 dark:text-gray-400">Status</span>
          <StatusBadge status={invoice.status} />
        </div>

        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full">
            Edit
          </button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full">
            Delete
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full">
            Mark as Paid
          </button>
        </div>
      </div>

      {/* Main Invoice Info */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg p-8">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-2xl font-bold mb-2">#{invoice.id}</h1>
              <p className="text-gray-400">{invoice.service}</p>
            </div>
            <div className="text-right text-gray-300">
              <p>{invoice.businessAddress.street}</p>
              <p>{invoice.businessAddress.city}</p>
              <p>{invoice.businessAddress.postcode}</p>
              <p>{invoice.businessAddress.country}</p>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-gray-400 mb-4">Invoice Date</h3>
              <p className="text-white font-medium text-lg">
                {invoice.invoiceDate}
              </p>
            </div>

            <div>
              <h3 className="text-gray-400 mb-4">Bill To</h3>
              <p className="text-white font-medium text-lg mb-2">
                {invoice.billTo.name}
              </p>
              <div className="text-gray-300 space-y-1">
                <p>{invoice.billTo.address}</p>
                <p>{invoice.billTo.city}</p>
                <p>{invoice.billTo.postcode}</p>
                <p>{invoice.billTo.country}</p>
              </div>
            </div>

            <div>
              <h3 className="text-gray-400 mb-4">Sent to</h3>
              <p className="text-white font-medium text-lg">{invoice.sentTo}</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-gray-400 mb-4">Payment Due</h3>
            <p className="text-white font-medium text-lg">{invoice.dueDate}</p>
          </div>

          {/* Items Table */}
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-6 bg-gray-750 text-gray-400 text-sm font-medium">
              <div>Item Name</div>
              <div className="text-center">QTY.</div>
              <div className="text-right">Price</div>
              <div className="text-right">Total</div>
            </div>

            <div className="divide-y divide-gray-600">
              {invoice.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 p-6 text-white"
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-center text-gray-300">
                    {item.quantity}
                  </div>
                  <div className="text-right text-gray-300">
                    £ {item.price.toFixed(2)}
                  </div>
                  <div className="text-right font-medium">
                    £ {item.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-black p-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-lg">Amount Due</span>
                <span className="text-white text-2xl font-bold">
                  £ {invoice.amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Actions */}
      {!isDesktop && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-inner p-4 flex justify-around z-10">
          <button className="flex-1 mx-1 py-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-sm font-medium">
            Edit
          </button>
          <button className="flex-1 mx-1 py-3 rounded-full bg-red-600 text-white text-sm font-medium">
            Delete
          </button>
          <button className="flex-1 mx-1 py-3 rounded-full bg-purple-600 text-white text-sm font-medium">
            Mark as Paid
          </button>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetail;
