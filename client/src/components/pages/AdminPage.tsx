import { useAuth } from "@/store/useAuth";
import { trpc } from "@/utils/trpc";
import  { Suspense, lazy } from "react";

//import AdminPannel from "remoteApp/Admin";
const AdminPannel = lazy(() => import("remoteApp/Admin"));

const AdminPage = () => {
  const {token} = useAuth();
  return (
    <>
    <div className="m-4 container mx-auto">
      <h1 className="text-3xl font-bold pb-4 ">Админ Панель</h1>
      <Suspense fallback={<div>Сервис временно не доступен...</div>}>
        <AdminPannel token={token} trpc={trpc} />
      </Suspense>
      </div>
    </>
  );
};

export default AdminPage;
