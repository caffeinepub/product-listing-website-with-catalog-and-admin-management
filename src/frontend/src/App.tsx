import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import StorefrontPage from './pages/StorefrontPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductNewPage from './pages/admin/AdminProductNewPage';
import AdminProductEditPage from './pages/admin/AdminProductEditPage';
import AppLayout from './components/AppLayout';
import AdminRouteGuard from './components/auth/AdminRouteGuard';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: StorefrontPage,
});

const productDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductDetailsPage,
});

// Admin routes (protected)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AdminRouteGuard>
      <Outlet />
    </AdminRouteGuard>
  ),
});

const adminProductsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/',
  component: AdminProductsPage,
});

const adminProductNewRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/new',
  component: AdminProductNewPage,
});

const adminProductEditRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/edit/$productId',
  component: AdminProductEditPage,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  productDetailsRoute,
  adminRoute.addChildren([
    adminProductsRoute,
    adminProductNewRoute,
    adminProductEditRoute,
  ]),
]);

// Create router
const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
