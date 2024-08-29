"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BranchInfo } from "@/lib/action";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useEffect, useState } from "react";

export interface GitSideBarProps {
	className?: string;
	branches: BranchInfo[];
}

export function GitSideBar({ className, branches }: GitSideBarProps) {
	let [text, setText] = useState<string>();

	return (
		<div className={cn(className)}>
			<Input type="text" onChange={(e) => setText(e.target.value)} />
			<Tabs defaultValue="local">
				<TabsList className="w-full">
					<TabsTrigger value="local">Local</TabsTrigger>
					<TabsTrigger value="remote">Remote</TabsTrigger>
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
							<Card className="p-6">
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
							<Card className="p-6">
								<p>{item.name}</p>
								{item.remote && <Badge>{item.remote}</Badge>}
							</Card>
						))}
				</TabsContent>
			</Tabs>
		</div>
	);
}
