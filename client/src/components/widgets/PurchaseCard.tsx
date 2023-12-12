import { Card, CardTitle } from "../ui/card";
import { Link } from "@tanstack/react-router";
import { buttonVariants } from "../ui/button";
import { RouterOutputs } from "@/utils/trpc";

const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString();
}

const PurchaseCard = ({ purchase }:{purchase: RouterOutputs["user"]["getUserPurchases"][number]}) => (
  <Card key={purchase.id} className="p-4 flex justify-between">
    <div>
      <CardTitle className="pb-4">
        id: {purchase.id} - {formatDate(purchase.date)}
      </CardTitle>
      {purchase.purchaseDevices.map((pd) => (
        <div key={pd.device.id} >
          {pd.device.brand.name} {pd.device.name} - {pd.device.price}
        </div>
      ))}
    </div>
    <Link className={buttonVariants({ variant: "outline" })} to="/purchases/$purchaseId" params={{ purchaseId: String(purchase.id) }}>
      Подробнее
    </Link>
  </Card>
);

export default PurchaseCard;