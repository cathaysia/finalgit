// This file was generated by [tauri-specta](https://github.com/oscartbeaumont/tauri-specta). Do not edit this file manually.

/** user-defined commands **/

export const commands = {
  async openRepo(repoPath: string): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('open_repo', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async getBranchInfo(repoPath: string): Promise<Result<BranchInfo[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('get_branch_info', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async getTagInfo(repoPath: string): Promise<Result<TagInfo[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('get_tag_info', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async renameBranch(
    repoPath: string,
    info: BranchInfo,
    to: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('rename_branch', { repoPath, info, to }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async removeBranch(
    repoPath: string,
    info: BranchInfo,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('remove_branch', { repoPath, info }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async createBranch(
    repoPath: string,
    name: string,
    commit: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('create_branch', { repoPath, name, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async checkoutBranch(
    repoPath: string,
    name: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('checkout_branch', { repoPath, name }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async getFileTree(
    repoPath: string,
    commit: string,
  ): Promise<Result<FileTree[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('get_file_tree', { repoPath, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async getFileContent(
    repoPath: string,
    commit: string,
    path: string,
  ): Promise<Result<string, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('get_file_content', {
          repoPath,
          commit,
          path,
        }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async getCurrentStatus(
    repoPath: string,
  ): Promise<Result<FileStatus[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('get_current_status', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async getCommits(
    repoPath: string,
    branch: string,
    kind: BranchType,
  ): Promise<Result<CommitInfo[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('get_commits', { repoPath, branch, kind }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async checkoutRemote(
    repoPath: string,
    branch: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('checkout_remote', { repoPath, branch }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async addToStage(
    repoPath: string,
    files: FileStatus[],
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('add_to_stage', { repoPath, files }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async removeFromStage(
    repoPath: string,
    files: string[],
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('remove_from_stage', { repoPath, files }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async restoreFile(
    repoPath: string,
    files: FileStatus[],
    commit: string | null,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('restore_file', { repoPath, files, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async createCommit(
    repoPath: string,
    msg: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('create_commit', { repoPath, msg }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async createPatch(repoPath: string): Promise<Result<string, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('create_patch', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async getHeadModifyTime(repoPath: string): Promise<Result<number, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('get_head_modify_time', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async getHistory(
    repoPath: string,
    commit: string,
  ): Promise<Result<CommitInfo[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('get_history', { repoPath, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async getConfig(
    repoPath: string,
    key: string,
  ): Promise<Result<string, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('get_config', { repoPath, key }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async setConfig(
    repoPath: string,
    key: string,
    value: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('set_config', { repoPath, key, value }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async getConfiges(
    repoPath: string,
  ): Promise<Result<{ [key in string]: string }, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('get_configes', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async assumeLanguage(
    fileName: string,
  ): Promise<Result<string | null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('assume_language', { fileName }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async stashSave(
    repoPath: string,
    message: string | null,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('stash_save', { repoPath, message }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async stashApply(
    repoPath: string,
    index: number,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('stash_apply', { repoPath, index }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async stashRemove(
    repoPath: string,
    index: number,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('stash_remove', { repoPath, index }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async stashList(repoPath: string): Promise<Result<StashInfo[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('stash_list', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async getRepoHead(repoPath: string): Promise<Result<HeadInfo, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('get_repo_head', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async branchFetch(
    repoPath: string,
    branch: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_fetch', { repoPath, branch }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async branchPush(
    repoPath: string,
    force: boolean,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_push', { repoPath, force }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async branchStatus(
    repoPath: string,
    branch: string,
  ): Promise<Result<PushStatus, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_status', { repoPath, branch }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async commitCheckout(
    repoPath: string,
    commit: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('commit_checkout', { repoPath, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async checkoutFile(
    repoPath: string,
    commit: string,
    path: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('checkout_file', { repoPath, commit, path }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async blameOfFile(
    repoPath: string,
    commit: string,
    path: string,
  ): Promise<Result<BlameHunk[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('blame_of_file', { repoPath, commit, path }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async commitInfo(
    repoPath: string,
    commit: string,
  ): Promise<Result<Commit, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('commit_info', { repoPath, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async commitResetAuthor(
    repoPath: string,
    commit: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('commit_reset_author', { repoPath, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async cherrypick(
    repoPath: string,
    commit: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('cherrypick', { repoPath, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async commitAmend(
    repoPath: string,
    commit: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('commit_amend', { repoPath, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async rebaseAbort(repoPath: string): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('rebase_abort', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
};

/** user-defined events **/

/** user-defined constants **/

/** user-defined types **/

export type BlameHunk = {
  final_commit_id: string;
  final_start_line: number;
  lines: number;
  signature: Signature;
};
export type BranchInfo = {
  remote: string | null;
  name: string;
  kind: BranchType;
  commit: string;
  is_head: boolean;
  upstream: string | null;
};
export type BranchType = 'Local' | 'Remote';
export type Commit = {
  id: string;
  author: Signature;
  commiter: Signature;
  message: string;
  summary: string;
  body: string | null;
  time: number;
};
export type CommitInfo = {
  oid: string;
  author: Signature;
  commiter: Signature;
  message: string;
  summary: string;
  time: number;
};
export type FileStatus = { path: string; status: number };
export type FileTree =
  | { File: { filename: string; mode: number } }
  | { Dir: { dir: string; files: FileTree[]; mode: number } };
export type HeadInfo = {
  oid: string;
  is_detached: boolean;
  is_rebasing: boolean;
};
export type PushStatus = { unpush: number; unpull: number };
export type Signature = { name: string; email: string; time: number };
export type StashInfo = { id: number; message: string; oid: string };
export type TagInfo = { name: string; commit: string; ref_hash: string };

/** tauri-specta globals **/

import {
  Channel as TAURI_CHANNEL,
  invoke as TAURI_INVOKE,
} from '@tauri-apps/api/core';
import * as TAURI_API_EVENT from '@tauri-apps/api/event';
import { type WebviewWindow as __WebviewWindow__ } from '@tauri-apps/api/webviewWindow';

type __EventObj__<T> = {
  listen: (
    cb: TAURI_API_EVENT.EventCallback<T>,
  ) => ReturnType<typeof TAURI_API_EVENT.listen<T>>;
  once: (
    cb: TAURI_API_EVENT.EventCallback<T>,
  ) => ReturnType<typeof TAURI_API_EVENT.once<T>>;
  emit: T extends null
    ? (payload?: T) => ReturnType<typeof TAURI_API_EVENT.emit>
    : (payload: T) => ReturnType<typeof TAURI_API_EVENT.emit>;
};

export type Result<T, E> =
  | { status: 'ok'; data: T }
  | { status: 'error'; error: E };

function __makeEvents__<T extends Record<string, any>>(
  mappings: Record<keyof T, string>,
) {
  return new Proxy(
    {} as unknown as {
      [K in keyof T]: __EventObj__<T[K]> & {
        (handle: __WebviewWindow__): __EventObj__<T[K]>;
      };
    },
    {
      get: (_, event) => {
        const name = mappings[event as keyof T];

        return new Proxy((() => {}) as any, {
          apply: (_, __, [window]: [__WebviewWindow__]) => ({
            listen: (arg: any) => window.listen(name, arg),
            once: (arg: any) => window.once(name, arg),
            emit: (arg: any) => window.emit(name, arg),
          }),
          get: (_, command: keyof __EventObj__<any>) => {
            switch (command) {
              case 'listen':
                return (arg: any) => TAURI_API_EVENT.listen(name, arg);
              case 'once':
                return (arg: any) => TAURI_API_EVENT.once(name, arg);
              case 'emit':
                return (arg: any) => TAURI_API_EVENT.emit(name, arg);
            }
          },
        });
      },
    },
  );
}
