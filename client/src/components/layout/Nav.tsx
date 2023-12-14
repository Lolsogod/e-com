
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
    <NavigationMenu className="sticky top-0 bg-white flex justify-between max-w-none w-screen p-4">
        <Link to="/">
          <h1 className="text-2xl font-bold">TrueGadget</h1>
        </Link>
         <NavigationMenuList >
          {!token && (
            <>
              <NavigationMenuItem>
                <Link className={navigationMenuTriggerStyle()} to="/login">
                  Войти
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
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
                    <NavigationMenuItem>
                      <Link to="/admin" className={navigationMenuTriggerStyle()}>
                        Админ Панель
                      </Link>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem className={cn(navigationMenuTriggerStyle(), "cursor-not-allowed text-gray-400 hover:text-gray-400 select-none")}>
                      Админ Панель
                    </NavigationMenuItem>
                  )}
                </>
              )}
              <NavigationMenuItem>
                <Cart />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button
                  className={navigationMenuTriggerStyle()}
                  onClick={logout}
                >
                  Выйти
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link className={navigationMenuTriggerStyle()} to="/profile">
                  Профиль
                </Link>
              </NavigationMenuItem>
            </>
          )}</NavigationMenuList>
    </NavigationMenu>
  );
};
export default Nav;
