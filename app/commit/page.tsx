"use client";

import { Card } from "@/components/ui/card";
import { fetchCommits } from "@/lib/action";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

export interface Author {
	name: string;
	email: string;
}

export interface CommitInfo {
	hash: string;
	author: Author;
	commiter: Author;
	message: string;
	summary: string;
	time: number;
}

export interface CommitPanelProps {
	commits: CommitInfo[];
}

export default function CommitPanel() {
	const searchParam = useSearchParams();
	const query = searchParam.get("branch");
	const kind = searchParam.get("kind");
	console.log(`query: ${kind}@${query}`);

	const [commites, setCommites] = useState<CommitInfo[]>();

	useEffect(() => {
		(async () => {
			if (query && kind) {
				let cms = await fetchCommits(query, kind);
				console.log(`query ${query}`);
				setCommites(cms);
			}
		})();
	}, [query, kind]);

	return (
		<div>
			{commites &&
				commites.map((item) => {
					return (
						<Card key={item.hash}>
							<p>
								{item.summary.length < 40
									? item.summary
									: item.summary.slice(0, 40) + "..."}
							</p>
							<Badge>{item.hash.slice(0, 6)}</Badge>
						</Card>
					);
				})}
		</div>
	);
}
