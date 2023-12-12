import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { useCart } from "./useCart";
type UserInfo = {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
};
type AuthState = {
  info: UserInfo;
  token: string;
  login: (token: string) => void;
  logout: () => void;
};

const parseToken = async (token: string) => {
  const info = await jwtDecode(token);
  return info as UserInfo;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      info: {
        id: "",
        email: "",
        role: "USER",
      },
      token: "",
      login: async (token) => {
        useCart.getState().clear()
        const userInfo = await parseToken(token);
        set((state) => ({
          ...state,
          token,
          info: { ...state.info, ...userInfo },
        }));
      },
      logout: () => {
        useCart.getState().clear()
        set({
          info: {
            id: "",
            email: "",
            role: "USER",
          },
          token: "",
        });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
