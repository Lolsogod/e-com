
import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Cart from "../widgets/Cart";
import { useAuth } from "@/store/useAuth";
import { useFlags } from "@/store/useFlags";
import { cn } from "@/lib/utils";

const Nav = () => {
  const { info, token, logout } = useAuth();
  const { flags } = useFlags();
  return (
    <NavigationMenu className="sticky top-0 bg-white">
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
          {token && (
            <>
              {info.role == "ADMIN" && (
                <>
                  {flags?.ADMIN_PANEL ? (
                    <NavigationMenuItem className="group inline-flex">
                      <Link to="/admin" className={navigationMenuTriggerStyle()}>
                        Админ Панель
                      </Link>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem className={cn(navigationMenuTriggerStyle(), "group inline-flex cursor-not-allowed text-gray-400 hover:text-gray-400 select-none")}>
                      Админ Панель
                    </NavigationMenuItem>
                  )}
                </>
              )}
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
              <NavigationMenuItem className="group inline-flex">
                <Link className={navigationMenuTriggerStyle()} to="/profile">
                  Профиль
                </Link>
              </NavigationMenuItem>
            </>
          )}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Nav;
