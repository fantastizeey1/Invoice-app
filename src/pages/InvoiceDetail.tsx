// pages/InvoiceDetail.tsx

import { useParams } from "react-router-dom";

const InvoiceDetail = () => {
  const { id } = useParams();

  // Later you can fetch invoice data by ID here
  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold">Invoice #{id}</h1>
      <p>More details will go here...</p>
    </div>
  );
};

export default InvoiceDetail;
