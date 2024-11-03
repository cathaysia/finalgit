import { commands } from '@/bindings';
import Icon from '@/components/icon';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { refreshChanges, useHeadOid } from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import {
  TreeItem2,
  TreeItem2Label,
  type TreeItem2Props,
} from '@mui/x-tree-view/TreeItem2';
import { useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';

interface FileItemLabelProps
  extends React.ComponentProps<typeof TreeItem2Label> {
  children: React.ReactNode;
  isDir?: boolean;
  fileName: string;
}

function FileItemLabel({ isDir, fileName, ...props }: FileItemLabelProps) {
  return (
    <span className="flex text-ellipsis text-nowrap">
      <Icon fileName={fileName} className="mr-2 h-4 w-4" isDir={isDir} />
      <TreeItem2Label {...props} />
    </span>
  );
}

export interface FileItemProps extends TreeItem2Props {}

export const FileItem = React.forwardRef<HTMLLIElement, FileItemProps>(
  (props, ref) => {
    const { id, itemId, label, disabled, children } = props;
    const { t } = useTranslation();
    const { publicAPI } = useTreeItem2({
      id,
      itemId,
      children,
      label,
      disabled,
      rootRef: ref,
    });
    const { data: head } = useHeadOid();
    const item = publicAPI.getItem(itemId);
    const isDir = item.isDir;
    const fileName = item.fileName;
    const commit = item.commit;
    const [repoPath] = useAppState(s => [s.repoPath]);

    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <TreeItem2
            ref={ref}
            slots={{ label: FileItemLabel }}
            // biome-ignore lint/suspicious/noExplicitAny: any
            slotProps={{ label: { isDir: isDir, fileName: fileName } as any }}
            {...props}
          />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>{fileName}</ContextMenuLabel>
          {!isDir && (
            <ContextMenuItem
              onClick={() => {
                if (!repoPath) {
                  return;
                }
                copyFileContent(repoPath, commit, itemId);
              }}
            >
              {t('fileItem.copy')}
            </ContextMenuItem>
          )}
          <ContextMenuItem
            onClick={async () => {
              const path = itemId.slice(1);
              await writeText(path);
              NOTIFY.info(`copy ${path}`);
            }}
          >
            {t('fileItem.copy_path')}
          </ContextMenuItem>
          <ContextMenuItem
            disabled={head === commit}
            onClick={async () => {
              if (repoPath) {
                checkoutFile(repoPath, itemId, commit);
              }
            }}
          >
            {t('fileItem.checkout')}
          </ContextMenuItem>
          <ContextMenuItem>{t('fileItem.compareHead')}</ContextMenuItem>
          <ContextMenuItem>{t('fileItem.compareWith')}</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
);

async function checkoutFile(repoPath: string, itemId: string, commit: string) {
  const path = itemId.slice(1);
  const res = await commands?.checkoutFile(repoPath, commit, path);
  match(res)
    .with({ status: 'ok' }, () => {
      refreshChanges();
      NOTIFY.info(`checkout file ${path}`);
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}

async function copyFileContent(
  repoPath: string,
  commit: string,
  itemId: string,
) {
  const path = itemId.slice(1);
  const res = await commands?.getFileContent(repoPath, commit, path);
  match(res)
    .with({ status: 'ok' }, async val => {
      await writeText(val.data);
      NOTIFY.info(`copy content of ${path}`);
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}
