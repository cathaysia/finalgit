import { createLazyFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { BranchInfo } from "../lib/branch";

import { create } from "zustand";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

export interface OpenState {
	isOpened: boolean;
	setIsOpened: (isOpened: boolean) => void;
}

const useOpenState = create<OpenState>((set) => ({
	isOpened: false,
	setIsOpened: (isOpened: boolean) => set({ isOpened: isOpened }),
}));

function Index() {
	const { isOpened, setIsOpened } = useOpenState();
	const [branches, setBranches] = useState<BranchInfo[]>();

	invoke("is_opened").then((value) => {
		if (value) {
			if (!isOpened) {
				setIsOpened(true);
			}
		}
	});

	useEffect(() => {
		if (!isOpened) {
			return;
		}

		invoke("get_branch_info").then((values) => {
			let value = values as BranchInfo[];
			setBranches(value);
		});
	}, [isOpened]);

	return (
		<div>
			<button
				onClick={() => {
					open({
						directory: true,
					}).then((dir) => {
						dir &&
							invoke("open_repo", {
								repoPath: dir,
							}).then(() => {
								console.log(`open repo: ${dir}`);
								setIsOpened(true);
							});
					});
				}}
			>
				Open File
			</button>
			<ul>
				{branches &&
					branches.map((value) => {
						return <li>{value.name}</li>;
					})}
			</ul>
		</div>
	);
}
