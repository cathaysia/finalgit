"use client";
import clsx from "clsx";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { FaCodeBranch } from "react-icons/fa";
import { Button } from "./ui/button";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import { cn } from "@/lib/utils";

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
		<div
			className={clsx(
				"flex justify-between items-center w-full h-20 border-l-4 hover:border-slate-800",
				{
					"bg-sky-100 text-blue-600": currentBranch == key,
				},
			)}
		>
			<Link className={clsx("p-4 text-left w-4/5")} href={href} title={branch}>
				<div className="flex">
					<FaCodeBranch className="inline" />
					<p>{branch}</p>
				</div>
				<Badge>{remote ? remote : "local"}</Badge>
			</Link>
			<Button
				className="bg-blue-800 text-white h-16 rounded-none"
				onClick={() => {
					console.log(`remove ${branch}`);
				}}
			>
				<MdEdit />
			</Button>
			<Button
				className="bg-red-800 text-white h-16 rounded-none"
				onClick={() => {
					console.log(`remove ${branch}`);
				}}
			>
				<MdDelete />
			</Button>
		</div>
	);
}
