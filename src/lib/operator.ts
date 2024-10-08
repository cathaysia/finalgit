import { type BranchInfo, type FileStatus, commands } from '@/bindings';
import { match } from 'ts-pattern';
import NOTIFY from './notify';
import { refreshBranches, refreshChanges } from './query';

export async function addFileToStage(repoPath: string, item: FileStatus) {
  const v = await commands.addToStage(repoPath, [item]);
  match(v)
    .with({ status: 'ok' }, () => refreshChanges())
    .with({ status: 'error' }, err => NOTIFY.error(err.error));
}

export async function discardChanges(repoPath: string, item: FileStatus) {
  const v = await commands?.restoreFile(repoPath, [item], null);
  match(v)
    .with({ status: 'ok' }, () => {
      refreshChanges();
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}

export async function removeBranch(repoPath: string, info: BranchInfo) {
  if (info.kind !== 'Local') {
    return;
  }

  const v = await commands?.removeBranch(repoPath, info);
  match(v)
    .with({ status: 'ok' }, () => {
      refreshBranches();
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}

export async function checkoutBranch(repoPath: string, info: BranchInfo) {
  if (info.kind === 'Local') {
    const v = await commands?.checkoutBranch(repoPath, info.name);
    match(v)
      .with({ status: 'ok' }, () => {
        refreshBranches();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  } else {
    const v = await commands?.checkoutRemote(repoPath, info.name);
    match(v)
      .with({ status: 'ok' }, () => {
        refreshBranches();
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  }
}
