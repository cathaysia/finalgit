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

export interface ChangeItem {
    checked: boolean;
    status: number;
}

export interface ChangeState {
    changes: Map<string, ChangeItem>;
    selectChange: (file_name: string) => void;
    excludeChange: (file_name: string) => void;
    clearChanges: () => void;
    selectAll: () => void;
    excludeAll: () => void;
    extend: (state: FileStatus[]) => void;
}

export const useChangeState = create<ChangeState>()(
    devtools((set) => ({
        changes: new Map(),
        selectChange: (file_name: string) =>
            set((s) => {
                const v = s.changes;
                const b = v.get(file_name);
                if (b) {
                    b.checked = true;
                    v.set(file_name, b);
                }
                return { changes: v };
            }),
        excludeChange: (file_name: string) =>
            set((s) => {
                const v = s.changes;
                const b = v.get(file_name);
                if (b) {
                    b.checked = false;
                    v.set(file_name, b);
                }
                return { changes: v };
            }),
        clearChanges: () => set(() => ({ changes: new Map() })),
        extend: (state: FileStatus[]) =>
            set((s) => {
                const res = s.changes;
                state.forEach((val) => {
                    if (res.has(val.path)) {
                        return;
                    }
                    res.set(val.path, {
                        checked: false,
                        status: val.status,
                    });
                });
                return {};
            }),
        selectAll: () =>
            set((s) => {
                const res = s.changes;
                res.forEach((item) => {
                    item.checked = true;
                });
                return { changes: res };
            }),
        excludeAll: () =>
            set((s) => {
                const res = s.changes;
                res.forEach((item) => {
                    item.checked = false;
                });
                return { changes: res };
            }),
    })),
);
