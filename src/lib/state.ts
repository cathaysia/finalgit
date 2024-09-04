import { create } from "zustand";
import { BranchInfo, TagInfo } from "./branch";
import { fetchBranchInfo, fetchTagInfo } from "./api";

export interface OpenState {
	isOpened: boolean;
	setIsOpened: (isOpened: boolean) => void;
}

export const useOpenState = create<OpenState>((set) => ({
	isOpened: false,
	setIsOpened: (isOpened: boolean) => set({ isOpened: isOpened }),
}));

export interface BranchState {
	branches: BranchInfo[];
	setBranches: (branches: BranchInfo[]) => void;
	refreshBranches: () => void;
}

export const useBranchState = create<BranchState>((set) => ({
	branches: [],
	setBranches: (branches: BranchInfo[]) => set({ branches: branches }),
	refreshBranches: () => {
		fetchBranchInfo().then((value) => {
			set({ branches: value });
		});
	},
}));

export interface TagState {
	tags: TagInfo[];
	setTags: (tags: TagInfo[]) => void;
	refreshTags: () => void;
}

export const useTagStatte = create<TagState>((set) => ({
	tags: [],
	setTags: (tags: TagInfo[]) => set({ tags: tags }),
	refreshTags: () => {
		fetchTagInfo().then((value) => {
			set({
				tags: value,
			});
		});
	},
}));
