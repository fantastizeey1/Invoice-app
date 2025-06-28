import { useState } from "react";
import type {
  Address,
  Client,
  InvoiceData,
  Item,
  ValidationErrors,
} from "@/types/index";

export const useInvoiceForm = (
  onInvoiceCreate?: (data: InvoiceData, isDraft: boolean) => void,
  onClose?: () => void,
  isOpen: boolean = true
) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    client: {
      name: "",
      email: "",
      address: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
    },
    invoiceDate: new Date(), // keep this - default to today
    paymentTerms: "Net 30 Days", // this is fine
    projectDescription: "",
    items: [
      { id: "1", name: "", quantity: 1, price: 0.0, total: 0.0 }, // set price to 0
    ],
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const paymentTermsOptions = [
    "Net 1 Day",
    "Net 7 Days",
    "Net 14 Days",
    "Net 30 Days",
  ];

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const updateSenderAddress = (field: keyof Address, value: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      senderAddress: { ...prev.senderAddress, [field]: value },
    }));

    if (hasSubmitted) {
      setErrors((prev) => ({
        ...prev,
        senderAddress: { ...prev.senderAddress, [field]: undefined },
      }));
    }
  };

  const updateClient = (
    field: keyof Omit<Client, "address">,
    value: string
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      client: { ...prev.client, [field]: value },
    }));

    if (hasSubmitted) {
      setErrors((prev) => ({
        ...prev,
        client: { ...prev.client, [field]: undefined },
      }));
    }
  };

  const updateClientAddress = (field: keyof Address, value: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      client: {
        ...prev.client,
        address: { ...prev.client.address, [field]: value },
      },
    }));

    if (hasSubmitted) {
      setErrors((prev) => ({
        ...prev,
        client: {
          ...prev.client,
          address: { ...prev.client?.address, [field]: undefined },
        },
      }));
    }
  };

  const updateItem = (
    id: string,
    field: keyof Omit<Item, "id" | "total">,
    value: string | number
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          let updatedValue = value;

          // Coerce to number if necessary
          if (
            (field === "quantity" || field === "price") &&
            typeof value === "string"
          ) {
            updatedValue = parseFloat(value);
          }

          const updatedItem: Item = {
            ...item,
            [field]: updatedValue as number | string,
          };

          if (field === "quantity" || field === "price") {
            const qty =
              field === "quantity" ? Number(updatedValue) : item.quantity;
            const price = field === "price" ? Number(updatedValue) : item.price;
            updatedItem.total = qty * price;
          }

          return updatedItem;
        }
        return item;
      }),
    }));

    if (hasSubmitted) {
      setErrors((prev) => ({
        ...prev,
        items: {
          ...prev.items,
          [id]: { ...prev.items?.[id], [field]: undefined },
        },
      }));
    }
  };

  const addNewItem = () => {
    const newItem: Item = {
      id: generateId(),
      name: "",
      quantity: 1,
      price: 0,
      total: 0,
    };

    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const removeItem = (id: string) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));

      setErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors.items) {
          const updatedItems = { ...newErrors.items };
          delete updatedItems[id];
          newErrors.items = updatedItems;
        }
        return newErrors;
      });
    }
  };

  const validateForm = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    const senderAddressErrors: Partial<Address> = {};
    if (!invoiceData.senderAddress.street.trim())
      senderAddressErrors.street = "Street address is required";
    if (!invoiceData.senderAddress.city.trim())
      senderAddressErrors.city = "City is required";
    if (!invoiceData.senderAddress.postCode.trim())
      senderAddressErrors.postCode = "Post code is required";
    if (!invoiceData.senderAddress.country.trim())
      senderAddressErrors.country = "Country is required";
    if (Object.keys(senderAddressErrors).length > 0)
      errors.senderAddress = senderAddressErrors;

    const clientErrors: ValidationErrors["client"] = {};
    if (!invoiceData.client.name.trim())
      clientErrors.name = "Client name is required";
    if (!invoiceData.client.email.trim()) {
      clientErrors.email = "Client email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invoiceData.client.email)) {
      clientErrors.email = "Please enter a valid email address";
    }

    const clientAddressErrors: Partial<Address> = {};
    if (!invoiceData.client.address.street.trim())
      clientAddressErrors.street = "Street address is required";
    if (!invoiceData.client.address.city.trim())
      clientAddressErrors.city = "City is required";
    if (!invoiceData.client.address.postCode.trim())
      clientAddressErrors.postCode = "Post code is required";
    if (!invoiceData.client.address.country.trim())
      clientAddressErrors.country = "Country is required";

    if (Object.keys(clientAddressErrors).length > 0)
      clientErrors.address = clientAddressErrors;

    if (Object.keys(clientErrors).length > 0) errors.client = clientErrors;

    if (!invoiceData.invoiceDate)
      errors.invoiceDate = "Invoice date is required";

    if (!invoiceData.projectDescription.trim()) {
      errors.projectDescription = "Project description is required";
    }

    const itemErrors: {
      [itemId: string]: Partial<Record<"name" | "quantity" | "price", string>>;
    } = {};

    invoiceData.items.forEach((item) => {
      const itemError: Partial<Record<"name" | "quantity" | "price", string>> =
        {};

      if (!item.name.trim()) itemError.name = "Item name is required";
      if (item.quantity <= 0)
        itemError.quantity = "Quantity must be greater than 0";
      if (item.price <= 0) itemError.price = "Price must be greater than 0";

      if (Object.keys(itemError).length > 0) {
        itemErrors[item.id] = itemError;
      }
    });

    if (Object.keys(itemErrors).length > 0) {
      errors.items = itemErrors;
    }

    return errors;
  };

  const handleSubmit = (isDraft: boolean = false) => {
    setHasSubmitted(true);

    if (!isDraft) {
      const validationErrors = validateForm();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    if (onInvoiceCreate) {
      onInvoiceCreate(invoiceData, isDraft);
    }

    if (onClose) onClose();
    setHasSubmitted(false);
    setErrors({});
  };

  const handleDiscard = () => {
    if (onClose) onClose();
    setHasSubmitted(false);
    setErrors({});
  };

  return {
    invoiceData,
    errors,
    hasSubmitted,
    setHasSubmitted,
    setErrors,
    setInvoiceData,
    updateSenderAddress,
    updateClient,
    updateClientAddress,
    updateItem,
    addNewItem,
    removeItem,
    handleSubmit,
    handleDiscard,
    paymentTermsOptions,
    isOpen,
  };
};
