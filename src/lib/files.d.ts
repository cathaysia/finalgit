export interface File {
	name: string;
}

export interface Dir {
	dir: string;
	files: (File | Dir)[];
}
