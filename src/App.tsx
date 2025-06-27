import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvoiceDetail from "./pages/InvoiceDetail";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="invoices/:id" element={<InvoiceDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
