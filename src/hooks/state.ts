import { LazyStore } from '@tauri-apps/plugin-store';
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
    return (await store.get<string>(k)) || null;
  },
  removeItem: async k => {
    const store = getSettingsStore();
    await store.delete(k);
  },
};

export interface AppState {
  repoPath?: string;
  lang: string;
  useEmoji: boolean;
  project: string[];
  isDiffView: boolean;
  setLang: (lang: string) => void;
  setUseEmoji: (use: boolean) => void;
  setRepoPath: (isOpened: string) => void;
  setProject: (project: string[]) => void;
  setIsDiffView: (enabled: boolean) => void;
  toggleDiffView: () => void;
}

export const useAppState = create<AppState>()(
  persist(
    set => ({
      repoPath: undefined,
      lang: 'en_US',
      useEmoji: true,
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
      setLang: (lang: string) => set({ lang: lang }),
      setUseEmoji: (lang: boolean) => set({ useEmoji: lang }),
      setIsDiffView: (enabled: boolean) => set({ isDiffView: enabled }),
      toggleDiffView: () => set(s => ({ isDiffView: !s.isDiffView })),
    }),
    {
      name: 'app',
      storage: createJSONStorage(() => storeStorage),
      partialize: s => ({
        repoPath: s.repoPath,
        lang: s.lang,
        useEmoji: s.useEmoji,
      }),
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
  current: string;
  promptList: Map<string, string>;
  ollamaEndpoint: string;
  ollamaCurrentModel: string | undefined;
  setPrompt: (name: string, prompt: string) => void;
  setCurrent: (name: string) => void;
  setOllamaEndpoint: (endpoint: string) => void;
  setOllamaModel: (model: string) => void;
}

const defaultPrompt = new Map();
defaultPrompt.set('Conventional Commits', SHORT_DEFAULT_COMMIT_TEMPLATE);
defaultPrompt.set(
  'GitMoji',
  ` Please could you write a commit message for my changes.
Only respond with the commit message. Don't give any notes.
Explain what were the changes and why the changes were done.
Focus the most important changes.

The commit message shoule following this format:
<intention> [scope?][:?] <message>

intention: The intention you want to express with the commit, using an emoji from the gitmoji. Either in the :shortcode: or unicode format.
scope: An optional string that adds contextual information for the scope of the change.
message: A brief explanation of the change.

Here is my git diff:
\`\`\`
%{diff}
\`\`\`
`,
);

export const useAiState = create<AiStateProps>()(
  persist(
    set => ({
      current: 'Conventional Commits',
      promptList: defaultPrompt,
      ollamaEndpoint: 'http://127.0.0.1:11434',
      ollamaCurrentModel: undefined,
      setCurrent: (name: string) => set({ current: name }),
      setPrompt: (name: string, prompt: string) =>
        set(s =>
          (() => {
            const promptList = s.promptList;
            promptList.set(name, prompt);
            return { promptList: promptList };
          })(),
        ),
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
        prompt: s.current,
        ollamaEndpoint: s.ollamaEndpoint,
      }),
    },
  ),
);

function getSettingsStore() {
  return new LazyStore('settings.json');
}