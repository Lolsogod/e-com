import { useAuth } from "@/store/useAuth";
import { trpc } from "@/utils/trpc";
import { Card, CardTitle } from "../ui/card";
import { Link } from "@tanstack/react-router";
import { buttonVariants } from "../ui/button";
const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString();
}
const ProfilePage = () => {
  const { info } = useAuth();
  const purchases = trpc.user.getUserPurchases.useQuery();
  return (
    <div className="m-5 container mx-auto">
      <h1 className="text-2xl mb-5">Пользователь: {info.email}</h1>
      <div className="flex flex-col gap-4">
        {purchases.data?.map((pur) => (
          <Card key={pur.id} className="p-4 flex justify-between">
            <div>
            <CardTitle className="pb-4">
              id: {pur.id} - {formatDate(pur.date)}
            </CardTitle>
            {pur.purchaseDevices.map((pd) => (
              <div key={pd.device.id} >
                {pd.device.brand.name} {pd.device.name} - {pd.device.price}
              </div>
            ))}</div>
            <Link className={buttonVariants({variant: "outline"})} to="/purchases/$purchaseId" params={{ purchaseId: String(pur.id) }}>
              Подробнее
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
