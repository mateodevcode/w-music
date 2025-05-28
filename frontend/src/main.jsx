import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ReproductorProvider } from "./context/ReproductorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReproductorProvider>
      <App />
    </ReproductorProvider>
  </StrictMode>
);
