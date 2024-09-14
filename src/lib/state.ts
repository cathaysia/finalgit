import type { BranchInfo, FileStatus, FileTree, TagInfo } from "@/bindings";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AppState {
    repo_path?: string | null;
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
        repo_path: null,
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
    branchListener: boolean;
    stageListener: boolean;
    refreshBranch: () => void;
    refreshStage: () => void;
}

export const useRefreshRequest = create<RefreshRequest>()(
    devtools((set) => ({
        branchListener: false,
        stageListener: false,
        refreshBranch: () =>
            set((s) => ({ branchListener: !s.branchListener })),
        refreshStage: () => set((s) => ({ stageListener: !s.stageListener })),
    })),
);
