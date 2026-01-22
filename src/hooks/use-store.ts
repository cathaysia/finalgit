import { AiKind } from '@/lib/ai';
import { LazyStore } from '@tauri-apps/plugin-store';
import { enableMapSet } from 'immer';
import superjson from 'superjson';
import { type StorageValue, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn as create } from 'zustand/traditional';

enableMapSet();

const tauriStore = new LazyStore('settings.json');

export const COMMIT_HEAD_PANEL_ID = '__commit_head__';

export interface AiConfig {
  current: AiKind;
  ollama: {
    endpoint: string;
    model: string;
  };
  openai: {
    endpoint: string;
    key: string;
    model: string;
  };
  openAiCompatible: {
    name: string;
    endpoint: string;
    key: string;
    model: string;
  };
}

export interface CommitPanelState {
  id: string;
  name: string;
  baseName: string;
  oid: string;
}

export interface AppStoreProps {
  firstStart: boolean;
  repoPath?: string;
  lang: string;
  useEmoji: boolean;
  projects: Set<string>;
  renderMarkdown: boolean;
  commitHead: string | null;
  commitPanels: CommitPanelState[];
  commitPanelOrder: string[];
  cherryPickQueue: string[];
  signoff: boolean;
  aiConfig: AiConfig;
  promptList: Map<string, string>;
  currentPrompt: string;
  isHydrated: boolean;
  githubApiUrl: string;
  githubToken: string;
  setFirstStart: (firstStart: boolean) => void;
  setGithubToken: (token: string) => void;
  setGithubApiUrl: (url: string) => void;
  setIsHydrated: (s: boolean) => void;
  setCurrentAi: (ai: AiKind) => void;
  setOpenAiCompatibleName: (name: string) => void;
  setOpenAiCompatibleKey: (key: string) => void;
  setOpenAiCompatibleEndpoint: (endpoint: string) => void;
  setOpenAiCompatibleModel: (model: string) => void;
  setOpenAiKey: (key: string) => void;
  setOpenAiEndpoint: (endpoint: string) => void;
  setOpenAiModel: (model: string) => void;
  setOllamaModel: (model: string) => void;
  setOllamaEndpoint: (endpoint: string) => void;
  setLang: (lang: string) => void;
  setRenderMarkdown: (enable: boolean) => void;
  setCommitHead: (head: string | null) => void;
  addCommitPanel: (panel: CommitPanelState) => void;
  addCommitPanelToStart: (panel: CommitPanelState) => void;
  removeCommitPanel: (id: string) => void;
  setCommitPanelOrder: (order: string[]) => void;
  moveCommitPanel: (sourceId: string, targetId: string) => void;
  addCherryPickCommit: (oid: string) => void;
  removeCherryPickCommit: (oid: string) => void;
  clearCherryPickQueue: () => void;
  setUseEmoji: (useEmoji: boolean) => void;
  setRepoPath: (isOpened: string) => void;
  setSignoff: (signoff: boolean) => void;
  removeRepoPath: (path: string) => void;
  setAiConfig: (aiConfig: AiConfig) => void;
  setPrompt: (name: string, value: string) => void;
  setCurrentPrompt: (name: string) => void;
  addRepoPath: (repoPath: string) => void;
}

const defaultPrompt = new Map();
defaultPrompt.set(
  'Conventional Commits',
  `Please could you write a commit message for my changes.
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
`,
);
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

export const useAppStore = create<AppStoreProps>()(
  persist(
    immer(set => ({
      firstStart: true,
      repoPath: undefined,
      lang: 'en',
      useEmoji: true,
      renderMarkdown: true,
      commitHead: null,
      commitPanels: [],
      commitPanelOrder: [COMMIT_HEAD_PANEL_ID],
      cherryPickQueue: [],
      projects: new Set<string>(),
      signoff: true,
      aiConfig: {
        current: AiKind.Ollama,
        ollama: {
          endpoint: 'http://127.0.0.1:11434',
          model: '',
        },
        openai: {
          endpoint: 'https://api.openai.com',
          key: '',
          model: 'gpt-4o',
        },
        openAiCompatible: {
          name: '',
          endpoint: '',
          key: '',
          model: '',
        },
      },
      promptList: defaultPrompt,
      isHydrated: false,
      currentPrompt: 'Conventional Commits',
      githubApiUrl: 'https://api.github.com',
      githubToken: '',
      setFirstStart: (firstStart: boolean) => set({ firstStart: firstStart }),
      setGithubToken: (token: string) => set({ githubToken: token }),
      setGithubApiUrl: (url: string) => set({ githubApiUrl: url }),
      setIsHydrated: s => set({ isHydrated: s }),
      setOpenAiCompatibleName: (name: string) =>
        set(s => {
          s.aiConfig.openAiCompatible.name = name;
        }),
      setOpenAiCompatibleKey: (key: string) =>
        set(s => {
          s.aiConfig.openAiCompatible.key = key;
        }),
      setOpenAiCompatibleEndpoint: (endpoint: string) =>
        set(s => {
          s.aiConfig.openAiCompatible.endpoint = endpoint;
        }),
      setOpenAiCompatibleModel: (model: string) =>
        set(s => {
          s.aiConfig.openAiCompatible.model = model;
        }),
      setOpenAiKey: (key: string) =>
        set(s => {
          s.aiConfig.openai.key = key;
        }),
      setOpenAiEndpoint: (endpoint: string) =>
        set(s => {
          s.aiConfig.openai.endpoint = endpoint;
        }),
      setOpenAiModel: (model: string) =>
        set(s => {
          s.aiConfig.openai.model = model;
        }),
      setCurrentAi: (model: AiKind) =>
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
      addCommitPanel: (panel: CommitPanelState) => {
        set(s => {
          const exists = s.commitPanels.some(item => item.id === panel.id);
          if (!exists) {
            s.commitPanels.push(panel);
            if (!s.commitPanelOrder.includes(panel.id)) {
              const headIndex =
                s.commitPanelOrder.indexOf(COMMIT_HEAD_PANEL_ID);
              if (headIndex === -1) {
                s.commitPanelOrder.push(panel.id);
              } else {
                s.commitPanelOrder.splice(headIndex, 0, panel.id);
              }
            }
          }
        });
      },
      addCommitPanelToStart: (panel: CommitPanelState) => {
        set(s => {
          const exists = s.commitPanels.some(item => item.id === panel.id);
          if (!exists) {
            s.commitPanels.unshift(panel);
            if (!s.commitPanelOrder.includes(panel.id)) {
              s.commitPanelOrder.unshift(panel.id);
            }
          }
        });
      },
      removeCommitPanel: (id: string) => {
        set(s => {
          s.commitPanels = s.commitPanels.filter(item => item.id !== id);
          s.commitPanelOrder = s.commitPanelOrder.filter(item => item !== id);
        });
      },
      setCommitPanelOrder: (order: string[]) =>
        set({ commitPanelOrder: order }),
      moveCommitPanel: (sourceId: string, targetId: string) => {
        set(s => {
          const order = s.commitPanelOrder.slice();
          const from = order.indexOf(sourceId);
          const to = order.indexOf(targetId);
          if (from === -1 || to === -1 || from === to) {
            return;
          }
          order.splice(from, 1);
          const insertAt = from < to ? to - 1 : to;
          order.splice(insertAt, 0, sourceId);
          s.commitPanelOrder = order;
        });
      },
      addCherryPickCommit: (oid: string) => {
        set(s => {
          if (!s.cherryPickQueue.includes(oid)) {
            s.cherryPickQueue.push(oid);
          }
        });
      },
      removeCherryPickCommit: (oid: string) => {
        set(s => {
          s.cherryPickQueue = s.cherryPickQueue.filter(item => item !== oid);
        });
      },
      clearCherryPickQueue: () => set({ cherryPickQueue: [] }),
      addRepoPath: (repoPath: string) => {
        set(s => {
          s.projects.add(repoPath);
        });
      },
      setRepoPath: (repoPath: string) => {
        set(s => {
          s.repoPath = repoPath;
          s.commitHead = null;
          s.commitPanels = [];
          s.commitPanelOrder = [COMMIT_HEAD_PANEL_ID];
          s.cherryPickQueue = [];
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
          if (typeof window === 'undefined') {
            return null;
          }
          const str = await tauriStore.get<string>(name);
          if (!str) return null;
          return superjson.parse<StorageValue<AppStoreProps>>(str);
        },
        setItem: async (name, value) => {
          if (typeof window === 'undefined') {
            return null;
          }
          const str = superjson.stringify(value);
          await tauriStore.set(name, str);
        },
        removeItem: async name => await tauriStore.delete(name),
      },
      onRehydrateStorage: s => {
        return () => s.setIsHydrated(true);
      },
      // @ts-expect-error: no error
      partialize: s => ({
        firstStart: s.firstStart,
        repoPath: s.repoPath,
        lang: s.lang,
        ghUrl: s.githubApiUrl,
        ghToken: s.githubToken,
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
