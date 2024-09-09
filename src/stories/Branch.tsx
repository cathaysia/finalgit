import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { FaCodeBranch, FaInfo, FaInfoCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export interface BranchProps {
	branch: string;
	is_head?: boolean;
	is_local?: boolean;
	upstream?: string;
	className?: string;
	on_rename?: (name: string) => void;
	on_delete?: () => void;
}

export default function Branch({
	branch,
	is_head = false,
	is_local = true,
	upstream,
	className,
	on_rename,
	on_delete,
}: BranchProps) {
	const { t, i18n } = useTranslation();
	const [newName, setNewName] = useState<string>();

	return (
		<div
			className={cn(
				"w-full flex justify-between rounded-md border px-4 py-3 items-center dark:bg-neutral-900 dark:text-white gap-2",
				is_head && "border-green-600",
				className,
			)}
		>
			{!newName ? (
				<p className="text-sm font-medium leading-none items-center flex gap-2">
					<FaCodeBranch className="inline-bloc" />
					<span>{branch}</span>
					<Badge>{is_local ? t("Local") : t("Remote")}</Badge>
					{upstream && <Badge>{upstream}</Badge>}
				</p>
			) : (
				<div className="w-full">
					<Input
						type="text"
						autoFocus
						value={newName}
						onChange={(v) => setNewName(v.target.value)}
						onKeyUp={(e) => {
							if (newName && e.key == "Escape") {
								setNewName(undefined);
							}
							if (newName && e.key == "Enter") {
								on_rename && on_rename(newName);
								setNewName(undefined);
							}
						}}
					/>
				</div>
			)}
			<div>
				{!newName ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={"ghost"} size="sm">
								<DotsHorizontalIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => setNewName(branch)}>
									{t("Rename")}
								</DropdownMenuItem>
								{!is_head && (
									<DropdownMenuItem>{t("Checkout")}</DropdownMenuItem>
								)}
								<DropdownMenuItem>{t("Details")}</DropdownMenuItem>
								<DropdownMenuItem>{t("Set upstream")}</DropdownMenuItem>
								<DropdownMenuItem>{t("Pull")}</DropdownMenuItem>
								<DropdownMenuItem>{t("Push")}</DropdownMenuItem>
								<DropdownMenuItem
									className="text-red-600"
									onClick={() => {
										on_delete && on_delete();
									}}
								>
									{t("Delete")}
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<div className="flex gap-2">
						<Button
							onClick={() => {
								on_rename && on_rename(newName);
							}}
						>
							{t("Enter")}
						</Button>
						<Button onClick={() => setNewName(undefined)} variant={"outline"}>
							{t("Cancel")}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
