import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { Link } from "@tanstack/react-router";
import { CartItem } from "./CartItem";
import { useCart } from "@/store/useCart";

const Cart = () => {
  const { items, clear } = useCart();
  const count = items.length;
  const cost = items.reduce((acc, item) => acc + item.device!.price, 0);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="cursor-pointer">Корзина {count}</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-1 max-h-screen">
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
        </SheetHeader>

        {count > 0 ? (
          <>
            <div className="flex w-full flex-col pr-0 sm:max-w-lg pb-4">
              Товары ({count})
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Стоимость</span>
                  <span>{cost}р</span>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col gap-4 mt-6">
                {items.map((item) => (
                  <CartItem key={item!.uid} {...item} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <span className="text-muted-foreground">Ваша корзина пуста...</span>
          </div>
        )}

        <SheetFooter className="flex gap-2">
          <SheetClose asChild>
            <Link to="/" className={buttonVariants({ className: "w-full" })}>
              К оплате
            </Link>
          </SheetClose>
          <Button className="w-full" variant={"destructive"} onClick={clear}>
            Очистить корзину
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
