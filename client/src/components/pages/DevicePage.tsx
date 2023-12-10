import { trpc } from "@/utils/trpc";
import { useParams } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useCart } from "@/store/useCart";

const DevicePage = () => {
  const { deviceId } = useParams({ strict: false });
  const { addItem } = useCart();
  const device = trpc.device.getOne.useQuery({ id: Number(deviceId) });
  if (!device.data) return <h1>товар не найден</h1>;
  else {
    const totalRating =
      device.data?.ratings.reduce((a, b) => a + b.rate, 0) || 0;
    const avgRating =
      totalRating != 0
        ? (totalRating / device.data!.ratings.length).toFixed(1)
        : 0;
    return (
      <>
        <div className="flex justify-center gap-10 mt-[10vh]">
          <div className="flex justify-center items-center">
            <img
              src={device.data.img}
              alt={device.data.name}
              className="rounded-lg max-w-96 h-96"
            />
          </div>
          <div className="mt-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {device.data.brand.name} {device.data.name}
              </h1>

              <p className="text-gray-700 mt-2 text-2xl">
                {device.data.price} руб.
              </p>
              <p className="font-bold mt-2">
                Рейтинг: {avgRating}
                <span className="text-yellow-600">★</span>
              </p>
              <h3 className="font-bold">Характеристики:</h3>
              <p className="text-gray-700 ">
                {device.data.deviceInfo.map((info) => (
                  <p key={info.id}>
                    <span className="font-semibold decoration-black">
                      {info.title}
                    </span>
                    : {info.description}
                  </p>
                ))}
              </p>
            </div>
            <Button onClick={() => addItem(device.data)} className="mb-5">
              Добавить в корзину
            </Button>
          </div>
        </div>
        
          <div className="xl:w-2/4 mx-auto p-5">
            <h1 className="font-bold inline">Описание:</h1>
            <p className="text-gray-700 mt-2">{device.data.description}</p>
          </div>
        
      </>
    );
  }
};

export default DevicePage;