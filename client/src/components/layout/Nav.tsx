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
        <h1 className="text-2xl font-bold  self-start">TrueGadget</h1>
        <div>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link to="/"> Домой</Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link to="/auth">Войти</Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Link to="/t-admin">Админка</Link>
          </NavigationMenuItem>
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            <Cart/>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Nav;
