import axios from "axios";

export interface BranchInfo {
	remote: string | null;
	name: string;
	kind: string;
}

export async function fetchBranches() {
	let rep = await axios.post("http://127.0.0.1:8823/repo/branch/", {
		repo_path: "/Users/banma-3451/aliosdds",
	});

	return rep.data as BranchInfo[];
}
