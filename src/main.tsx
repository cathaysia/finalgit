import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import "./i18n.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<div className="text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
			<App />
		</div>
	</React.StrictMode>,
);
