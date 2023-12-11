import { trpc } from "@/utils/trpc";
import { Navigate, useParams } from "@tanstack/react-router";
import { Card } from "../ui/card";
import Confetti from "react-confetti";

const PurchasePage = () => {
  const { purchaseId } = useParams({ strict: false });
  const purchase = trpc.user.getOnePurchase.useQuery({
    purchaseId: Number(purchaseId),
  });
  const isDateLessThanMinuteAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const difference = Number(now) - Number(date);
    return difference < 60000;
  };

  if (purchase.error) return <Navigate to="/"></Navigate>;
  const calculateTotalPrice = () => {
    return purchase.data!.purchaseDevices.reduce((total, item) => {
      return total + item.device.price;
    }, 0);
  };
  const formateDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  if (!purchase.data) return <h1 className="text-center mt-[40vh]">Нет доступа</h1>;
    return (
      <>
        <div className="container mx-auto mt-8">
          {isDateLessThanMinuteAgo(purchase.data.date) && (
            <Confetti recycle={false} />
          )}
          <Card className="p-10">
            <h2 className="text-2xl font-semibold">Спасибо за покупку!</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Информация о покупке:
              </h3>
              <p>ID: {purchase.data.id}</p>
              <p>Дата: {formateDate(purchase.data.date)}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Купленные товары:</h3>
              <ul>
                {purchase.data.purchaseDevices.map((item) => (
                  <li key={item.id} className="mb-2">
                    <div>
                      <p className="text-sm font-semibold">
                        {item.device.brand.name} {item.device.name}
                      </p>
                      <p className="text-sm">Цена: {item.device.price} руб.</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-4 font-semibold">
                Стоимость: {calculateTotalPrice()} руб.
              </p>
            </div>
          </Card>
        </div>
      </>
    );
};

export default PurchasePage;
