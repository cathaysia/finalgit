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
    refreshBranch: () => void;
}

export const useRefreshRequest = create<RefreshRequest>()(
    devtools((set) => ({
        branchListener: false,
        refreshBranch: () =>
            set((s) => ({ branchListener: !s.branchListener })),
    })),
);

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
    file_name: string;
    setContent: (file_name: string, content: number[]) => void;
}

export const useFileContentState = create<FileContentState>()(
    devtools((set) => ({
        content: [],
        file_name: "",
        setContent: (file_name: string, content: number[]) =>
            set({ content: content, file_name: file_name }),
    })),
);
