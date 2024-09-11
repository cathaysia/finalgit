import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import "./locales.ts";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
        <Toaster />
    </React.StrictMode>,
);
