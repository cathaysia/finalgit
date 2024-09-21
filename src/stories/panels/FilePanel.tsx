import type { FileTree } from '@/bindings';
import Icon from '@/components/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

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
    return (
        <ScrollArea className={cn(className)} {...props}>
            <SimpleTreeView>
                {files.map(v => {
                    return generateTree('', v, onClicked);
                })}
            </SimpleTreeView>
        </ScrollArea>
    );
}

function generateTree(
    parent: string,
    file: FileTree,
    callback: (path: string) => void,
) {
    if ('File' in file) {
        const entry = file.File;
        const key = `${parent}/${entry.filename}`;
        return (
            <TreeItem
                itemId={key}
                key={key}
                label={
                    <span>
                        <Icon
                            fileName={entry.filename}
                            className="w-4 h-4 mr-2"
                        />
                        {entry.filename}
                    </span>
                }
                onClick={() => {
                    callback(key);
                }}
            />
        );
    }

    const tree = file.Dir;
    const key = `${parent}/${tree.dir}`;

    return (
        <TreeItem
            itemId={key}
            key={key}
            label={
                <span>
                    <Icon
                        fileName={tree.dir}
                        isDir={true}
                        className="w-4 h-4 mr-2"
                    />
                    {tree.dir}
                </span>
            }
        >
            <div>
                {tree.files.map(v => {
                    return generateTree(key, v, callback);
                })}
            </div>
        </TreeItem>
    );
}
