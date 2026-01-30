import { Button } from '@/components/ui/button';
import { useAppStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';
import { shadcnTheme } from '@/ui/codemirror/theme/shadcn';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { FaMagic } from 'react-icons/fa';

import { commands } from '@/bindings';
import { refreshChanges, refreshHistory, useChanges } from '@/hooks/use-query';
import { AiKind, type AiProps, generateCommit } from '@/lib/ai';
import NOTIFY from '@/lib/notify';
import { useQuery } from '@tanstack/react-query';
import { error } from '@tauri-apps/plugin-log';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { isMatching } from 'ts-pattern';

export interface CommiterProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  files?: string[];
  onCancel: () => void;
}
export function CommitCommit({ className, onCancel, ...props }: CommiterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [commitMsg, setCommitMsg] = useState<string>('');
  const aiConfig = useAppStore(s => s.aiConfig);
  const t = useTranslations();

  const [abort, setAbort] = useState<AbortController | null>(null);
  const [repoPath, signoff, setCommitHead] = useAppStore(s => [
    s.repoPath,
    s.signoff,
    s.setCommitHead,
  ]);
  const [current, promptList] = useAppStore(s => [
    s.currentPrompt,
    s.promptList,
  ]);
  const prompt = promptList.get(current) || '';
  const { data: changes } = useChanges();

  useEffect(() => {
    setCommitMsg('');
  }, [repoPath]);

  const { data: userInfo } = useSignoffInfo();

  useEffect(() => {
    if (!changes) {
      return;
    }
    if (changes.length === 0) {
      setIsLoading(false);
      setCommitMsg('');
    }
  }, [changes]);

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex flex-col gap-2">
        <CodeMirror
          placeholder={t('commiter.commit_summary')}
          className={cn(
            'h-40 overflow-x-hidden overflow-y-scroll rounded border p-2 pr-4 text-base',
          )}
          autoFocus
          value={commitMsg}
          theme={shadcnTheme}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
          }}
          extensions={[EditorView.lineWrapping]}
          onChange={value => setCommitMsg(value)}
        />
        {isLoading ? (
          <Button
            variant={'destructive'}
            onClick={() => {
              abort?.abort();
              setAbort(null);
            }}
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('commiter.abort')}
          </Button>
        ) : (
          <Button
            onClick={async () => {
              if (!repoPath) {
                return;
              }
              setIsLoading(true);
              const value = await commands?.diffCache(repoPath, []);
              if (value.status === 'error') {
                NOTIFY.error(value.error);
                setIsLoading(false);
                return;
              }

              let aiProps: AiProps;
              let model = '';

              if (aiConfig.current === AiKind.OpenAiCompatible) {
                aiProps = {
                  kind: AiKind.OpenAiCompatible,
                  args: {
                    name: aiConfig.openAiCompatible.name,
                    apiKey: aiConfig.openAiCompatible.key,
                    // biome-ignore lint/style/useNamingConvention: <explanation>
                    baseURL: aiConfig.openAiCompatible.endpoint,
                  },
                };
                model = aiConfig.openAiCompatible.model;
              } else {
                aiProps = {
                  kind: AiKind.OpenAi,
                  args: {
                    apiKey: aiConfig.openai.key,
                    // biome-ignore lint/style/useNamingConvention: <explanation>
                    baseURL: aiConfig.openai.endpoint,
                  },
                };
                model = aiConfig.openai.model;
              }

              try {
                await generateCommit(
                  value.data,
                  aiProps,
                  prompt,
                  model,
                  (text, controller) => {
                    setCommitMsg(text);
                    setAbort(controller);
                  },
                );
              } catch (e) {
                error(`${e}`);
              }

              if (signoff && userInfo?.userName && userInfo.userEmail) {
                setCommitMsg(s => {
                  if (s.length === 0) {
                    return '';
                  }
                  return `${s}\n\nSigned-off-by: ${userInfo.userName} ${userInfo.userEmail}`;
                });
              }

              setIsLoading(false);
            }}
          >
            <FaMagic className="mr-2 h-4 w-4" />
            {t('commiter.generate_message')}
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          className="w-4/5"
          disabled={commitMsg.trim().length === 0}
          onClick={async () => {
            if (!repoPath) {
              return;
            }
            const v = await commands?.commitCreate(repoPath, commitMsg);
            if (v.status === 'error') {
              NOTIFY.error(v.error);
              return;
            }

            refreshChanges();
            refreshHistory();
            const head = await commands.repoGetHead(repoPath);
            if (isMatching({ status: 'ok' }, head)) {
              setCommitHead(head.data.oid);
            }
          }}
        >
          {t('commiter.commit')}
        </Button>
        <Button
          className="w-1/5"
          variant={'outline'}
          onClick={() => {
            setCommitMsg('');
            onCancel();
          }}
        >
          {t('Cancel')}
        </Button>
      </div>
    </div>
  );
}

function useSignoffInfo() {
  const repoPath = useAppStore(s => s.repoPath);
  return useQuery({
    queryKey: [repoPath, 'signoff'],
    queryFn: async () => {
      if (!repoPath) {
        throw Error('empty repoPath!');
      }
      const userName = await commands.configGet(repoPath, 'user.name');
      const email = await commands.configGet(repoPath, 'user.email');

      if (userName.status === 'error' || email.status === 'error') {
        throw Error('queryfailed');
      }

      return {
        userName: userName.data,
        userEmail: email.data,
      };
    },
  });
}
