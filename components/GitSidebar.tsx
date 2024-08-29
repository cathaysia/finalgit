"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/card";
import { Input } from "@/components/ui/input";
import { BranchInfo, TagInfo } from "@/lib/action";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useEffect, useState } from "react";

export interface GitSideBarProps {
	className?: string;
	branches: BranchInfo[];
	tags: TagInfo[];
	on_branch?: (branch: string) => void;
}

export function GitSideBar({
	className,
	branches,
	tags,
	on_branch,
}: GitSideBarProps) {
	let [text, setText] = useState<string>();

	return (
		<div className={cn(className)}>
			<div className="w-full">
				<Input type="text" onChange={(e) => setText(e.target.value)} />
			</div>
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
						.filter((v) => {
							if (text && !v.name.startsWith(text)) {
								return false;
							}
							return true;
						})
						.map((item) => (
							<Card
								className="p-6"
								onClick={(e) => {
									if (on_branch) {
										on_branch(item.name);
									}
								}}
							>
								<p>{item.name}</p>
								{item.remote && <Badge>{item.remote}</Badge>}
							</Card>
						))}
				</TabsContent>
				<TabsContent value="remote">
					{branches
						.filter((v) => {
							return v.kind == "Remote";
						})
						.filter((v) => {
							if (text && !v.name.startsWith(text)) {
								return false;
							}
							return true;
						})
						.map((item) => (
							<Card
								className="p-6"
								onClick={(e) => {
									if (on_branch) {
										on_branch(item.name);
									}
								}}
							>
								<p>{item.name}</p>
								{item.remote && <Badge>{item.remote}</Badge>}
							</Card>
						))}
				</TabsContent>
				<TabsContent value="tag">
					{tags
						.filter((item) => {
							if (text && !item.name.startsWith(text)) {
								return false;
							}
							return true;
						})
						.map((item) => (
							<Card className="p-6">
								<p>{item.name}</p>
							</Card>
						))}
				</TabsContent>
			</Tabs>
		</div>
	);
}
