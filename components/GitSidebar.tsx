"use client";

import { BranchInfo, TagInfo } from "@/lib/action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BranchCard from "./BranchCard";
import { FaTag } from "react-icons/fa";
import TagCard from "./TagCard";

export interface GitSideBarProps {
	className?: string;
	branches: BranchInfo[];
	tags: TagInfo[];
}

export function GitSideBar({ className, branches, tags }: GitSideBarProps) {
	return (
		<div className={className}>
			<Tabs defaultValue="local">
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
