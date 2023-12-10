import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Cart from "../widgets/Cart";

const Nav = () => {
  return (
    <NavigationMenu className="">
      <NavigationMenuList className="flex justify-between p-4 w-screen">
        <Link to="/">
          <h1 className="text-2xl font-bold  self-start">TrueGadget</h1>
        </Link>
        <div>
          <NavigationMenuItem className="group inline-flex">
            <Link className={navigationMenuTriggerStyle()} to="/login">
              Войти
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="group inline-flex">
            <Link to="/t-admin" className={navigationMenuTriggerStyle()}>
              Админка
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="group inline-flex">
            <Cart />
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Nav;
