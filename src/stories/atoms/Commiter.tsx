import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
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
import { generateCommit } from '@/lib/ai';
import GitFileStatus from '@/lib/file_status';
import NOTIFY from '@/lib/notify';
import { refreshChanges } from '@/lib/query';
import { useAiState, useAppState, useRefreshRequest } from '@/lib/state';
import { debug } from '@tauri-apps/plugin-log';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { VscDiscard } from 'react-icons/vsc';
import { match } from 'ts-pattern';

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
  const [isCommiting, setIsCommiting] = useState(false);
  const t = useTranslation().t;
  const repoPath = useAppState(s => s.repoPath);
  const [refreshPush] = useRefreshRequest(s => [s.refreshPush]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, currentModel] = useAiState(s => [
    s.prompt,
    s.ollamaCurrentModel,
  ]);

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

  async function startCommit() {
    if (!repoPath) {
      return;
    }
    const isIndexed = changeSet
      .map(item => GitFileStatus.isIndexed(item.status))
      .reduce((l, r) => l && r);
    if (!isIndexed) {
      const allfiles = changeSet.filter(
        item => !GitFileStatus.isConflicted(item.status),
      );
      if (allfiles.length === 0) {
        return;
      }
      const res = await commands?.addToStage(repoPath, allfiles);
      match(res)
        .with({ status: 'ok' }, () => {
          refreshChanges();
          refreshPush();
        })
        .with({ status: 'error' }, err => {
          NOTIFY.error(err.error);
        });
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
        return await commands.restoreFile(repoPath, wtFiles, null);
      }

      return await commands.restoreFile(repoPath, indexFiles, null);
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
        <Textarea
          placeholder={t('commiter.commit_summary')}
          autoFocus
          value={commitMsg}
          onChange={e => setCommitMsg(e.target.value)}
          onKeyUp={e => {
            if (e.key === 'Escape') {
              setIsCommiting(false);
            }
          }}
        />
        <Button
          onClick={async () => {
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
                const v = await generateCommit(
                  value.data,
                  prompt,
                  currentModel,
                );
                const lines = v.split('\n');
                if (lines.length !== 0) {
                  setCommitMsg(lines[0]);
                }
                setIsLoading(false);
              })
              .with({ status: 'error' }, err => {
                NOTIFY.error(err.error);
              });
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('commiter.generating')}
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
                .with({ status: 'ok' }, () => {
                  setIsCommiting(false);
                  refreshChanges();
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
          onClick={() => setIsCommiting(false)}
        >
          {t('Cancel')}
        </Button>
      </div>
    </div>
  );
}
