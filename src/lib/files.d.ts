export interface GitFile {
	File: string;
}

export interface InnerDir {
	dir: string;
	files: FileTree[];
}

export interface GitDir {
	Dir: InnerDir;
}

export type GitFileTree = GitFile | GitDir;
