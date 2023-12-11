import { RootRoute, Route, Router } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Main from "@/components/pages/Main";
import AdminPage from "@/components/pages/AdminPage";
import DevicePage from "@/components/pages/DevicePage";
import NotFound from "@/components/pages/NotFound";
import PurchasePage from "@/components/pages/PurchasePage";
import RegisterPage from "@/components/pages/RegisterPage";
import LoginPage from "@/components/pages/LoginPage";
import ProfilePage from "@/components/pages/ProfilePage";

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
  path: "products/$deviceId",
  component: DevicePage,
});
const purchasesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "purchases/$purchaseId",
  component: PurchasePage,
});
const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const tempAdminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});
const profielRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});
const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});
const routeTree = rootRoute.addChildren([
  indexRoute,
  registerRoute,
  loginRoute,
  tempAdminRoute,
  profielRoute,
  productRoute,
  notFoundRoute,
  purchasesRoute,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
