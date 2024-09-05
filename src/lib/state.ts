import { create } from "zustand";
import { match } from "ts-pattern";
import { BranchInfo, TagInfo, commands } from "@/bindings";
import { useErrorState } from "./error";

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
		commands.getBranchInfo().then((value) => {
			match(value)
				.with({ status: "ok" }, (v) => {
					set({ branches: v.data });
				})
				.with({ status: "error" }, (e) => {
					console.log(e);
				});
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
		commands.getTagInfo().then((value) => {
			match(value)
				.with({ status: "ok" }, (v) => {
					set({ tags: v.data });
				})
				.with({ status: "error" }, (err) => {
					console.log(err);
				});
		});
	},
}));

export interface CommitState {
	commit: string | null;
	setCommit: (commit: string | null) => void;
}

export const useCommitState = create<CommitState>((set) => ({
	commit: null,
	setCommit: (commit: string | null) => set({ commit: commit }),
}));
