import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RouterOutputs } from "@/utils/trpc";
import { Link } from "@tanstack/react-router";
import AddToCartBtn from "./AddToCartBtn";

type Device = RouterOutputs["device"]["getOne"];

const DeviceCard = (props: { device: Device }) => {
  const { device } = props;
  return (
    <Card className="min-w-[350px]">
      <Link to="/products/$deviceId" params={{ deviceId: String(device?.id) }}>
        <CardHeader>
          <CardTitle>
            {device?.brand.name} {device?.name}
          </CardTitle>
          <CardDescription>{device?.price} руб.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center h-[300px]">
          <img loading="lazy" className="max-w-[300px] max-h-[300px] w-auto h-auto block" src={device?.img} alt="image.." />
        </CardContent>
      </Link>
      <CardFooter className="flex justify-end">
        <AddToCartBtn device={device} />
      </CardFooter>
    </Card>
  );
}
export default DeviceCard;