import { trpc } from "@/utils/trpc";
import { DeviceCard } from "../widgets/DeviceCard";

const Main = () => {
  const devices = trpc.device.get.useQuery();

  if (devices.isLoading) return <div className="text-center mt-[40vh]">Загрузка...</div>;
  if (devices.error) return <div className="text-center mt-[40vh] text-red-500">Ошибка: {devices.error.message}</div>; 
  if (devices.data?.length === 0) return <div className="text-center mt-[40vh]">Товары не найдены...</div>;

  return (
    <section className="w-fit mx-auto grid grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-14 mt-10 mb-5 ">
      {devices.data?.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </section>
  );
};

export default Main;