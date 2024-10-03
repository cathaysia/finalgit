import type { BranchInfo, FileStatus, FileTree, TagInfo } from '@/bindings';
import { Store } from '@tauri-apps/plugin-store';
import { create } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  type StateStorage,
} from 'zustand/middleware';

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

const storeStorage: StateStorage = {
  setItem: async (k, v) => {
    const store = getSettingsStore();
    await store.set(k, v);
  },
  getItem: async k => {
    const store = getSettingsStore();
    return await store.get(k);
  },
  removeItem: async k => {
    const store = getSettingsStore();
    await store.delete(k);
  },
};

export interface AppState {
  head?: string;
  repoPath?: string;
  branches: BranchInfo[];
  tags: TagInfo[];
  changes: FileStatus[];
  files: FileTree[];
  current?: string;
  project: string[];
  isDiffView: boolean;
  setRepoPath: (isOpened: string) => void;
  setBranches: (branches: BranchInfo[]) => void;
  setTags: (tags: TagInfo[]) => void;
  setChanges: (changes: FileStatus[]) => void;
  setFiles: (files: FileTree[]) => void;
  setCurrent: (current: string) => void;
  setProject: (project: string[]) => void;
  setHead: (head: string | undefined) => void;
  setIsDiffView: (enabled: boolean) => void;
  toggleDiffView: () => void;
}

export const useAppState = create<AppState>()(
  persist(
    set => ({
      head: undefined,
      repoPath: undefined,
      branches: [],
      changes: [],
      tags: [],
      files: [],
      current: undefined,
      project: [],
      isDiffView: false,
      setRepoPath: (repoPath: string) => {
        set(s => ({
          repoPath: repoPath,
          projects: (() => {
            const p = s.project;
            return [repoPath, ...p];
          })(),
        }));
      },
      setBranches: (branches: BranchInfo[]) => set({ branches: branches }),
      setTags: (tags: TagInfo[]) => set({ tags: tags }),
      setChanges: (changes: FileStatus[]) => set({ changes: changes }),
      setFiles: (files: FileTree[]) => set({ files: files }),
      setCurrent: (current: string) => set({ current: current }),
      setProject: (project: string[]) => set({ project: project }),
      setHead: (head: string | undefined) => set({ head: head }),
      setIsDiffView: (enabled: boolean) => set({ isDiffView: enabled }),
      toggleDiffView: () => set(s => ({ isDiffView: !s.isDiffView })),
    }),
    {
      name: 'app',
      storage: createJSONStorage(() => storeStorage),
      partialize: s => ({ repoPath: s.repoPath, current: s.current }),
    },
  ),
);

export interface RefreshRequest {
  branchListener: number;
  stageListener: number;
  pushListener: number;
  stashListener: number;
  refreshBranch: () => void;
  refreshStage: () => void;
  refreshPush: () => void;
  refreshStash: () => void;
  setBranchListener: (time: number) => void;
  setStageListener: (time: number) => void;
}

export const useRefreshRequest = create<RefreshRequest>()(
  devtools(set => ({
    branchListener: 0,
    stageListener: 0,
    pushListener: 0,
    stashListener: 0,
    refreshBranch: () => set(s => ({ branchListener: s.branchListener + 1 })),
    refreshStage: () => set(s => ({ stageListener: s.stageListener + 1 })),
    setBranchListener: (time: number) => set(() => ({ branchListener: time })),
    setStageListener: (time: number) => set(() => ({ stageListener: time })),
    refreshPush: () => set(s => ({ pushListener: s.pushListener + 1 })),
    refreshStash: () => set(s => ({ stashListener: s.stashListener + 1 })),
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
  persist(
    set => ({
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
    }),
    {
      name: 'ai',
      storage: createJSONStorage(() => storeStorage),
      partialize: s => ({
        prompt: s.prompt,
        ollamaEndpoint: s.ollamaEndpoint,
      }),
    },
  ),
);

function getSettingsStore() {
  return new Store('settings.bin');
}
