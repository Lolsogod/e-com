import { RootRoute, Route, Router } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Main from "@/components/pages/Main";
import { Auth } from "@/components/pages/Auth";
import TempAdmin from "@/components/pages/TempAdmin";
import DevicePage from "@/components/pages/DevicePage";
import NotFound from "@/components/pages/NotFound";

const rootRoute = new RootRoute({
  component: Layout,
});
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Main,
});

const productRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'products/$deviceId',
  component: DevicePage,
})
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
const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound
})
const routeTree = rootRoute.addChildren([indexRoute, authRoute, tempAdminRoute, productRoute, notFoundRoute])



export const router = new Router({
  routeTree,
  
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}