import { create } from "zustand";
import { match } from "ts-pattern";
import { BranchInfo, TagInfo, commands } from "@/bindings";
import { useErrorState } from "./error";
import { devtools } from "zustand/middleware";

export interface OpenState {
	isOpened: boolean;
	setIsOpened: (isOpened: boolean) => void;
}

export const useOpenState = create<OpenState>()(
	devtools((set) => ({
		isOpened: false,
		setIsOpened: (isOpened: boolean) => set({ isOpened: isOpened }),
	})),
);

export interface BranchState {
	branches: BranchInfo[];
	setBranches: (branches: BranchInfo[]) => void;
}

export const useBranchState = create<BranchState>()(
	devtools((set) => ({
		branches: [],
		setBranches: (branches: BranchInfo[]) => set({ branches: branches }),
	})),
);

export interface TagState {
	tags: TagInfo[];
	setTags: (tags: TagInfo[]) => void;
	refreshTags: () => void;
}

export const useTagStatte = create<TagState>()(
	devtools((set) => ({
		tags: [],
		setTags: (tags: TagInfo[]) => set({ tags: tags }),
		refreshTags: () => {
			commands.getTagInfo().then((value) => {
				match(value)
					.with({ status: "ok" }, (v) => {
						set({ tags: v.data });
					})
					.with({ status: "error" }, (err) => {
						console.log(err.error);
					});
			});
		},
	})),
);

export interface CommitState {
	commit: string | null;
	setCommit: (commit: string | null) => void;
}

export const useCommitState = create<CommitState>()(
	devtools((set) => ({
		commit: null,
		setCommit: (commit: string | null) => set({ commit: commit }),
	})),
);

export interface FileContentState {
	content: number[];
	setContent: (content: number[]) => void;
}

export const useFileContentState = create<FileContentState>()(
	devtools((set) => ({
		content: [],
		setContent: (content: number[]) => set({ content: content }),
	})),
);
