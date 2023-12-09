import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RouterOutputs } from "@/utils/trpc";

type Device = RouterOutputs["device"]["getOne"];

export function DeviceCard(props:{device: Device}) {
    const {device} = props
  return (
    <Card className="min-w-[350px]">
      <CardHeader>
        <CardTitle>{device?.brand.name} {device?.name}</CardTitle>
        <CardDescription>{device?.price} руб.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <img className="h-[300px]" src={device?.img} alt="image.." />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Добавить в корзину</Button>
      </CardFooter>
    </Card>
  )
}
