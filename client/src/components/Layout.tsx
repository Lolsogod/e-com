import { Outlet } from "@tanstack/react-router";
import Nav from "./layout/Nav";

const Layout = () => {
  return (
    <>
      <Nav/>
      <Outlet />
    </>
  );
};
export default Layout;
