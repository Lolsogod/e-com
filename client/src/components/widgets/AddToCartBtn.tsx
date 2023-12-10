import { RouterOutputs } from "@/utils/trpc";
import { Button, buttonVariants } from "../ui/button";
import { useCart } from "@/store/useCart";
import { useAuth } from "@/store/useAuth";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Device = RouterOutputs["device"]["getOne"];
const AddToCartBtn = (props: { device: Device; className?: string }) => {
  const { device } = props;
  const { addItem } = useCart();
  const { token } = useAuth();
  if (!token)
    return (
      <Link
        to="/login"
        className={cn(buttonVariants({ variant: "ghost" }), props.className)}
      >
        Войдите чтобы начать покупки
      </Link>
    );
  return (
    <Button onClick={() => addItem(device)} className={props.className}>
      Добавить в корзину
    </Button>
  );
};

export default AddToCartBtn;
