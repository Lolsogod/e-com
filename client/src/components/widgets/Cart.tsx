import {  buttonVariants } from "@/components/ui/button";
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

const Cart = () => {
  const count = 0;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="cursor-pointer">Корзина {count}</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-1">
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
        </SheetHeader>
        <div className="flex-1">
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
                    <span>10000р</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <span className="text-muted-foreground">Ваша корзина пуста...</span>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Link to="/" className={buttonVariants({ className: "w-full" })}>
              К оплате
            </Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
