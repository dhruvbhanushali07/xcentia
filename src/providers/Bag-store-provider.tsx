"use client";

import { type ReactNode, createContext, useState, useContext } from "react";
import { useStore } from "zustand";

import { type BagStore, createBagStore } from "@/stores/Bag-store";

export type BagStoreApi = ReturnType<typeof createBagStore>;

export const BagStoreContext = createContext<BagStoreApi | undefined>(
	undefined,
);

export interface BagStoreProviderProps {
	children: ReactNode;
}

export const BagStoreProvider = ({ children }: BagStoreProviderProps) => {
	const [store] = useState(() => createBagStore());
	return (
		<BagStoreContext.Provider value={store}>
			{children}
		</BagStoreContext.Provider>
	);
};

export const useBagStore = <T,>(selector: (store: BagStore) => T): T => {
	const bagStoreContext = useContext(BagStoreContext);
	if (!bagStoreContext) {
		throw new Error(`useBagStore must be used within BagStoreProvider`);
	}

	return useStore(bagStoreContext, selector);
};
