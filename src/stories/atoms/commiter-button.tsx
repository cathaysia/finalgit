import { type FileStatus, commands } from '@/bindings';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { refreshChanges } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import GitFileStatus from '@/lib/git-file-status';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { debug } from '@tauri-apps/plugin-log';
import { t } from 'i18next';
import { VscDiff, VscDiscard, VscGitStash } from 'react-icons/vsc';
import { match } from 'ts-pattern';

export interface CommiterProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  files?: string[];
  changeSet: FileStatus[];
  onClicked: () => void;
}

export function CommiterButton({
  className,
  changeSet,
  onClicked,
  ...props
}: CommiterProps) {
  const repoPath = useAppState().repoPath;

  return (
    <div className={cn('flex gap-2', className)} {...props}>
      <Button
        className="w-full"
        disabled={changeSet.length === 0}
        onClick={onClicked}
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
            <DropdownMenuItem onClick={() => savePatch(repoPath)}>
              <VscDiff className="mr-2 h-4 w-4" />
              {t('workspace.generate_patch')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => stashFiles(repoPath)}>
              <VscGitStash className="mr-2 h-4 w-4" />
              {t('workspace.stash')}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => discardChanges(changeSet, repoPath)}
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

async function stashFiles(repoPath?: string) {
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

async function discardChanges(changeSet: FileStatus[], repoPath?: string) {
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

async function savePatch(repoPath?: string) {
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
