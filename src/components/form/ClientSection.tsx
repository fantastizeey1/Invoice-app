import React from "react";
import FormInput from "./FormInput";
import type { ClientSectionProps } from "@/types";

const ClientSection: React.FC<ClientSectionProps> = ({
  client,
  onClientChange,
  onAddressChange,
  errors = {},
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-[#9277FF] font-medium text-sm">Bill To</h3>

      <FormInput
        label="Client's Name"
        value={client.name}
        onChange={(value) => onClientChange("name", value)}
        error={errors.name}
        required
      />

      <FormInput
        label="Client's Email"
        type="email"
        value={client.email}
        onChange={(value) => onClientChange("email", value)}
        error={errors.email}
        required
      />

      <FormInput
        label="Street Address"
        value={client.address.street}
        onChange={(value) => onAddressChange("street", value)}
        error={errors.address?.street}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormInput
          label="City"
          value={client.address.city}
          onChange={(value) => onAddressChange("city", value)}
          error={errors.address?.city}
          required
        />

        <FormInput
          label="Post Code"
          value={client.address.postCode}
          onChange={(value) => onAddressChange("postCode", value)}
          error={errors.address?.postCode}
          required
        />

        <FormInput
          label="Country"
          value={client.address.country}
          onChange={(value) => onAddressChange("country", value)}
          error={errors.address?.country}
          required
        />
      </div>
    </div>
  );
};

export default ClientSection;
