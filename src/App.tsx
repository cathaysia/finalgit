import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "./components/themeProvider";
import { routeTree } from "./routeTree.gen";
import { attachConsole } from "@tauri-apps/plugin-log";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
export default function Default() {
    attachConsole();
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}
