import { commands } from '@/bindings';
import Icon from '@/components/Icon';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import NOTIFY from '@/lib/notify';
import { refreshChanges } from '@/lib/query';
import { useAppState } from '@/lib/state';
import {
  TreeItem2,
  TreeItem2Label,
  type TreeItem2Props,
} from '@mui/x-tree-view/TreeItem2';
import { useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
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
          {isDir && <ContextMenuItem>{t('fileItem.copy')}</ContextMenuItem>}
          <ContextMenuItem>{t('fileItem.copy_path')}</ContextMenuItem>
          <ContextMenuItem
            onClick={async () => {
              if (repoPath) {
                checkoutFile(repoPath, itemId, commit);
              }
            }}
          >
            {t('fileItem.checkout')}
          </ContextMenuItem>
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
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}
