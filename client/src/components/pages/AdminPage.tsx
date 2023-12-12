import { trpc } from "@/utils/trpc";
import { Suspense, lazy } from "react";
const AdminPannel = lazy(() => import("remoteApp/Admin"));

const AdminPage = () => {
  return (
    <>
      <div className="m-4 container mx-auto">
        <h1 className="text-3xl font-bold pb-4 ">Админ Панель</h1>
        <Suspense fallback={<div>Загрузка...</div>}>
          <AdminPannel trpc={trpc} />
        </Suspense>
      </div>
    </>
  );
};

export default AdminPage;
