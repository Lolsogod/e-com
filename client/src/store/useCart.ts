import { RouterOutputs } from "@/utils/trpc";
import {create} from "zustand"
import {persist, createJSONStorage} from "zustand/middleware"

type Device = RouterOutputs["device"]["getOne"];
type CartState = {
    items: Device[]
    addItem: (device: Device) => void
    removeItem: (device: Device) => void
    clear: () => void
}

export const useCart = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (device) => set((state) => ({ items: [...state.items, device] })),
            removeItem(device) {
                set((state) => ({
                    items: state.items.filter((item) => item!.id !== device!.id),
                }))
            },
            clear: () => set({ items: [] }),
        }), {
            name: "cart",
            storage: createJSONStorage(() => localStorage),
        }
    )
)