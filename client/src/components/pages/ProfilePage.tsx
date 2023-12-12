import { useAuth } from "@/store/useAuth";
import { trpc } from "@/utils/trpc";
import PurchaseCard from "../widgets/PurchaseCard";


const ProfilePage = () => {
  const { info } = useAuth();
  const purchases = trpc.user.getUserPurchases.useQuery();

  if (purchases.isLoading) return <div className="text-center mt-[40vh]">Загрузка...</div>;
  if (purchases.error) return <div className="text-center mt-[40vh] text-red-500">Ошибка: {purchases.error.message}</div>; 
  if (purchases.data?.length === 0) return <h2 className="font-bold">У вас ещё нет покупок</h2>;

  return (
    <div className="m-5 container mx-auto">
      <h1 className="text-2xl mb-5">Пользователь: {info.email}</h1>
      <div className="flex flex-col gap-4">
        {purchases.data?.map((purchase) => (
          <PurchaseCard purchase={purchase} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
