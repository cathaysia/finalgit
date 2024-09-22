import type { BranchInfo, FileStatus, FileTree, TagInfo } from '@/bindings';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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
    repoPath?: string;
    branches: BranchInfo[];
    tags: TagInfo[];
    changes: FileStatus[];
    files: FileTree[];
    current?: string;
    setRepoPath: (isOpened: string) => void;
    setBranches: (branches: BranchInfo[]) => void;
    setTags: (tags: TagInfo[]) => void;
    setChanges: (changes: FileStatus[]) => void;
    setFiles: (files: FileTree[]) => void;
    setCurrent: (current: string) => void;
}

export const useAppState = create<AppState>()(
    devtools(set => ({
        repoPath: undefined,
        branches: [],
        changes: [],
        tags: [],
        files: [],
        current: undefined,
        setRepoPath: (repoPath: string) => set({ repoPath: repoPath }),
        setBranches: (branches: BranchInfo[]) => set({ branches: branches }),
        setTags: (tags: TagInfo[]) => set({ tags: tags }),
        setChanges: (changes: FileStatus[]) => set({ changes: changes }),
        setFiles: (files: FileTree[]) => set({ files: files }),
        setCurrent: (current: string) => set({ current: current }),
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
    devtools(set => ({
        branchListener: 0,
        stageListener: 0,
        refreshBranch: () =>
            set(s => ({ branchListener: s.branchListener + 1 })),
        refreshStage: () => set(s => ({ stageListener: s.stageListener + 1 })),
        setBranchListener: (time: number) =>
            set(() => ({ branchListener: time })),
        setStageListener: (time: number) =>
            set(() => ({ stageListener: time })),
    })),
);

export interface AiStateProps {
    prompt: string;
    ollamaEndpoint: string;
    ollamaModel: string[];
    ollamaCurrentModel: string | undefined;
    setPrompt: (prompt: string) => void;
    setOllamaEndpoint: (endpoint: string) => void;
    setOllamaModels: (models: string[]) => void;
    setOllamaModel: (model: string) => void;
}

export const useAiState = create<AiStateProps>()(
    devtools(set => ({
        prompt: SHORT_DEFAULT_COMMIT_TEMPLATE,
        ollamaEndpoint: 'http://127.0.0.1:11434',
        ollamaModel: [],
        ollamaCurrentModel: undefined,
        setPrompt: (prompt: string) => set({ prompt: prompt }),
        setOllamaEndpoint: (endpoint: string) =>
            set({ ollamaEndpoint: endpoint }),
        setOllamaModels: (models: string[]) =>
            set({
                ollamaModel: models,
            }),
        setOllamaModel: (model: string) =>
            set({
                ollamaCurrentModel: model,
            }),
    })),
);
