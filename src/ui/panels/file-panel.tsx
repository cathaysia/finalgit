import type { FileTree } from '@/bindings';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import type { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { useMemo } from 'react';
import { FileItem } from '../atoms/fileitem';

export interface FilePanelProps
  extends React.ComponentProps<typeof ScrollArea> {
  files: FileTree[];
  commit: string;
  onClicked?: (fileName: string) => void;
}

export default function FilePanel({
  className,
  files,
  commit,
  onClicked = () => {},
  ...props
}: FilePanelProps) {
  const items = useMemo(() => {
    return files.flatMap(v => {
      const items = generateTree('', v, commit);

      return items;
    });
  }, [files]);

  const infos = useMemo(() => {
    const infos = items.flatMap(extractInfos);
    const res = new Map<string, boolean>();
    infos.forEach(item => {
      res.set(item.id, item.isDir);
    });
    return res;
  }, [items]);

  return (
    <ScrollArea className={cn('h-full min-h-0', className)} {...props}>
      <RichTreeView
        items={items}
        slots={{
          // biome-ignore lint/suspicious/noExplicitAny:any
          item: FileItem as any,
        }}
        onItemClick={(_, id) => {
          const isDir = infos.get(id);
          if (isDir === false) {
            onClicked(id);
          }
        }}
      />
    </ScrollArea>
  );
}

type FileProps = TreeViewBaseItem<{
  itemId: string;
  id: string;
  fileName: string;
  label: string;
  isDir?: boolean;
  commit: string;
}>;

function generateTree(
  parent: string,
  file: FileTree,
  commit: string,
): FileProps[] {
  if ('File' in file) {
    const entry = file.File;
    const key = `${parent}/${entry.filename}`;
    return [
      {
        commit: commit,
        itemId: key,
        id: key,
        fileName: entry.filename,
        label: entry.filename,
      },
    ];
  }

  const tree = file.Dir;
  const key = `${parent}/${tree.dir}`;

  return [
    {
      itemId: key,
      isDir: true,
      id: key,
      commit: commit,
      fileName: tree.dir,
      label: tree.dir,
      children: tree.files.flatMap(v => {
        return generateTree(key, v, commit);
      }),
    },
  ];
}

function extractInfos(files: FileProps): { id: string; isDir: boolean }[] {
  if (!files.children) {
    return [
      {
        id: files.id,
        isDir: false,
      },
    ];
  }

  return [
    {
      id: files.id,
      isDir: true,
    },
    ...files.children.flatMap(extractInfos),
  ];
}
