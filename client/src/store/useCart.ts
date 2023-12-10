import { RouterOutputs } from "@/utils/trpc";
import {create} from "zustand"
import {persist, createJSONStorage} from "zustand/middleware"

type Device = RouterOutputs["device"]["getOne"];
type CartState = {
    items: {
        device: Device,
        uid: number}[]
    addItem: (device: Device) => void
    removeItem: (device: number) => void
    clear: () => void
}

export const useCart = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (device) => set((state) => ({ items: [...state.items, { device, uid: Date.now() }] })),
            removeItem(uid: number) {
                set((state) => ({
                    items: state.items.filter((item) => item.uid !== uid),
                }))
            },
            clear: () => set({ items: [] }),
        }), {
            name: "cart",
            storage: createJSONStorage(() => localStorage),
        }
    )
)