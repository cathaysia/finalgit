"use client";
import { Card } from "@/components/ui/card";
import { fetchCommits } from "@/lib/action";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

	const [commites, setCommites] = useState<CommitInfo[]>();

	useEffect(() => {
		(async () => {
			if (query) {
				let cms = await fetchCommits(query);
				console.log(`query ${query}`);
				setCommites(cms);
			}
		})();
	}, [query]);

	return (
		<div>
			{commites &&
				commites.map((item) => {
					return (
						<Card>
							<p>{item.hash}</p>
							<p>{item.summary}</p>
						</Card>
					);
				})}
		</div>
	);
}
