import { LazyStore } from '@tauri-apps/plugin-store';
import { enableMapSet, produce } from 'immer';
import { create } from 'zustand';
import {
  type StateStorage,
  createJSONStorage,
  devtools,
  persist,
} from 'zustand/middleware';

enableMapSet();

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
  projects: string[];
  renderMarkdown: boolean;
  commitHead: string | null;
  setLang: (lang: string) => void;
  setRenderMarkdown: (enable: boolean) => void;
  setCommitHead: (head: string | null) => void;
  setUseEmoji: (useEmoji: boolean) => void;
  setRepoPath: (isOpened: string) => void;
}

export const useAppState = create<AppState>()(
  persist(
    set => ({
      repoPath: undefined,
      lang: 'en_US',
      useEmoji: true,
      renderMarkdown: true,
      commitHead: null,
      projects: [],
      setRenderMarkdown: (enable: boolean) => set({ renderMarkdown: enable }),
      setCommitHead: (head: string | null) => set({ commitHead: head }),
      setRepoPath: (repoPath: string) => {
        set(
          produce(draft => {
            draft.repoPath = repoPath;
            draft.commitHead = null;
            if (!draft.projects.includes(repoPath)) {
              draft.projects.push(repoPath);
            }
          }),
        );
      },
      setLang: (lang: string) => set({ lang: lang }),
      setUseEmoji: (useEmoji: boolean) => set({ useEmoji: useEmoji }),
    }),
    {
      name: 'app',
      storage: createJSONStorage(() => storeStorage),
      partialize: s => ({
        repoPath: s.repoPath,
        lang: s.lang,
        projects: s.projects,
        useEmoji: s.useEmoji,
        renderMarkdown: s.renderMarkdown,
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
  ollamaCurrentModel: string;
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
      ollamaCurrentModel: '',
      setCurrent: (name: string) => set({ current: name }),
      setPrompt: (name: string, prompt: string) =>
        set(
          produce(draft => {
            draft.promptList.set(name, prompt);
          }),
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
        ollamaCurrentModel: s.ollamaCurrentModel,
      }),
    },
  ),
);

function getSettingsStore() {
  return new LazyStore('settings.json');
}
