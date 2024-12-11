import { AiKind } from '@/lib/ai';
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

interface AiConfig {
  ollama: {
    endpoint: string;
    model: string;
  };
  openai: {
    endpoint: string;
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
  aiKind: AiKind;
  aiConfig: AiConfig;
  promptList: Map<string, string>;
  currentPrompt: string;
  setLang: (lang: string) => void;
  setRenderMarkdown: (enable: boolean) => void;
  setCommitHead: (head: string | null) => void;
  setUseEmoji: (useEmoji: boolean) => void;
  setRepoPath: (isOpened: string) => void;
  setSignoff: (signoff: boolean) => void;
  removeRepoPath: (path: string) => void;
  setAiKind: (kind: AiKind) => void;
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
      aiKind: AiKind.Ollama,
      aiConfig: {
        ollama: {
          endpoint: '',
          model: '',
        },
        openai: {
          endpoint: '',
        },
      },
      promptList: defaultPrompt,
      currentPrompt: 'Conventional Commits',
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
      setAiKind: (kind: AiKind) => set({ aiKind: kind }),
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
        aiKind: s.aiKind,
        aiConfig: s.aiConfig,
        promptList: s.promptList,
      }),
    },
  ),
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

export const useAiState = create<AiStateProps>()(
  persist(
    immer(set => ({
      current: 'Conventional Commits',
      promptList: defaultPrompt,
      ollamaEndpoint: 'http://127.0.0.1:11434',
      ollamaCurrentModel: '',
      setCurrent: (name: string) => set({ current: name }),
      setPrompt: (name: string, prompt: string) =>
        set(s => {
          s.promptList.set(name, prompt);
        }),
      setOllamaEndpoint: (endpoint: string) =>
        set({ ollamaEndpoint: endpoint }),
      setOllamaModel: (model: string) =>
        set({
          ollamaCurrentModel: model,
        }),
    })),
    {
      name: 'ai',
      partialize: s => ({
        prompt: s.current,
        ollamaEndpoint: s.ollamaEndpoint,
        ollamaCurrentModel: s.ollamaCurrentModel,
      }),
    },
  ),
);
