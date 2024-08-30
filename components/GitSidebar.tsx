"use client";

import { BranchInfo, TagInfo } from "@/lib/action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BranchCard from "./BranchCard";
import { FaCodeBranch, FaTag } from "react-icons/fa";
import TagCard from "./TagCard";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export interface GitSideBarProps {
	className?: string;
	branches: BranchInfo[];
	tags: TagInfo[];
}

export function GitSideBar({ className, branches, tags }: GitSideBarProps) {
	const [currentTab, setCurrentTab] = useState<string>("local");
	let icon = <FaCodeBranch />;
	if (currentTab == "tag") {
		icon = <FaTag />;
	}

	return (
		<div className={className}>
			<div className="w-full h-20 inline-flex items-center">
				<Input />
				<Button
					onClick={(e) => {
						console.log("create branch");
					}}
				>
					{icon}
					Create
				</Button>
			</div>
			<Tabs
				defaultValue="local"
				onValueChange={(e) => {
					setCurrentTab(e);
				}}
			>
				<TabsList className="w-full">
					<TabsTrigger value="local">Local</TabsTrigger>
					<TabsTrigger value="remote">Remote</TabsTrigger>
					<TabsTrigger value="tag">Tags</TabsTrigger>
				</TabsList>
				<TabsContent value="local">
					{branches
						.filter((v) => {
							return v.kind == "Local";
						})
						.map((item) => {
							return <BranchCard remote={item.remote} branch={item.name} />;
						})}
				</TabsContent>
				<TabsContent value="remote">
					{branches
						.filter((v) => {
							return v.kind == "Remote";
						})
						.map((item) => {
							return <BranchCard remote={item.remote} branch={item.name} />;
						})}
				</TabsContent>
				<TabsContent value="tag">
					{tags.map((item) => (
						<TagCard name={item.name} hash={item.commit} key={item.commit} />
					))}
				</TabsContent>
			</Tabs>
		</div>
	);
}
