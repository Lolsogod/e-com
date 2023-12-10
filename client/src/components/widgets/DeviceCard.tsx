import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/store/useCart";
import { RouterOutputs } from "@/utils/trpc";
import { Link } from "@tanstack/react-router";

type Device = RouterOutputs["device"]["getOne"];

export function DeviceCard(props: { device: Device }) {
  const { addItem } = useCart();
  const { device } = props;
  const handleAddToCart = () => {
    addItem(device);
  };
  return (
    <Card className="min-w-[350px]">
      <Link to="/products/$deviceId" params={{ deviceId: String(device?.id) }}>
        <CardHeader>
          <CardTitle>
            {device?.brand.name} {device?.name}
          </CardTitle>
          <CardDescription>{device?.price} руб.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <img className="h-[300px]" src={device?.img} alt="image.." />
        </CardContent>
      </Link>
      <CardFooter className="flex justify-end">
        <Button onClick={handleAddToCart}>Добавить в корзину</Button>
      </CardFooter>
    </Card>
  );
}
