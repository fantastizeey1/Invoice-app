import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import type { FilterDropdownProps, FilterType } from "@/types";

const statuses = ["all", "draft", "pending", "paid"] as const;

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selected,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (filter: FilterType) => {
    onSelect(selected === filter ? "" : filter);
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 font-bold bg-transparent shadow-none border-transparent transition-colors hover:bg-transparent"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="hidden sm:inline text-[#888EB0] dark:text-[#DFE3FA]">
          Filter by status
        </span>
        <span className="inline sm:hidden text-[#888EB0] dark:text-[#DFE3FA]">
          Filter
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          } text-[#9277FF] dark:text-white`}
        />
      </Button>

      {open && (
        <ul
          className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[#252945] focus:outline-none py-3 px-5"
          role="listbox"
          aria-label="Filter by status"
        >
          {statuses.map((status) => {
            const isChecked = selected === status;
            return (
              <li
                key={status}
                role="option"
                aria-selected={isChecked}
                aria-checked={isChecked}
                tabIndex={0}
                className="group flex items-center px-2 py-2 rounded cursor-pointer text-[#0C0E16] dark:text-white"
                onClick={() => handleSelect(status)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleSelect(status);
                }}
              >
                <span
                  className={`form-checkbox w-4 h-4 rounded mr-2 flex items-center justify-center border ${
                    isChecked
                      ? "bg-[#7C5DFA] border-[#7C5DFA]"
                      : "bg-[#DFE3FA] dark:bg-[#1E2139] border-gray-300"
                  } group-hover:border-[#7C5DFA]`}
                  aria-hidden="true"
                >
                  {isChecked && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="ml-2 font-bold">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
