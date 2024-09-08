/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as CommitImport } from "./routes/commit";

// Create Virtual Routes

const StatusLazyImport = createFileRoute("/status")();
const FiletreeLazyImport = createFileRoute("/filetree")();
const FilecontentLazyImport = createFileRoute("/file_content")();
const AboutLazyImport = createFileRoute("/about")();
const IndexLazyImport = createFileRoute("/")();

// Create/Update Routes

const StatusLazyRoute = StatusLazyImport.update({
	path: "/status",
	getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/status.lazy").then((d) => d.Route));

const FiletreeLazyRoute = FiletreeLazyImport.update({
	path: "/filetree",
	getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/filetree.lazy").then((d) => d.Route));

const FilecontentLazyRoute = FilecontentLazyImport.update({
	path: "/file_content",
	getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/file_content.lazy").then((d) => d.Route));

const AboutLazyRoute = AboutLazyImport.update({
	path: "/about",
	getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/about.lazy").then((d) => d.Route));

const CommitRoute = CommitImport.update({
	path: "/commit",
	getParentRoute: () => rootRoute,
} as any);

const IndexLazyRoute = IndexLazyImport.update({
	path: "/",
	getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy").then((d) => d.Route));

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
	interface FileRoutesByPath {
		"/": {
			id: "/";
			path: "/";
			fullPath: "/";
			preLoaderRoute: typeof IndexLazyImport;
			parentRoute: typeof rootRoute;
		};
		"/commit": {
			id: "/commit";
			path: "/commit";
			fullPath: "/commit";
			preLoaderRoute: typeof CommitImport;
			parentRoute: typeof rootRoute;
		};
		"/about": {
			id: "/about";
			path: "/about";
			fullPath: "/about";
			preLoaderRoute: typeof AboutLazyImport;
			parentRoute: typeof rootRoute;
		};
		"/file_content": {
			id: "/file_content";
			path: "/file_content";
			fullPath: "/file_content";
			preLoaderRoute: typeof FilecontentLazyImport;
			parentRoute: typeof rootRoute;
		};
		"/filetree": {
			id: "/filetree";
			path: "/filetree";
			fullPath: "/filetree";
			preLoaderRoute: typeof FiletreeLazyImport;
			parentRoute: typeof rootRoute;
		};
		"/status": {
			id: "/status";
			path: "/status";
			fullPath: "/status";
			preLoaderRoute: typeof StatusLazyImport;
			parentRoute: typeof rootRoute;
		};
	}
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
	IndexLazyRoute,
	CommitRoute,
	AboutLazyRoute,
	FilecontentLazyRoute,
	FiletreeLazyRoute,
	StatusLazyRoute,
});

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/commit",
        "/about",
        "/file_content",
        "/filetree",
        "/status"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/commit": {
      "filePath": "commit.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/file_content": {
      "filePath": "file_content.lazy.tsx"
    },
    "/filetree": {
      "filePath": "filetree.lazy.tsx"
    },
    "/status": {
      "filePath": "status.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
