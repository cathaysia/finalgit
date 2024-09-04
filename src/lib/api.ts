import { invoke } from "@tauri-apps/api/core";
import { BranchInfo, TagInfo } from "./branch";

export async function fetchBranchInfo() {
	const value = await invoke("get_branch_info");
	return value as BranchInfo[];
}

export async function fetchTagInfo() {
	const value = await invoke("get_tag_info");
	return value as TagInfo[];
}

export async function fetchIsOpen() {
	const value = await invoke("is_opened");
	return value as boolean;
}

export async function create_branch(name: string, commit: string) {
	await invoke("create_branch", {
		name: name,
		commit: commit,
	});
}

export async function rename_branch(info: BranchInfo, to: string) {
	await invoke("rename_branch", {
		info: info,
		to: to,
	});
}

export async function remove_branch(info: BranchInfo) {
	await invoke("remove_branch", {
		info: info,
	});
}

export async function checkout_branch(name: string) {
	await invoke("checkout_branch", {
		branch: name,
	});
}
