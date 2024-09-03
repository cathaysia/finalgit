import { create } from "zustand";

export interface OpenState {
	isOpened: boolean;
	setIsOpened: (isOpened: boolean) => void;
}

export const useOpenState = create<OpenState>((set) => ({
	isOpened: false,
	setIsOpened: (isOpened: boolean) => set({ isOpened: isOpened }),
}));
