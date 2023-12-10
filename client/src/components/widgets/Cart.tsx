import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Separator } from "../ui/separator";
import { CartItem } from "./CartItem";
import { useCart } from "@/store/useCart";
import { trpc } from "@/utils/trpc";
import { router } from "@/router/router";

const Cart = () => {
  
  const purchase = trpc.user.purchase.useMutation();
  const { items, clear } = useCart();
  const count = items.length;
  const cost = items.reduce((acc, item) => acc + item.device!.price, 0);
  const handlePayment = async () => {
    const ids = items.map((item) => item.device!.id);
    await purchase.mutateAsync({ ids }).then((purchase) => {
      clear();
      router.navigate({to:"/purchases/$purchaseId", params:{purchaseId:String(purchase.id)}});
    });
  };
  return (
    <Sheet>
      <SheetTrigger asChild className={navigationMenuTriggerStyle()}>
        <span className="cursor-pointer">Корзина {count}</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-1 max-h-screen w-full  ">
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
            <SheetFooter className="flex gap-2">
              <SheetClose asChild>
                <Button className="w-full" onClick={handlePayment}>
                  К оплате
                </Button>
              </SheetClose>
              <Button
                className="w-full"
                variant={"destructive"}
                onClick={clear}
              >
                Очистить корзину
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <span className="text-muted-foreground">Ваша корзина пуста...</span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
