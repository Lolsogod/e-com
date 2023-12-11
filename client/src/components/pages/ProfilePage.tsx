import { useAuth } from "@/store/useAuth";
import { trpc } from "@/utils/trpc";
import { Card, CardTitle } from "../ui/card";

const ProfilePage = () => {
  const { info } = useAuth();
  const purchases = trpc.user.getUserPurchases.useQuery();
  return (
    <div>
      <h1 className="text-2xl mb-5">{info.email}</h1>
      <div className="flex flex-col gap-4">
        {purchases.data?.map((pur) => (
          <Card className="p-4">
            <CardTitle>
              {pur.id} - {pur.date}
            </CardTitle>
            {pur.purchaseDevices.map((pd) => (
              <div>
                {pd.device.brand.name} {pd.device.name} - {pd.device.price}
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
