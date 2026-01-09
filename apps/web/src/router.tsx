import React from 'react';
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  createHashHistory
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './App';

const rootRoute = createRootRoute({
  component: () => (
    <React.Suspense fallback={<p>Loading…</p>}>
      <Outlet />
    </React.Suspense>
  )
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App
});

const routeTree = rootRoute.addChildren([indexRoute]);

export function createAppRouter(queryClient: QueryClient) {
  const router = createRouter({
    routeTree,
    history: createHashHistory(),
    context: { queryClient }
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}

export function RouterRoot({ router, queryClient }: { router: ReturnType<typeof createAppRouter>; queryClient: QueryClient }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
