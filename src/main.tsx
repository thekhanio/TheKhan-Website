import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Accent baked at build time via VITE_ACCENT=green|oxblood|blue (defaults green).
const rawAccent = import.meta.env.VITE_ACCENT as string | undefined;
const accent = rawAccent === "oxblood" || rawAccent === "blue" ? rawAccent : "green";
document.documentElement.setAttribute("data-accent", accent);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
