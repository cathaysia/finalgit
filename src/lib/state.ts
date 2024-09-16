import type { BranchInfo, FileStatus, FileTree, TagInfo } from "@/bindings";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AppState {
    repo_path?: string;
    branches: BranchInfo[];
    tags: TagInfo[];
    changes: FileStatus[];
    files: FileTree[];
    setRepoPath: (isOpened: string) => void;
    setBranches: (branches: BranchInfo[]) => void;
    setTags: (tags: TagInfo[]) => void;
    setChanges: (changes: FileStatus[]) => void;
    setFiles: (files: FileTree[]) => void;
}

export const useAppState = create<AppState>()(
    devtools((set) => ({
        repo_path: undefined,
        branches: [],
        changes: [],
        tags: [],
        files: [],
        setRepoPath: (repo_path: string) => set({ repo_path: repo_path }),
        setBranches: (branches: BranchInfo[]) => set({ branches: branches }),
        setTags: (tags: TagInfo[]) => set({ tags: tags }),
        setChanges: (changes: FileStatus[]) => set({ changes: changes }),
        setFiles: (files: FileTree[]) => set({ files: files }),
    })),
);

export interface RefreshRequest {
    branchListener: number;
    stageListener: number;
    refreshBranch: () => void;
    refreshStage: () => void;
    setBranchListener: (time: number) => void;
    setStageListener: (time: number) => void;
}

export const useRefreshRequest = create<RefreshRequest>()(
    devtools((set) => ({
        branchListener: 0,
        stageListener: 0,
        refreshBranch: () =>
            set((s) => ({ branchListener: s.branchListener + 1 })),
        refreshStage: () =>
            set((s) => ({ stageListener: s.stageListener + 1 })),
        setBranchListener: (time: number) =>
            set(() => ({ branchListener: time })),
        setStageListener: (time: number) =>
            set(() => ({ stageListener: time })),
    })),
);
