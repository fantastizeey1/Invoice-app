import React from "react";
import FormInput from "./FormInput";
import type { AddressSectionProps } from "@/types";

const AddressSection: React.FC<AddressSectionProps> = ({
  title,
  address,
  onAddressChange,
  errors = {},
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-[#9277FF] font-medium text-sm">{title}</h3>

      <FormInput
        label="Street Address"
        value={address.street}
        onChange={(value) => onAddressChange("street", value)}
        error={errors.street}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormInput
          label="City"
          value={address.city}
          onChange={(value) => onAddressChange("city", value)}
          error={errors.city}
          required
        />

        <FormInput
          label="Post Code"
          value={address.postCode}
          onChange={(value) => onAddressChange("postCode", value)}
          error={errors.postCode}
          required
        />

        <FormInput
          label="Country"
          value={address.country}
          onChange={(value) => onAddressChange("country", value)}
          error={errors.country}
          required
        />
      </div>
    </div>
  );
};

export default AddressSection;
