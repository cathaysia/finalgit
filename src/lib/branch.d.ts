export interface BranchInfo {
	remote?: string;
	name: string;
	kind: BranchKind;
	commit: string;
	is_head: bool;
	upstream?: string;
}

export type BranchKind = "Local" | "Remote";

export interface TagInfo {
	name: string;
	commit: string;
}
