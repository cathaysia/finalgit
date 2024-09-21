import type { BranchInfo, FileStatus, FileTree, TagInfo } from "@/bindings";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const SHORT_DEFAULT_COMMIT_TEMPLATE = `Please could you write a commit message for my changes.
Only respond with the commit message. Don't give any notes.
Explain what were the changes and why the changes were done.
Focus the most important changes.
Use the present tense.
Use a semantic commit prefix.
Hard wrap lines at 72 characters.
Ensure the title is only 50 characters.
Do not start any lines with the hash symbol.

Here is my git diff:
\`\`\`
%{diff}
\`\`\`
`;

export interface AppState {
    repo_path?: string;
    branches: BranchInfo[];
    tags: TagInfo[];
    changes: FileStatus[];
    files: FileTree[];
    ollama_endpoint: string;
    ai_prompt: string;
    setRepoPath: (isOpened: string) => void;
    setBranches: (branches: BranchInfo[]) => void;
    setTags: (tags: TagInfo[]) => void;
    setChanges: (changes: FileStatus[]) => void;
    setFiles: (files: FileTree[]) => void;
    setOllamaEndpoint: (endpoint: string) => void;
    setPrompt: (prompt: string) => void;
}

export const useAppState = create<AppState>()(
    devtools((set) => ({
        repo_path: undefined,
        branches: [],
        changes: [],
        tags: [],
        files: [],
        ollama_endpoint: "http://127.0.0.1:11434",
        ai_prompt: SHORT_DEFAULT_COMMIT_TEMPLATE,
        setRepoPath: (repo_path: string) => set({ repo_path: repo_path }),
        setBranches: (branches: BranchInfo[]) => set({ branches: branches }),
        setTags: (tags: TagInfo[]) => set({ tags: tags }),
        setChanges: (changes: FileStatus[]) => set({ changes: changes }),
        setFiles: (files: FileTree[]) => set({ files: files }),
        setOllamaEndpoint: (endpoint: string) =>
            set({ ollama_endpoint: endpoint }),
        setPrompt: (prompt: string) =>
            set({
                ai_prompt: prompt,
            }),
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
