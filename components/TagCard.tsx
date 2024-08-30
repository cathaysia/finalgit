"use client";
import clsx from "clsx";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { FaCodeBranch, FaTag } from "react-icons/fa";

export interface TagCardProps {
	name: string;
	hash: string;
}

export default function TagCard({ name, hash: commit }: TagCardProps) {
	return (
		<Link
			className={clsx(
				"p-4 block w-full text-left h-20 border-l-4 hover:border-slate-800",
			)}
			href=""
		>
			<FaTag />
			<p>{name}</p>
			<Badge>{commit.slice(0, 6)}</Badge>
		</Link>
	);
}
