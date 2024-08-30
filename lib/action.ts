import { CommitInfo } from "@/app/commit/page";
import axios from "axios";
import { Console } from "console";

export interface BranchInfo {
	remote: string | null;
	name: string;
	kind: string;
}

export async function fetchBranches() {
	let rep = await axios.get(
		`${process.env.NEXT_PUBLIC_GIT_SERVER}/repo/branch/`,
		{
			params: {
				repo_path: `${process.env.NEXT_PUBLIC_GIT_REPO}`,
			},
		},
	);

	return rep.data as BranchInfo[];
}

export interface TagInfo {
	name: string;
	commit: string;
}

export async function fetchTags() {
	let rep = await axios.get(
		`${process.env.NEXT_PUBLIC_GIT_SERVER}/repo/tags/`,
		{
			params: {
				repo_path: process.env.NEXT_PUBLIC_GIT_REPO,
			},
		},
	);

	return rep.data as TagInfo[];
}

export async function fetchCommits(branch: string, kind: string) {
	let rep = await axios.get(
		`${process.env.NEXT_PUBLIC_GIT_SERVER}/repo/commits`,
		{
			params: {
				repo_path: process.env.NEXT_PUBLIC_GIT_REPO,
				name: branch,
				kind: kind,
			},
		},
	);

	return rep.data as CommitInfo[];
}
