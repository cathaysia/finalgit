// This file was generated by [tauri-specta](https://github.com/oscartbeaumont/tauri-specta). Do not edit this file manually.

/** user-defined commands **/

export const commands = {
  async bisectStart(repoPath: string): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('bisect_start', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async bisectStop(repoPath: string): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('bisect_stop', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async bisectMarkGood(
    repoPath: string,
    oid: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('bisect_mark_good', { repoPath, oid }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async bisectMarkBad(
    repoPath: string,
    oid: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('bisect_mark_bad', { repoPath, oid }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async bisectGetNext(
    repoPath: string,
  ): Promise<Result<string | null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('bisect_get_next', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async bisectGetRange(repoPath: string): Promise<Result<BisectRange, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('bisect_get_range', { repoPath }),
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
  async repoOpen(repoPath: string): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('repo_open', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async repoGetHead(repoPath: string): Promise<Result<HeadInfo, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('repo_get_head', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async repoGetStatus(
    repoPath: string,
  ): Promise<Result<RepositoryState, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('repo_get_status', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async tagGetInfo(repoPath: string): Promise<Result<TagInfo[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('tag_get_info', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async branchRename(
    repoPath: string,
    info: BranchInfo,
    to: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_rename', { repoPath, info, to }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async branchRemove(
    repoPath: string,
    info: BranchInfo,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_remove', { repoPath, info }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async branchCreate(
    repoPath: string,
    branchName: string,
    commit: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_create', {
          repoPath,
          branchName,
          commit,
        }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async branchCreateFrom(
    repoPath: string,
    name: string,
    branch: BranchInfo,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_create_from', {
          repoPath,
          name,
          branch,
        }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async branchCheckout(
    repoPath: string,
    name: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_checkout', { repoPath, name }),
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
  async branchGetInfo(repoPath: string): Promise<Result<BranchInfo[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_get_info', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async branchGetStatus(
    repoPath: string,
    branch: string,
  ): Promise<Result<PushStatus, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_get_status', { repoPath, branch }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async branchPull(
    repoPath: string,
    info: BranchInfo,
    rebase: boolean,
    ff: boolean,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_pull', { repoPath, info, rebase, ff }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async branchPush(
    repoPath: string,
    info: BranchInfo,
    force: boolean,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('branch_push', { repoPath, info, force }),
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
  async commitInfo(
    repoPath: string,
    commit: string,
  ): Promise<Result<CommitInfo, string>> {
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
  async commitRevert(
    repoPath: string,
    commit: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('commit_revert', { repoPath, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async commitsSince(
    repoPath: string,
    commit: string,
  ): Promise<Result<CommitInfo[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('commits_since', { repoPath, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async commitCreate(
    repoPath: string,
    msg: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('commit_create', { repoPath, msg }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async commitsByBranch(
    repoPath: string,
    branch: string,
    kind: BranchType,
  ): Promise<Result<CommitInfo[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('commits_by_branch', {
          repoPath,
          branch,
          kind,
        }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async diffStage(repoPath: string): Promise<Result<string, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('diff_stage', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async diffBetween(
    repoPath: string,
    oldCommit: string,
    newCommit: string,
  ): Promise<Result<string, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('diff_between', {
          repoPath,
          oldCommit,
          newCommit,
        }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async diffStageFile(
    repoPath: string,
    filePath: string,
  ): Promise<Result<string, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('diff_stage_file', { repoPath, filePath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async commitsChangeInfo(
    repoPath: string,
    commit: string,
  ): Promise<Result<ChangeInfo, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('commits_change_info', { repoPath, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async diffCache(
    repoPath: string,
    filePathes: string[],
  ): Promise<Result<string, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('diff_cache', { repoPath, filePathes }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async configGet(
    repoPath: string,
    key: string,
  ): Promise<Result<string, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('config_get', { repoPath, key }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async configSet(
    repoPath: string,
    key: string,
    value: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('config_set', { repoPath, key, value }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async configGetAll(
    repoPath: string,
  ): Promise<Result<Partial<{ [key in string]: string }>, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('config_get_all', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async fileGetTree(
    repoPath: string,
    commit: string,
  ): Promise<Result<FileTree[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('file_get_tree', { repoPath, commit }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async fileGetContent(
    repoPath: string,
    commit: string,
    path: string,
  ): Promise<Result<string, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('file_get_content', {
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
  async fileGetStatus(repoPath: string): Promise<Result<FileStatus[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('file_get_status', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async fileAddIgnore(
    repoPath: string,
    rules: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('file_add_ignore', { repoPath, rules }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async fileAddExclude(
    repoPath: string,
    rules: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('file_add_exclude', { repoPath, rules }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async fileReadToString(
    repoPath: string,
    path: string,
  ): Promise<Result<string, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('file_read_to_string', { repoPath, path }),
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
  async rebaseInteractiveBegin(
    repoPath: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('rebase_interactive_begin', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async rebaseContinue(repoPath: string): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('rebase_continue', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async remoteGetList(repoPath: string): Promise<Result<Remote[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('remote_get_list', { repoPath }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async remoteAdd(
    repoPath: string,
    name: string,
    url: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('remote_add', { repoPath, name, url }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async remoteSetUrl(
    repoPath: string,
    name: string,
    url: string,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('remote_set_url', { repoPath, name, url }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async stageAddFiles(
    repoPath: string,
    files: FileStatus[],
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('stage_add_files', { repoPath, files }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async stageRemoveFiles(
    repoPath: string,
    files: string[],
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('stage_remove_files', { repoPath, files }),
      };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async stageRestoreFiles(
    repoPath: string,
    files: FileStatus[],
    commit: string | null,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('stage_restore_files', {
          repoPath,
          files,
          commit,
        }),
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
  async takeRepoPath(): Promise<string | null> {
    return await TAURI_INVOKE('take_repo_path');
  },
  async statisticsCommitsOfAuthor(
    repoPath: string,
    author: string,
  ): Promise<Result<CommitStatistics[], string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('statistics_commits_of_author', {
          repoPath,
          author,
        }),
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
  async gpgGetSecretList(): Promise<Result<string[], string>> {
    try {
      return { status: 'ok', data: await TAURI_INVOKE('gpg_get_secret_list') };
    } catch (e) {
      if (e instanceof Error) throw e;
      else return { status: 'error', error: e as any };
    }
  },
  async gitClone(
    args: CloneArgs,
    chan: TAURI_CHANNEL<number[]>,
  ): Promise<Result<null, string>> {
    try {
      return {
        status: 'ok',
        data: await TAURI_INVOKE('git_clone', { args, chan }),
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

export type BisectRange = { good: string[]; bad: string[] };
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
  oid: string;
  is_head: boolean;
  upstream: string | null;
};
export type BranchType = 'Local' | 'Remote';
export type ChangeInfo = { add: number; del: number };
export type CloneArgs = {
  url: string;
  target: string;
  depth: number;
  mirror: boolean;
  recursive: boolean;
};
export type CommitInfo = {
  oid: string;
  author: Signature;
  commiter: Signature;
  message: string;
  summary: string;
  body: string | null;
  time: number;
};
export type CommitStatistics = { date: number; count: number };
export type FileStatus = { path: string; status: number };
export type FileTree =
  | { File: { filename: string; mode: number } }
  | { Dir: { dir: string; files: FileTree[]; mode: number } };
export type HeadInfo = {
  oid: string;
  is_detached: boolean;
  is_rebasing: boolean;
};
export type PushStatus = {
  unpush: number;
  unpull: number;
  has_conflict: boolean;
};
export type Remote = { name: string; url: string };
export type RepositoryState =
  | 'Clean'
  | 'Merge'
  | 'Revert'
  | 'RevertSequence'
  | 'CherryPick'
  | 'CherryPickSequence'
  | 'Bisect'
  | 'Rebase'
  | 'RebaseInteractive'
  | 'RebaseMerge'
  | 'ApplyMailbox'
  | 'ApplyMailboxOrRebase';
export type Signature = { name: string; email: string; time: number };
export type StashInfo = { id: number; message: string; oid: string };
export type TAURI_CHANNEL<TSend> = null;
export type TagInfo = { name: string; oid: string; ref_hash: string };

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
  emit: null extends T
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
