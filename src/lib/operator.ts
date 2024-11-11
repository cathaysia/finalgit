import { type BranchInfo, type FileStatus, commands } from '@/bindings';
import { isMatching, match } from 'ts-pattern';
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
  const v =
    info.kind === 'Local'
      ? await commands?.branchCheckout(repoPath, info.name)
      : await commands?.branchCheckoutRemote(repoPath, info.name);

  if (isMatching({ status: 'ok' }, v)) {
    refreshBranches();
    return true;
  }

  NOTIFY.error(v.error);

  return false;
}
