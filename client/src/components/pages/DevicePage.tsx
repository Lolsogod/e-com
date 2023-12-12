import { trpc } from "@/utils/trpc";
import { useParams } from "@tanstack/react-router";
import AddToCartBtn from "../widgets/AddToCartBtn";
import Rate from "../widgets/Rate";
import { useAuth } from "@/store/useAuth";
import { useFlags } from "@/store/useFlags";

const DevicePage = () => {
  const { deviceId } = useParams({ strict: false });
  const device = trpc.device.getOne.useQuery({ id: Number(deviceId) });
  const { token } = useAuth();
  const { flags } = useFlags()

  if (device.isLoading)
    return <div className="text-center mt-[40vh]">Загрузка...</div>;
  if (device.error || !device.data)
    return <h1 className="text-center mt-[40vh]">Товар не найден</h1>;
  else {
    const totalRating =
      device.data?.ratings.reduce((a, b) => a + b.rate, 0) || 0;
    const avgRating =
      totalRating != 0
        ? (totalRating / device.data!.ratings.length).toFixed(1)
        : 0;
    return (
      <>
        <div className="flex flex-col sm:flex-row justify-center gap-10 mt-[10vh]">
          <div className="flex justify-center items-center">
            <img
              loading="lazy"
              src={device.data.img}
              alt={device.data.name}
              className="max-w-96 max-h-96 w-auto h-auto block"
            />
          </div>
          <div className="mt-8 flex flex-col justify-between m-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {device.data.brand.name} {device.data.name}
              </h1>
              <p className="text-gray-700 mt-2 text-2xl">
                {device.data.price} руб.
              </p>
              {flags?.RATING && (
                <p className="font-bold mt-2">
                  Рейтинг: {avgRating}
                  <span className="text-yellow-600">★</span>
                </p>)}
              {device.data.deviceInfo.length > 0 && <>
                <h3 className="font-bold">Характеристики:</h3>
                {device.data.deviceInfo.map((info) => (
                  <p key={info.id}>
                    <span className="font-semibold decoration-black">
                      {info.title}
                    </span>
                    : {info.description}
                  </p>
                ))
                }
              </>
              }
            </div>
            <div>
              {token && flags?.RATING && <Rate id={device.data.id} device={device} />}
              <AddToCartBtn device={device.data} className="my-4" />
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
