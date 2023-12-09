import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
/*li ul fix*/
const Nav = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex justify-end w-screen p-4">
        <Link to="/">
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            Домой
          </NavigationMenuItem>
        </Link>
        <Link to="/auth">
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            Войти
          </NavigationMenuItem>
        </Link>
        <Link to="/t-admin">
          <NavigationMenuItem className={navigationMenuTriggerStyle()}>
            Админка
          </NavigationMenuItem>
        </Link>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Nav;
