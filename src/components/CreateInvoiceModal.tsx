import { X } from "lucide-react";
import FormInput from "./form/FormInput";
import AddressSection from "./form/AddressSection";
import ClientSection from "./form/ClientSection";
import DatePickerField from "./form/DatePickerField";
import DropdownField from "./form/DropdownField";
import ItemList from "./form/ItemList";
import { useInvoiceForm } from "@/hooks/useInvoiceForm";
import type { CreateInvoiceModalProps } from "@/types";
const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  isOpen,
  onClose,
  onInvoiceCreate,
  initialInvoice,
  mode = "create",
}) => {
  const {
    invoiceData,
    setInvoiceData,
    setErrors,
    paymentTermsOptions,
    errors,
    hasSubmitted,
    updateSenderAddress,
    updateClient,
    updateClientAddress,
    updateItem,
    addNewItem,
    removeItem,
    handleSubmit,
    handleDiscard,
  } = useInvoiceForm(onInvoiceCreate, onClose, isOpen, initialInvoice);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={handleDiscard} />

      <div className="absolute inset-y-0 left-0 w-full max-w-2xl bg-white dark:bg-[#141625] shadow-xl">
        <div className="h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 lg:hidden">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              New Invoice
            </h2>
            <button
              onClick={handleDiscard}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {mode === "edit" ? "Edit Invoice" : "New Invoice"}
            </h2>

            {/* Bill From Section */}
            <AddressSection
              title="Bill From"
              address={invoiceData.senderAddress}
              onAddressChange={updateSenderAddress}
              errors={errors.senderAddress}
            />

            {/* Bill To Section */}
            <ClientSection
              client={invoiceData.client}
              onClientChange={updateClient}
              onAddressChange={updateClientAddress}
              errors={errors.client}
            />

            {/* Invoice Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DatePickerField
                label="Issue Date"
                value={invoiceData.invoiceDate}
                onChange={(date) => {
                  setInvoiceData((prev) => ({ ...prev, invoiceDate: date }));
                  if (hasSubmitted) {
                    setErrors((prev) => ({ ...prev, invoiceDate: undefined }));
                  }
                }}
                error={errors.invoiceDate}
                required
              />

              <DropdownField
                label="Payment Terms"
                value={invoiceData.paymentTerms}
                options={paymentTermsOptions}
                onChange={(value) =>
                  setInvoiceData((prev) => ({ ...prev, paymentTerms: value }))
                }
                required
              />
            </div>

            {/* Project Description */}
            <FormInput
              label="Project Description"
              value={invoiceData.projectDescription}
              onChange={(value) => {
                setInvoiceData((prev) => ({
                  ...prev,
                  projectDescription: value,
                }));
                if (hasSubmitted) {
                  setErrors((prev) => ({
                    ...prev,
                    projectDescription: undefined,
                  }));
                }
              }}
              placeholder="e.g. Graphic Design Service"
              error={errors.projectDescription}
              required
            />

            {/* Item List */}
            <ItemList
              items={invoiceData.items}
              onItemUpdate={updateItem}
              onItemRemove={removeItem}
              onAddItem={addNewItem}
              errors={errors.items}
            />

            {/* General Error Message */}
            {hasSubmitted && Object.keys(errors).length > 0 && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                  Please fix the errors above before submitting the invoice.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 p-6 bg-white dark:bg-[#1E2139] border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleDiscard}
              className="px-6 py-3 bg-gray-100 dark:bg-[#252945] text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Discard
            </button>
            <button
              onClick={() => handleSubmit(true)}
              className="px-6 py-3 bg-gray-700 dark:bg-[#373B53] text-white rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSubmit(false)}
              className="px-6 py-3 bg-[#9277FF] text-white rounded-full font-medium hover:bg-[#7C5DFA] transition-colors"
            >
              Save & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoiceModal;
