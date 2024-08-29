import { CommitInfo } from "@/components/CommitPanel";
import axios from "axios";
import { Console } from "console";

export interface BranchInfo {
	remote: string | null;
	name: string;
	kind: string;
}

export async function fetchBranches() {
	let rep = await axios.get(`${process.env.GIT_SERVER}/repo/branch/`, {
		params: {
			repo_path: `${process.env.GIT_REPO}`,
		},
	});

	return rep.data as BranchInfo[];
}

export interface TagInfo {
	name: string;
	commit: string;
}

export async function fetchTags() {
	let rep = await axios.get(`${process.env.GIT_SERVER}/repo/tags/`, {
		params: {
			repo_path: process.env.GIT_REPO,
		},
	});

	return rep.data as TagInfo[];
}

export async function fetchCommits(branch: string) {
	let rep = await axios.get(`${process.env.GIT_SERVER}/repo/commits`, {
		params: {
			repo_path: process.env.GIT_REPO,
			name: branch,
		},
	});

	return rep.data as CommitInfo[];
}
