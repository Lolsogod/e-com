import { Button } from "@/components/ui/button";
import {
  Card,

  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/store/useCart";
import { RouterOutputs } from "@/utils/trpc";

type Device = RouterOutputs["device"]["getOne"];

export function CartItem(props: { device: Device }) {
  const {removeItem} = useCart();
  const { device } = props;
  return (
    <Card className="flex items-center px-4">
      <img className="h-[75px]" src={device?.img} alt="image.." />
      <CardHeader className="flex-1">
        <CardTitle>
          {device?.brand.name} {device?.name}
        </CardTitle>
        <CardDescription>{device?.price} руб.</CardDescription>
      </CardHeader>
      <Button className="w-7 h-7 p-1 self-start mt-4" onClick={() => removeItem(device)} variant={"destructive"}>X</Button>
    </Card>
  );
}
