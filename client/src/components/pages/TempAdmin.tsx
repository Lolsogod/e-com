import { useAuth } from "@/store/useAuth";
import React, { Suspense } from "react";

//import AdminPannel from "remoteApp/Admin";
const AdminPannel = React.lazy(() => import("remoteApp/Admin"));

const TempAdmin = () => {
  const {token} = useAuth();
  return (
    <>
      <h1>админка</h1>
      <Suspense fallback={<div>загрузка...</div>}>
        <AdminPannel token={token} />
      </Suspense>
    </>
  );
};

export default TempAdmin;
