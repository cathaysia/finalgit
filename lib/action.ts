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
	let path =
		"http://localhost:8823/repo/tags?repo_path=/Users/banma-3451/aliosdds";

	let rep = await axios.get(`${process.env.GIT_SERVER}/repo/tags/`, {
		params: {
			repo_path: `/Users/banma-3451/aliosdds`,
		},
	});

	return rep.data as TagInfo[];
}
