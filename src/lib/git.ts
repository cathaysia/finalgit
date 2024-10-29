import { commands } from '@/bindings';
import { isMatching, match } from 'ts-pattern';
import NOTIFY from './notify';

export async function getGitConfig(repoPath: string, opt: string) {
  const res = await commands?.gitGetConfig(repoPath, opt);
  if (isMatching({ status: 'ok' }, res)) {
    return res.data;
  }
}

export async function setGitConfig(
  repoPath: string,
  opt: string,
  value: string,
) {
  const res = await commands?.gitSetConfig(repoPath, opt, value);
  match(res)
    .with({ status: 'ok' }, _ => {})
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}
