import { commands, type CommitInfo } from '@/bindings';
import { cn } from '@/lib/utils';
import WorkspacePanel from './WorkspacePanel';
import { useAppState, useRefreshRequest } from '@/lib/state';
import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import { debug } from '@tauri-apps/plugin-log';
import GitHistory from '../lists/GitHistory';
import NOTIFY from '@/lib/notify';

export interface MainPanelProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function MainPanel({ className, ...props }: MainPanelProps) {
  const [repoPath, branches, changes, setChanges, files, setFiles, setCurrent] =
    useAppState(s => [
      s.repoPath,
      s.branches,
      s.changes,
      s.setChanges,
      s.files,
      s.setFiles,
      s.setCurrent,
    ]);

  const [stageListener] = useRefreshRequest(s => [s.stageListener]);
  const [currentHistory, setCurrentHisotry] = useState<CommitInfo[]>([]);

  const item = branches.find(item => item.is_head);
  let branchName = '';
  if (item) {
    branchName = item.name;
  }
  useEffect(() => {
    if (repoPath) {
      debug('refresh stage');
      commands?.getCurrentStatus(repoPath).then(v => {
        match(v)
          .with({ status: 'ok' }, v => {
            setChanges(v.data);
          })
          .with({ status: 'error' }, err => {
            NOTIFY.error(err.error);
          });
      });
    }
  }, [repoPath, stageListener]);

  useEffect(() => {
    const head = branches.find(item => item.is_head);
    if (repoPath && head) {
      debug('refresh branch');
      setCurrent(head.commit);
      commands?.getFileTree(repoPath, head.commit).then(v => {
        match(v)
          .with({ status: 'ok' }, v => {
            setFiles(v.data);
          })
          .with({ status: 'error' }, err => {
            NOTIFY.error(err.error);
          });
      });
      commands?.getHistory(repoPath, head.commit).then(v => {
        match(v)
          .with({ status: 'ok' }, v => {
            setCurrentHisotry(v.data);
          })
          .with({ status: 'error' }, err => {
            NOTIFY.error(err.error);
          });
      });
    }
  }, [branches]);

  return (
    <div
      className={cn(
        'grid lg:grid-cols-2 xl:grid-cols-3 gap-2 h-screen p-2',
        className,
      )}
      data-tauri-drag-region={true}
      {...props}
    >
      <WorkspacePanel
        branchName={branchName}
        changeSet={changes}
        files={files}
      />
      <GitHistory history={currentHistory} />
    </div>
  );
}
