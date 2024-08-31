"use client";
import { fetchBranches, fetchTags, TagInfo } from "@/lib/action";
import { GitSideBar } from "@/components/GitSidebar";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Current from "./Current";
import Link from "next/link";
import { FaFilter, FaSearch } from "react-icons/fa";
import { Button } from "./ui/button";
import { BranchInfo, getRepoBranchByRepoPath } from "@/lib/api/branch";

export interface Props {
	className?: string;
}

export default function NavBar({ className }: Props) {
	const [branches, setBrances] = useState<Array<BranchInfo>>();
	const [tags, setTags] = useState<TagInfo[]>();
	let [text, setText] = useState<string>();

	useEffect(() => {
		(async () => {
			const branches = await getRepoBranchByRepoPath({
				repoPath: process.env.NEXT_PUBLIC_GIT_SERVER,
			});
			const tags = await fetchTags();
			setBrances(branches);
			setTags(tags);
		})();
	}, []);

	return (
		<div className={className}>
			<Current />
			<div className="w-full flex items-center">
				<Input type="text" onChange={(e) => setText(e.target.value)} />
				<Button>
					<FaSearch className="w-10" />
				</Button>
			</div>
			<GitSideBar
				className="flex-col items-stretch justify-start border-r-slate-200 dark:border-r-slate-800"
				branches={
					branches?.filter((item) => {
						if (text && item.name && !item.name.startsWith(text)) {
							return false;
						}
						return true;
					}) || []
				}
				tags={
					tags?.filter((item) => {
						if (text && !item.name.startsWith(text)) {
							return false;
						}
						return true;
					}) || []
				}
			/>
		</div>
	);
}
