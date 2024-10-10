import type { FileTree } from '@/bindings';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import type { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { useMemo } from 'react';
import { FileItem } from '../atoms/FileItem';

export interface FilePanelProps
  extends React.ComponentProps<typeof ScrollArea> {
  files: FileTree[];
  onClicked?: (fileName: string) => void;
}

export default function FilePanel({
  className,
  files,
  onClicked = () => {},
  ...props
}: FilePanelProps) {
  const items = useMemo(() => {
    return files.flatMap(v => {
      const items = generateTree('', v, onClicked);

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
    <ScrollArea className={cn(className)} {...props}>
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
}>;

function generateTree(
  parent: string,
  file: FileTree,
  callback: (path: string) => void,
): FileProps[] {
  if ('File' in file) {
    const entry = file.File;
    const key = `${parent}/${entry.filename}`;
    return [
      {
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
      fileName: tree.dir,
      label: tree.dir,
      children: tree.files.flatMap(v => {
        return generateTree(key, v, callback);
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
