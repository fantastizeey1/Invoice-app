import React from "react";
import DatePicker from "react-datepicker";
import { Calendar as CalendarIcon } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  required?: boolean;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  error,
  required = false,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <DatePicker
          selected={value}
          onChange={onChange}
          dateFormat="dd MMM yyyy"
          className={`w-full px-4 py-3 pr-10 bg-white dark:bg-[#1E2139] border rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-[#9277FF] focus:border-transparent ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          calendarClassName="dark:bg-[#1E2139] dark:border-gray-600"
        />
        <CalendarIcon className="absolute right-3 top-3.5 text-[#9277FF] pointer-events-none w-5 h-5" />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DatePickerField;
