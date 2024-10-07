import NOTIFY from '@/lib/notify';
import { queryBranches, queryChanges, queryFiles } from '@/lib/query';
import { cn } from '@/lib/utils';
import WorkspacePanel from './WorkspacePanel';

export interface MainPanelProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function MainPanel({ className, ...props }: MainPanelProps) {
  const { error, data: branches } = queryBranches();
  if (error) {
    NOTIFY.error(error.message);
  }

  const head = branches?.find(item => item.is_head);
  let branchName = '';
  if (head) {
    branchName = head.name;
  }

  const { error: fileErr, data: file } = queryFiles();
  if (fileErr) {
    NOTIFY.error(fileErr.message);
  }
  const files = file || [];
  const { error: changeErr, data: changes } = queryChanges();
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
