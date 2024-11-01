import { type BranchInfo, type FileStatus, commands } from '@/bindings';
import { match } from 'ts-pattern';
import { refreshBranches, refreshChanges } from '../hooks/query';
import NOTIFY from './notify';

export async function stageAddFile(repoPath: string, item: FileStatus) {
  const v = await commands.stageAddFiles(repoPath, [item]);
  match(v)
    .with({ status: 'ok' }, () => refreshChanges())
    .with({ status: 'error' }, err => NOTIFY.error(err.error));
}

export async function stageDiscardFile(repoPath: string, item: FileStatus) {
  const v = await commands?.stageRestoreFiles(repoPath, [item], null);
  match(v)
    .with({ status: 'ok' }, () => {
      refreshChanges();
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}

export async function branchRemove(repoPath: string, info: BranchInfo) {
  if (info.kind !== 'Local') {
    return;
  }

  const v = await commands?.branchRemove(repoPath, info);
  match(v)
    .with({ status: 'ok' }, () => {
      refreshBranches();
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}

export async function branchCheckout(repoPath: string, info: BranchInfo) {
  if (info.kind === 'Local') {
    const v = await commands?.branchCheckout(repoPath, info.name);
    match(v)
      .with({ status: 'ok' }, () => {
        refreshBranches();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  } else {
    const v = await commands?.branchCheckoutRemote(repoPath, info.name);
    match(v)
      .with({ status: 'ok' }, () => {
        refreshBranches();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }
}
