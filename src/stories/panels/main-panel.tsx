import { useBranches, useChanges } from '@/hooks/query';
import NOTIFY from '@/lib/notify';
import WorkspacePanel from './workspace-panel';

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

  const { error: changeErr, data: changes } = useChanges();
  if (changeErr) {
    NOTIFY.error(changeErr.message);
  }

  return (
    <WorkspacePanel
      className={className}
      data-tauri-drag-region={true}
      {...props}
      branchName={branchName}
      changeSet={changes || []}
    />
  );
}
