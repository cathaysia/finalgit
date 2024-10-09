import { Store } from '@tauri-apps/plugin-store';
import { create } from 'zustand';
import {
  type StateStorage,
  createJSONStorage,
  devtools,
  persist,
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
  repoPath?: string;
  project: string[];
  isDiffView: boolean;
  setRepoPath: (isOpened: string) => void;
  setProject: (project: string[]) => void;
  setIsDiffView: (enabled: boolean) => void;
  toggleDiffView: () => void;
}

export const useAppState = create<AppState>()(
  persist(
    set => ({
      repoPath: undefined,
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
      setProject: (project: string[]) => set({ project: project }),
      setIsDiffView: (enabled: boolean) => set({ isDiffView: enabled }),
      toggleDiffView: () => set(s => ({ isDiffView: !s.isDiffView })),
    }),
    {
      name: 'app',
      storage: createJSONStorage(() => storeStorage),
      partialize: s => ({ repoPath: s.repoPath }),
    },
  ),
);

export interface RefreshRequest {
  pushListener: number;
  refreshPush: () => void;
}

export const useRefreshRequest = create<RefreshRequest>()(
  devtools(set => ({
    pushListener: 0,
    refreshPush: () => set(s => ({ pushListener: s.pushListener + 1 })),
  })),
);

export interface AiStateProps {
  prompt: string;
  ollamaEndpoint: string;
  ollamaCurrentModel: string | undefined;
  setPrompt: (prompt: string) => void;
  setOllamaEndpoint: (endpoint: string) => void;
  setOllamaModel: (model: string) => void;
}

export const useAiState = create<AiStateProps>()(
  persist(
    set => ({
      prompt: SHORT_DEFAULT_COMMIT_TEMPLATE,
      ollamaEndpoint: 'http://127.0.0.1:11434',
      ollamaCurrentModel: undefined,
      setPrompt: (prompt: string) => set({ prompt: prompt }),
      setOllamaEndpoint: (endpoint: string) =>
        set({ ollamaEndpoint: endpoint }),
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
