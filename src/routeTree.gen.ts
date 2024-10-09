/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './app/__root';
import { Route as SettingsLayoutImport } from './app/settings/layout';
import { Route as FiletreeLayoutImport } from './app/filetree/layout';
import { Route as DiffLayoutImport } from './app/diff/layout';
import { Route as PageImport } from './app/page';
import { Route as SettingsPageImport } from './app/settings/page';
import { Route as MainPageImport } from './app/main/page';
import { Route as FiletreePageImport } from './app/filetree/page';
import { Route as DiffPageImport } from './app/diff/page';
import { Route as SettingsGitImport } from './app/settings/git';
import { Route as SettingsAiImport } from './app/settings/ai';
import { Route as FiletreeCommitImport } from './app/filetree/$commit';

// Create/Update Routes

const SettingsLayoutRoute = SettingsLayoutImport.update({
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any);

const FiletreeLayoutRoute = FiletreeLayoutImport.update({
  path: '/filetree',
  getParentRoute: () => rootRoute,
} as any);

const DiffLayoutRoute = DiffLayoutImport.update({
  path: '/diff',
  getParentRoute: () => rootRoute,
} as any);

const PageRoute = PageImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const SettingsPageRoute = SettingsPageImport.update({
  path: '/',
  getParentRoute: () => SettingsLayoutRoute,
} as any);

const MainPageRoute = MainPageImport.update({
  path: '/main/',
  getParentRoute: () => rootRoute,
} as any);

const FiletreePageRoute = FiletreePageImport.update({
  path: '/',
  getParentRoute: () => FiletreeLayoutRoute,
} as any);

const DiffPageRoute = DiffPageImport.update({
  path: '/',
  getParentRoute: () => DiffLayoutRoute,
} as any);

const SettingsGitRoute = SettingsGitImport.update({
  path: '/git',
  getParentRoute: () => SettingsLayoutRoute,
} as any);

const SettingsAiRoute = SettingsAiImport.update({
  path: '/ai',
  getParentRoute: () => SettingsLayoutRoute,
} as any);

const FiletreeCommitRoute = FiletreeCommitImport.update({
  path: '/$commit',
  getParentRoute: () => FiletreeLayoutRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof PageImport;
      parentRoute: typeof rootRoute;
    };
    '/diff': {
      id: '/diff';
      path: '/diff';
      fullPath: '/diff';
      preLoaderRoute: typeof DiffLayoutImport;
      parentRoute: typeof rootRoute;
    };
    '/filetree': {
      id: '/filetree';
      path: '/filetree';
      fullPath: '/filetree';
      preLoaderRoute: typeof FiletreeLayoutImport;
      parentRoute: typeof rootRoute;
    };
    '/settings': {
      id: '/settings';
      path: '/settings';
      fullPath: '/settings';
      preLoaderRoute: typeof SettingsLayoutImport;
      parentRoute: typeof rootRoute;
    };
    '/filetree/$commit': {
      id: '/filetree/$commit';
      path: '/$commit';
      fullPath: '/filetree/$commit';
      preLoaderRoute: typeof FiletreeCommitImport;
      parentRoute: typeof FiletreeLayoutImport;
    };
    '/settings/ai': {
      id: '/settings/ai';
      path: '/ai';
      fullPath: '/settings/ai';
      preLoaderRoute: typeof SettingsAiImport;
      parentRoute: typeof SettingsLayoutImport;
    };
    '/settings/git': {
      id: '/settings/git';
      path: '/git';
      fullPath: '/settings/git';
      preLoaderRoute: typeof SettingsGitImport;
      parentRoute: typeof SettingsLayoutImport;
    };
    '/diff/': {
      id: '/diff/';
      path: '/';
      fullPath: '/diff/';
      preLoaderRoute: typeof DiffPageImport;
      parentRoute: typeof DiffLayoutImport;
    };
    '/filetree/': {
      id: '/filetree/';
      path: '/';
      fullPath: '/filetree/';
      preLoaderRoute: typeof FiletreePageImport;
      parentRoute: typeof FiletreeLayoutImport;
    };
    '/main/': {
      id: '/main/';
      path: '/main';
      fullPath: '/main';
      preLoaderRoute: typeof MainPageImport;
      parentRoute: typeof rootRoute;
    };
    '/settings/': {
      id: '/settings/';
      path: '/';
      fullPath: '/settings/';
      preLoaderRoute: typeof SettingsPageImport;
      parentRoute: typeof SettingsLayoutImport;
    };
  }
}

// Create and export the route tree

interface DiffLayoutRouteChildren {
  DiffPageRoute: typeof DiffPageRoute;
}

const DiffLayoutRouteChildren: DiffLayoutRouteChildren = {
  DiffPageRoute: DiffPageRoute,
};

const DiffLayoutRouteWithChildren = DiffLayoutRoute._addFileChildren(
  DiffLayoutRouteChildren,
);

interface FiletreeLayoutRouteChildren {
  FiletreeCommitRoute: typeof FiletreeCommitRoute;
  FiletreePageRoute: typeof FiletreePageRoute;
}

const FiletreeLayoutRouteChildren: FiletreeLayoutRouteChildren = {
  FiletreeCommitRoute: FiletreeCommitRoute,
  FiletreePageRoute: FiletreePageRoute,
};

const FiletreeLayoutRouteWithChildren = FiletreeLayoutRoute._addFileChildren(
  FiletreeLayoutRouteChildren,
);

interface SettingsLayoutRouteChildren {
  SettingsAiRoute: typeof SettingsAiRoute;
  SettingsGitRoute: typeof SettingsGitRoute;
  SettingsPageRoute: typeof SettingsPageRoute;
}

const SettingsLayoutRouteChildren: SettingsLayoutRouteChildren = {
  SettingsAiRoute: SettingsAiRoute,
  SettingsGitRoute: SettingsGitRoute,
  SettingsPageRoute: SettingsPageRoute,
};

const SettingsLayoutRouteWithChildren = SettingsLayoutRoute._addFileChildren(
  SettingsLayoutRouteChildren,
);

export interface FileRoutesByFullPath {
  '/': typeof PageRoute;
  '/diff': typeof DiffLayoutRouteWithChildren;
  '/filetree': typeof FiletreeLayoutRouteWithChildren;
  '/settings': typeof SettingsLayoutRouteWithChildren;
  '/filetree/$commit': typeof FiletreeCommitRoute;
  '/settings/ai': typeof SettingsAiRoute;
  '/settings/git': typeof SettingsGitRoute;
  '/diff/': typeof DiffPageRoute;
  '/filetree/': typeof FiletreePageRoute;
  '/main': typeof MainPageRoute;
  '/settings/': typeof SettingsPageRoute;
}

export interface FileRoutesByTo {
  '/': typeof PageRoute;
  '/filetree/$commit': typeof FiletreeCommitRoute;
  '/settings/ai': typeof SettingsAiRoute;
  '/settings/git': typeof SettingsGitRoute;
  '/diff': typeof DiffPageRoute;
  '/filetree': typeof FiletreePageRoute;
  '/main': typeof MainPageRoute;
  '/settings': typeof SettingsPageRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof PageRoute;
  '/diff': typeof DiffLayoutRouteWithChildren;
  '/filetree': typeof FiletreeLayoutRouteWithChildren;
  '/settings': typeof SettingsLayoutRouteWithChildren;
  '/filetree/$commit': typeof FiletreeCommitRoute;
  '/settings/ai': typeof SettingsAiRoute;
  '/settings/git': typeof SettingsGitRoute;
  '/diff/': typeof DiffPageRoute;
  '/filetree/': typeof FiletreePageRoute;
  '/main/': typeof MainPageRoute;
  '/settings/': typeof SettingsPageRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | '/'
    | '/diff'
    | '/filetree'
    | '/settings'
    | '/filetree/$commit'
    | '/settings/ai'
    | '/settings/git'
    | '/diff/'
    | '/filetree/'
    | '/main'
    | '/settings/';
  fileRoutesByTo: FileRoutesByTo;
  to:
    | '/'
    | '/filetree/$commit'
    | '/settings/ai'
    | '/settings/git'
    | '/diff'
    | '/filetree'
    | '/main'
    | '/settings';
  id:
    | '__root__'
    | '/'
    | '/diff'
    | '/filetree'
    | '/settings'
    | '/filetree/$commit'
    | '/settings/ai'
    | '/settings/git'
    | '/diff/'
    | '/filetree/'
    | '/main/'
    | '/settings/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  PageRoute: typeof PageRoute;
  DiffLayoutRoute: typeof DiffLayoutRouteWithChildren;
  FiletreeLayoutRoute: typeof FiletreeLayoutRouteWithChildren;
  SettingsLayoutRoute: typeof SettingsLayoutRouteWithChildren;
  MainPageRoute: typeof MainPageRoute;
}

const rootRouteChildren: RootRouteChildren = {
  PageRoute: PageRoute,
  DiffLayoutRoute: DiffLayoutRouteWithChildren,
  FiletreeLayoutRoute: FiletreeLayoutRouteWithChildren,
  SettingsLayoutRoute: SettingsLayoutRouteWithChildren,
  MainPageRoute: MainPageRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/diff",
        "/filetree",
        "/settings",
        "/main/"
      ]
    },
    "/": {
      "filePath": "page.tsx"
    },
    "/diff": {
      "filePath": "diff/layout.tsx",
      "children": [
        "/diff/"
      ]
    },
    "/filetree": {
      "filePath": "filetree/layout.tsx",
      "children": [
        "/filetree/$commit",
        "/filetree/"
      ]
    },
    "/settings": {
      "filePath": "settings/layout.tsx",
      "children": [
        "/settings/ai",
        "/settings/git",
        "/settings/"
      ]
    },
    "/filetree/$commit": {
      "filePath": "filetree/$commit.tsx",
      "parent": "/filetree"
    },
    "/settings/ai": {
      "filePath": "settings/ai.tsx",
      "parent": "/settings"
    },
    "/settings/git": {
      "filePath": "settings/git.tsx",
      "parent": "/settings"
    },
    "/diff/": {
      "filePath": "diff/page.tsx",
      "parent": "/diff"
    },
    "/filetree/": {
      "filePath": "filetree/page.tsx",
      "parent": "/filetree"
    },
    "/main/": {
      "filePath": "main/page.tsx"
    },
    "/settings/": {
      "filePath": "settings/page.tsx",
      "parent": "/settings"
    }
  }
}
ROUTE_MANIFEST_END */
