import { commands } from '@/bindings';
import { match } from 'ts-pattern';
import NOTIFY from './notify';

export async function getGitConfig(repoPath: string, opt: string) {
  const res = await commands?.getConfig(repoPath, opt);
  return match(res)
    .with({ status: 'ok' }, val => {
      return val.data;
    })
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    })
    .exhaustive();
}

export async function setGitConfig(
  repoPath: string,
  opt: string,
  value: string,
) {
  const res = await commands?.setConfig(repoPath, opt, value);
  match(res)
    .with({ status: 'ok' }, _ => {})
    .with({ status: 'error' }, err => {
      NOTIFY.error(err.error);
    });
}
