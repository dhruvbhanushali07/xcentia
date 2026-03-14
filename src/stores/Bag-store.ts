import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type BagItem = {
    id: string; 
	variantId: string; // Added variantId to uniquely identify items with different variants
    name: string;
    slug: string;
    price: number;
    quantity: number;
    volume_ml: number;
    image: string;
};

export type BagState = {
    items: BagItem[];
};

export type BagActions = {
    addToBag: (item: BagItem) => void;
    removeFromBag: (itemId: string) => void;
    clearBag: () => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    isItemInBag: (itemId: string) => boolean;
};

export type BagStore = BagState & BagActions;

export const defaultInitState: BagState = {
    items: [],
};

export const createBagStore = (initState: BagState = defaultInitState) => {
    // Added 'get' to the arguments here 
    return createStore<BagStore>()(
        persist(
            (set, get) => ({
                ...initState,
                addToBag: (newItem) =>
                    set((state) => {
                        const existingItem = state.items.find(
                            (item) => item.variantId === newItem.variantId,
                        );
                        if (existingItem) {
                            return {
                                items: state.items.map((item) =>
                                    item.variantId === newItem.variantId
                                        ? {
                                                ...item,
                                                quantity: item.quantity + newItem.quantity,
                                            }
                                        : item,
                                ),
                            };
                        }
                        return { items: [...state.items, newItem] };
                    }),
                removeFromBag: (itemId) =>
                    set((state) => ({
                        items: state.items.filter((item) => item.id !== itemId),
                    })),
                clearBag: () => set({ items: [] }),
                updateQuantity: (itemId, quantity) =>
                    set((state) => ({
                        items: state.items.map((item) =>
                            item.id === itemId
                                ? { ...item, quantity: Math.max(1, quantity) }
                                : item,
                        ),
                    })),
                // This now works because 'get' is defined above
                isItemInBag: (itemId) =>
                    get().items.some((item) => item.id === itemId),
            }),
            {
                name: "bag-storage",
                storage: createJSONStorage(() => localStorage),
            },
        ),
    );
};