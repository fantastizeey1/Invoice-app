import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* Wrapping the App component with BrowserRouter to enable routing */}
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
