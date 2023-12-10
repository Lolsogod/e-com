import { verify } from "jsonwebtoken";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
    console.log("parsing...")
  const info = await verify(token, process.env.SECRET || "123");
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
      login: (token) => {
        set((state) => ({
          ...state,
          token,
          info: { ...state.info, ...parseToken(token) },
        }));
      },
      logout: () => {/**TODO: логаут */},
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
