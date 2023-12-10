import { trpc } from "@/utils/trpc";
import { useParams } from "@tanstack/react-router";
import AddToCartBtn from "../widgets/AddToCartBtn";
import Rate from "../widgets/Rate";
import { useAuth } from "@/store/useAuth";

const DevicePage = () => {
  const { deviceId } = useParams({ strict: false });
  const device = trpc.device.getOne.useQuery({ id: Number(deviceId) });
  const { token } = useAuth();
  if (!device.data)
    return <h1 className="text-center mt-[40vh]">товар не найден</h1>;
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
              loading="lazy"
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
              {device.data.deviceInfo.map((info) => (
                <p key={info.id}>
                  <span className="font-semibold decoration-black">
                    {info.title}
                  </span>
                  : {info.description}
                </p>
              ))}
            </div>
            <div>
              {token &&<Rate id={device.data.id} device={device}/>}
              <AddToCartBtn device={device.data} className="my-4"/>
            </div>
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
