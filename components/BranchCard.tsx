"use client";
import clsx from "clsx";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { FaCodeBranch } from "react-icons/fa";

export interface BranchCardProps {
	branch: string;
	remote: string | null;
}

export default function BranchCard({ branch, remote }: BranchCardProps) {
	let branchName = branch;
	if (remote) {
		branchName = remote + "/" + branchName;
	}
	const branchKind = remote ? "Remote" : "Local";
	let href = `/commit?branch=${branchName}&kind=${branchKind}`;

	let searchParam = useSearchParams();
	let currentBranch = `${searchParam.get("kind")}/${searchParam.get("branch")}`;
	const key = `${branchKind}/${branchName}`;

	return (
		<Link
			className={clsx(
				"p-4 block w-full text-left h-20 border-l-4 hover:border-slate-800",
				{
					"bg-sky-100 text-blue-600": currentBranch == key,
				},
			)}
			href={href}
		>
			<FaCodeBranch className="inline" />
			<p>{branch}</p>
			<Badge>{remote ? remote : "local"}</Badge>
		</Link>
	);
}
