import { create } from "zustand";

export interface ErrorState {
	err: string | null;
	setError: (err: string) => void;
	clearError: () => void;
}

export const useErrorState = create<ErrorState>((set) => ({
	err: null,
	setError: (err: string) => set({ err: err }),
	clearError: () => set({ err: null }),
}));
