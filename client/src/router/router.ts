import { RootRoute, Route, Router } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Main from "@/components/pages/Main";
import { Auth } from "@/components/pages/Auth";
import TempAdmin from "@/components/pages/TempAdmin";

const rootRoute = new RootRoute({
  component: Layout,
});
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Main,
});
const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: Auth,
})
const tempAdminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/t-admin',
  component: TempAdmin,
})

const routeTree = rootRoute.addChildren([indexRoute, authRoute, tempAdminRoute])
export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}