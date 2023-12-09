import { trpc } from "@/utils/trpc";
import { DeviceCard } from "../widgets/DeviceCard";

const Main = () => {
  const devices = trpc.device.get.useQuery()
  return (
    <div className="flex gap-5 px-10 overflow-x-auto ">
      {devices.data?.map((device)=> (
        <DeviceCard key={device.id} device={device} />
      ))}
    </div>
  );
};

export default Main;
