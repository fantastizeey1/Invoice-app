import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvoiceDetail from "./pages/InvoiceDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add more routes here as needed */}
      <Route path="/invoices/:id" element={<InvoiceDetail />} />
    </Routes>
  );
}

export default App;
