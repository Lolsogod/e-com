import { trpc } from "@/utils/trpc";

const Main = () => {
  const phones = trpc.device.get.useQuery()
  return (
    <div>
      {phones.data?.map((phone)=> (
        <div>{phone.brand.name} {phone.name}</div>
      ))}
    </div>
  );
};

export default Main;
