import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import "./locales.ts";
import ErrorSonner from "./stories/ErrorSonner.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
        <ErrorSonner />
    </React.StrictMode>,
);
