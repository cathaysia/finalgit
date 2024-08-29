"use client";
import {
	BranchInfo,
	fetchBranches,
	fetchCommits,
	fetchTags,
	TagInfo,
} from "@/lib/action";
import { GitSideBar } from "@/components/GitSidebar";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";

export default function NavBar() {
	const [branches, setBrances] = useState<BranchInfo[]>();
	const [tags, setTags] = useState<TagInfo[]>();

	useEffect(() => {
		(async () => {
			const branches = await fetchBranches();
			const tags = await fetchTags();
			setBrances(branches);
			setTags(tags);
		})();
	}, []);

	return (
		<GitSideBar
			className="flex-col items-stretch justify-start border-r-slate-200 dark:border-r-slate-800"
			branches={branches || []}
			tags={tags || []}
		/>
	);
}
