'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { shadcnTheme } from '@/stories/codemirror/theme/shadcn';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { useTranslation } from 'react-i18next';
import { FaMagic } from 'react-icons/fa';
import { VscDiff } from 'react-icons/vsc';
import { VscGitStash } from 'react-icons/vsc';

import { type FileStatus, commands } from '@/bindings';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { refreshChanges, refreshHistory, useChanges } from '@/hooks/query';
import { useAiState, useAppState } from '@/hooks/state';
import { AiKind, generateCommit } from '@/lib/ai';
import GitFileStatus from '@/lib/git-file-status';
import NOTIFY from '@/lib/notify';
import { debug } from '@tauri-apps/plugin-log';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { VscDiscard } from 'react-icons/vsc';
import { isMatching, match } from 'ts-pattern';

export interface CommiterProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  files?: string[];
  changeSet: FileStatus[];
}

export default function Commiter({
  className,
  changeSet,
  ...props
}: CommiterProps) {
  const [abort, setAbort] = useState<AbortController | null>(null);
  const [isCommiting, setIsCommiting] = useState(false);
  const t = useTranslation().t;
  const [repoPath, signoff, setCommitHead] = useAppState(s => [
    s.repoPath,
    s.signoff,
    s.setCommitHead,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [current, promptList] = useAppState(s => [
    s.currentPrompt,
    s.promptList,
  ]);
  const [currentModel] = useAiState(s => [s.ollamaCurrentModel]);
  const prompt = promptList.get(current) || '';

  const [userInfo, setUserInfo] = useState({
    userName: '',
    userEmail: '',
  });

  useEffect(() => {
    if (!repoPath) {
      return;
    }
    (async () => {
      const userName = await commands.gitGetConfig(repoPath, 'user.name');
      const email = await commands.gitGetConfig(repoPath, 'user.email');

      if (
        isMatching({ status: 'error' }, userName) ||
        isMatching({ status: 'error' }, email)
      ) {
        return;
      }

      setUserInfo({ userName: userName.data, userEmail: email.data });
    })();
  }, [repoPath]);

  useHotkeys(
    'Escape',
    () => {
      setIsCommiting(false);
    },
    {
      preventDefault: true,
    },
  );

  const [commitMsg, setCommitMsg] = useState<string>('');

  useEffect(() => {
    setCommitMsg('');
  }, [repoPath]);

  async function startCommit() {
    if (!repoPath) {
      return;
    }
    const hasIndexed = changeSet
      .map(item => GitFileStatus.isIndexed(item.status))
      .reduce((l, r) => l || r);
    if (!hasIndexed) {
      const allfiles = changeSet.filter(
        item => !GitFileStatus.isConflicted(item.status),
      );
      if (allfiles.length === 0) {
        return;
      }
      const res = await commands?.stageAddFiles(repoPath, allfiles);
      if (isMatching({ status: 'ok' }, res)) {
        refreshChanges();
      } else {
        NOTIFY.error(res.error);
        return;
      }
    }
    setIsCommiting(true);
  }

  async function savePatch() {
    const path = await save({
      title: t('workspace.patch_save_path'),
      defaultPath: repoPath,
      canCreateDirectories: true,
    });
    if (path === null || !repoPath) {
      return;
    }
    const res = await commands?.createPatch(repoPath);
    match(res)
      .with({ status: 'ok' }, async v => {
        await writeTextFile(path, v.data);
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
    debug(`save patch file to ${path}`);
  }

  async function discardChanges() {
    if (!repoPath) {
      return;
    }

    const wtFiles = changeSet.filter(
      item => !GitFileStatus.isIndexed(item.status),
    );
    const indexFiles = changeSet.filter(item =>
      GitFileStatus.isIndexed(item.status),
    );

    const res = await (async () => {
      if (wtFiles.length !== 0) {
        return await commands.stageRestoreFiles(repoPath, wtFiles, null);
      }

      return await commands.stageRestoreFiles(repoPath, indexFiles, null);
    })();

    match(res)
      .with({ status: 'ok' }, () => {
        refreshChanges();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }

  async function stashFiles() {
    if (!repoPath) {
      return;
    }
    const res = await commands?.stashSave(repoPath, null);
    match(res)
      .with({ status: 'ok' }, async _ => {
        refreshChanges();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
    debug('save stash');
  }

  const { data: changes } = useChanges();
  useEffect(() => {
    if (!changes) {
      return;
    }
    if (changes.length === 0) {
      setIsCommiting(false);
      setIsLoading(false);
    }
  }, [changes]);

  if (!isCommiting) {
    return (
      <div className={cn('flex gap-2', className)}>
        <Button
          className="w-full"
          disabled={changeSet.length === 0}
          onClick={startCommit}
        >
          {t('commiter.start_commit')}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={changeSet.length === 0}>
            <Button variant={'ghost'}>
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={savePatch}>
                <VscDiff className="mr-2 h-4 w-4" />
                {t('workspace.generate_patch')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={stashFiles}>
                <VscGitStash className="mr-2 h-4 w-4" />
                {t('workspace.stash')}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={discardChanges}
              >
                <VscDiscard className="mr-2 h-4 w-4" />
                {t('workspace.discard')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      <div className="flex flex-col gap-2">
        <CodeMirror
          placeholder={t('commiter.commit_summary')}
          className={cn(
            'h-40 overflow-x-hidden overflow-y-scroll rounded border p-2 pr-4 text-base',
            'border-neutral-200 text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
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
          onKeyUp={e => {
            if (e.key === 'Escape') {
              setIsCommiting(false);
            }
          }}
        />
        <Button
          variant={isLoading ? 'destructive' : 'default'}
          onClick={async () => {
            if (isLoading) {
              abort?.abort();
              setAbort(null);
            }
            if (!repoPath) {
              return;
            }
            setIsLoading(true);
            const res = await commands?.createPatch(repoPath);
            match(res)
              .with({ status: 'ok' }, async value => {
                if (currentModel === undefined) {
                  return;
                }
                try {
                  await generateCommit(
                    value.data,
                    {
                      kind: AiKind.Ollama,
                    },
                    prompt,
                    currentModel,
                    (text, controller) => {
                      setCommitMsg(text);
                      setAbort(controller);
                    },
                  );
                } catch (_) {
                  //
                }

                if (signoff) {
                  setCommitMsg(s => {
                    return `${s}\n\nSigned-off-by: ${userInfo.userName} ${userInfo.userEmail}`;
                  });
                }

                setIsLoading(false);
              })
              .with({ status: 'error' }, err => {
                NOTIFY.error(err.error);
              });
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('commiter.abort')}
            </>
          ) : (
            <>
              <FaMagic className="mr-2 h-4 w-4" />
              {t('commiter.generate_message')}
            </>
          )}
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          className="w-4/5"
          disabled={commitMsg.trim().length === 0}
          onClick={async () => {
            if (repoPath) {
              const v = await commands?.createCommit(repoPath, commitMsg);
              match(v)
                .with({ status: 'ok' }, async () => {
                  setIsCommiting(false);
                  refreshChanges();
                  refreshHistory();
                  const head = await commands.getRepoHead(repoPath);
                  if (isMatching({ status: 'ok' }, head)) {
                    setCommitHead(head.data.oid);
                  }
                })
                .with({ status: 'error' }, err => {
                  NOTIFY.error(err.error);
                });
            }
          }}
        >
          {t('commiter.commit')}
        </Button>
        <Button
          className="w-1/5"
          variant={'outline'}
          onClick={() => {
            setIsCommiting(false);
            setCommitMsg('');
          }}
        >
          {t('Cancel')}
        </Button>
      </div>
    </div>
  );
}
