export interface BranchInfo {
	remote?: string;
	name: string;
	kind: BranchKind;
}

export type BranchKind = "Local" | "Remote";

export interface TagInfo {
	name: string;
	commit: string;
}
