import { RouterOutputs, trpc } from "@/utils/trpc";
import {create} from "zustand"
import {persist, createJSONStorage} from "zustand/middleware"

type Flags = RouterOutputs["feature"]["get"];
type CartState = {
    flags: Flags | undefined,
    setFlags: (flags: Flags) => void
}

export const useFlags = create<CartState>()(
    persist(
        (set) => ({
           flags: undefined,
           setFlags: (newFlags) => set(() => ({ flags: newFlags })),
        }
    ), {
        name: "flags",
        storage: createJSONStorage(() => localStorage),
    }
))