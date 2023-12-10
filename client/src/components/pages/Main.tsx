import { trpc } from "@/utils/trpc";
import { DeviceCard } from "../widgets/DeviceCard";

const Main = () => {
  const devices = trpc.device.get.useQuery()
  return (
    <section className="w-fit mx-auto grid grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-14 mt-10 mb-5 ">
      {devices.data?.map((device)=> (
        <DeviceCard key={device.id} device={device} />
      ))}
    </section>
  );
};

export default Main;
