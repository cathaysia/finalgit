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
import { CommitInfo, CommitPanel } from "@/components/CommitPanel";
import { useEffect, useState } from "react";

export default function Home() {
	const [branches, setBrances] = useState<BranchInfo[]>();
	const [tags, setTags] = useState<TagInfo[]>();
	const [branch, setBranch] = useState<string>();
	const [commits, setCommits] = useState<CommitInfo[]>();

	useEffect(() => {
		if (branch) {
			(async () => {
				const value = await fetchCommits(branch);
				setCommits(value);
			})();
		}
	}, [branch]);

	useEffect(() => {
		(async () => {
			const branches = await fetchBranches();
			const tags = await fetchTags();
			setBrances(branches);
			setTags(tags);
		})();
	}, []);

	return (
		<main className="flex min-h-screen">
			<ResizablePanelGroup direction="horizontal" className="min-h-screen">
				<ResizablePanel defaultSize={15} className="min-w-52">
					<GitSideBar
						className="flex-col items-stretch justify-start border-r-slate-200 dark:border-r-slate-800"
						branches={branches || []}
						tags={tags || []}
						on_branch={setBranch}
					/>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={85}>
					<CommitPanel commits={commits || []} />
					<p>content</p>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
