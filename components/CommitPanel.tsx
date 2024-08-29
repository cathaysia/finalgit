import { Card } from "./card";

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

export function CommitPanel({ commits }: CommitPanelProps) {
	console.log(commits);
	return (
		<div>
			{commits.map((item) => {
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
