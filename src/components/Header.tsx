import { Plus } from "lucide-react";
import FilterDropdown from "./FilterDropdown";
import { Button } from "./ui/button";
import type { HeaderProps } from "@/types";

const Header: React.FC<HeaderProps> = ({
  totalInvoices,
  selectedFilter,
  onFilterChange,
  onNewInvoice,
}) => {
  return (
    <div className="flex items-center justify-between mb-12 text-[#0C0E16] dark:text-white">
      <div>
        <h1 className="text-3xl font-bold mb-2">Invoices</h1>
        {totalInvoices === 0 ? (
          <>
            <p className="dark:text-[#DFE3FA] hidden sm:inline">No invoices</p>
            <p className="text-slate-400 inline sm:hidden">No invoices</p>
          </>
        ) : (
          <>
            <p className="dark:text-[#DFE3FA] hidden sm:inline">
              There {totalInvoices === 1 ? "is" : "are"} {totalInvoices}{" "}
              {selectedFilter !== "all" ? `${selectedFilter} ` : "total "}
              invoice
              {totalInvoices !== 1 && "s"}
            </p>
            <p className="text-slate-400 inline sm:hidden">
              {totalInvoices}{" "}
              {selectedFilter !== "all" ? `${selectedFilter}` : ""} invoice
              {totalInvoices !== 1 && "s"}
            </p>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <FilterDropdown selected={selectedFilter} onSelect={onFilterChange} />

        <Button
          onClick={onNewInvoice}
          className="bg-[#9277FF] text-white px-3 py-6 rounded-full font-medium transition-colors duration-200 flex items-center cursor-pointer space-x-2 hover:bg-[#7C5DFA]"
          aria-label="Create new invoice"
        >
          <span className="bg-white rounded-full p-2 shadow-md flex items-center justify-center">
            <Plus className="w-4 h-4 text-[#9277ff]" />
          </span>
          <span className="hidden sm:inline">New Invoice</span>
          <span className="inline sm:hidden">New</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
