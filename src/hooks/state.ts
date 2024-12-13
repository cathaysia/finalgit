import { LazyStore } from '@tauri-apps/plugin-store';
import { enableMapSet } from 'immer';
import superjson from 'superjson';
import { create } from 'zustand';
import { type StorageValue, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

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

const tauriStore = new LazyStore('settings.json');

export interface AiConfig {
  current: 'ollama' | 'openai';
  ollama: {
    endpoint: string;
    model: string;
  };
  openai: {
    endpoint: string;
    key: string;
  };
}

export interface AppState {
  repoPath?: string;
  lang: string;
  useEmoji: boolean;
  projects: Set<string>;
  renderMarkdown: boolean;
  commitHead: string | null;
  signoff: boolean;
  aiConfig: AiConfig;
  promptList: Map<string, string>;
  currentPrompt: string;
  setCurrentAi: (ai: 'ollama' | 'openai') => void;
  setOpenAiKey: (key: string) => void;
  setOpenAiEndpoint: (endpoint: string) => void;
  setOllamaModel: (model: string) => void;
  setOllamaEndpoint: (endpoint: string) => void;
  setLang: (lang: string) => void;
  setRenderMarkdown: (enable: boolean) => void;
  setCommitHead: (head: string | null) => void;
  setUseEmoji: (useEmoji: boolean) => void;
  setRepoPath: (isOpened: string) => void;
  setSignoff: (signoff: boolean) => void;
  removeRepoPath: (path: string) => void;
  setAiConfig: (aiConfig: AiConfig) => void;
  setPrompt: (name: string, value: string) => void;
  setCurrentPrompt: (name: string) => void;
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

export const useAppState = create<AppState>()(
  persist(
    immer(set => ({
      repoPath: undefined,
      lang: 'en_US',
      useEmoji: true,
      renderMarkdown: true,
      commitHead: null,
      projects: new Set<string>(),
      signoff: true,
      aiConfig: {
        current: 'ollama',
        ollama: {
          endpoint: 'http://127.0.0.1:11434',
          model: '',
        },
        openai: {
          endpoint: '',
          key: '',
        },
      },
      promptList: defaultPrompt,
      currentPrompt: 'Conventional Commits',
      setOpenAiKey: (key: string) =>
        set(s => {
          s.aiConfig.openai.key = key;
        }),
      setOpenAiEndpoint: (endpoint: string) =>
        set(s => {
          s.aiConfig.openai.endpoint = endpoint;
        }),
      setCurrentAi: (model: 'ollama' | 'openai') =>
        set(s => {
          s.aiConfig.current = model;
        }),
      setOllamaModel: (model: string) =>
        set(s => {
          s.aiConfig.ollama.model = model;
        }),
      setOllamaEndpoint: (endpoint: string) =>
        set(s => {
          s.aiConfig.ollama.endpoint = endpoint;
        }),
      setRenderMarkdown: (enable: boolean) => set({ renderMarkdown: enable }),
      setCommitHead: (head: string | null) => set({ commitHead: head }),
      setRepoPath: (repoPath: string) => {
        set(s => {
          s.repoPath = repoPath;
          s.commitHead = null;
          s.projects.add(repoPath);
        });
      },
      setLang: (lang: string) => set({ lang: lang }),
      setUseEmoji: (useEmoji: boolean) => set({ useEmoji: useEmoji }),
      setSignoff: (signoff: boolean) => set({ signoff: signoff }),
      removeRepoPath: (path: string) => {
        set(s => {
          s.projects.delete(path);
        });
      },
      setAiConfig: (aiConfig: AiConfig) => set({ aiConfig: aiConfig }),
      setPrompt: (name: string, value: string) => {
        set(s => {
          s.promptList.set(name, value);
        });
      },
      setCurrentPrompt: (name: string) => {
        set(s => {
          if (!s.promptList.has(name)) {
            return;
          }
          s.currentPrompt = name;
        });
      },
    })),
    {
      name: 'app',
      storage: {
        getItem: async name => {
          const str = await tauriStore.get<string>(name);
          if (!str) return null;
          return superjson.parse<StorageValue<AppState>>(str);
        },
        setItem: async (name, value) => {
          const str = superjson.stringify(value);
          await tauriStore.set(name, str);
        },
        removeItem: async name => await tauriStore.delete(name),
      },
      // @ts-expect-error: no error
      partialize: s => ({
        repoPath: s.repoPath,
        lang: s.lang,
        projects: s.projects,
        useEmoji: s.useEmoji,
        renderMarkdown: s.renderMarkdown,
        signoff: s.signoff,
        aiConfig: s.aiConfig,
        promptList: s.promptList,
      }),
    },
  ),
);
