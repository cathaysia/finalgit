import axios from "axios";

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
