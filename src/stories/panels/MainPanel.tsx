import NOTIFY from '@/lib/notify';
import { useBranches, useChanges, useFiles } from '@/lib/query';
import { cn } from '@/lib/utils';
import WorkspacePanel from './WorkspacePanel';

type MainPanelProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export default function MainPanel({ className, ...props }: MainPanelProps) {
  const { error, data: branches } = useBranches();
  if (error) {
    NOTIFY.error(error.message);
  }

  const head = branches?.find(item => item.is_head);
  let branchName = '';
  if (head) {
    branchName = head.name;
  }

  const { error: fileErr, data: file } = useFiles();
  if (fileErr) {
    NOTIFY.error(fileErr.message);
  }
  const files = file || [];
  const { error: changeErr, data: changes } = useChanges();
  if (changeErr) {
    NOTIFY.error(changeErr.message);
  }

  return (
    <div className={cn(className)} data-tauri-drag-region={true} {...props}>
      <WorkspacePanel
        branchName={branchName}
        changeSet={changes || []}
        files={files}
        className="h-full"
      />
    </div>
  );
}
