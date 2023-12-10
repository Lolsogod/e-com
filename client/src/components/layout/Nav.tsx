import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Cart from "../widgets/Cart";
import { useAuth } from "@/store/useAuth";

const Nav = () => {
  const { info, token, logout } = useAuth();
  return (
    <NavigationMenu className="">
      <NavigationMenuList className="flex justify-between p-4 w-screen">
        <Link to="/">
          <h1 className="text-2xl font-bold  self-start">TrueGadget</h1>
        </Link>
        <div>
          {!token && (
            <>
              <NavigationMenuItem className="group inline-flex">
                <Link className={navigationMenuTriggerStyle()} to="/login">
                  Войти
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="group inline-flex">
                <Link className={navigationMenuTriggerStyle()} to="/register">
                  Зарегестрироваться
                </Link>
              </NavigationMenuItem>
            </>
          )}
          {info.role == "ADMIN" && (
            <NavigationMenuItem className="group inline-flex">
              <Link to="/t-admin" className={navigationMenuTriggerStyle()}>
                Админка
              </Link>
            </NavigationMenuItem>
          )}
          {token && (
            <>
              <NavigationMenuItem className="group inline-flex">
                <Cart />
              </NavigationMenuItem>
              <NavigationMenuItem className="group inline-flex">
                <button
                  className={navigationMenuTriggerStyle()}
                  onClick={logout}
                >
                  Выйти
                </button>
              </NavigationMenuItem>
            </>
          )}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Nav;
