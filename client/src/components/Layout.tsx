import { Outlet } from "@tanstack/react-router";
import Nav from "./layout/Nav";
import { trpc } from "@/utils/trpc";
import { useFlags } from "@/store/useFlags";
import { useEffect } from "react";

const Layout = () => {
  const { setFlags } = useFlags();
  const flagsMut = trpc.feature.get.useMutation();
  useEffect(()=>{
    flagsMut.mutateAsync().then((newFlags) => setFlags(newFlags));
  },[])
  
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
export default Layout;
