/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'

// Create Virtual Routes

const errors404LazyImport = createFileRoute('/(errors)/404')()

// Create/Update Routes

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: '/_authenticated/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const errors404LazyRoute = errors404LazyImport
  .update({
    id: '/(errors)/404',
    path: '/404',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/404.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(errors)/404': {
      id: '/(errors)/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof errors404LazyImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/404': typeof errors404LazyRoute
  '/': typeof AuthenticatedIndexRoute
}

export interface FileRoutesByTo {
  '/404': typeof errors404LazyRoute
  '/': typeof AuthenticatedIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/(errors)/404': typeof errors404LazyRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/404' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/404' | '/'
  id: '__root__' | '/(errors)/404' | '/_authenticated/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  errors404LazyRoute: typeof errors404LazyRoute
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  errors404LazyRoute: errors404LazyRoute,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/(errors)/404",
        "/_authenticated/"
      ]
    },
    "/(errors)/404": {
      "filePath": "(errors)/404.lazy.tsx"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
