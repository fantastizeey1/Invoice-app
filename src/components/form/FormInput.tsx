import type { FormInputProps } from "@/types";
import React from "react";

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
}) => {
  return (
    <div>
      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white dark:bg-[#1E2139] border rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-[#9277FF] focus:border-transparent ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
