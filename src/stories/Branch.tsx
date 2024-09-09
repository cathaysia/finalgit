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
}

export default function Branch({
	branch,
	is_head = false,
	is_local = true,
	upstream,
	className,
}: BranchProps) {
	const { t, i18n } = useTranslation();
	const [isRenaming, setIsRenaming] = useState<boolean>(false);

	return (
		<div
			className={cn(
				"w-full flex justify-between rounded-md border px-4 py-3 items-center dark:bg-neutral-900 dark:text-white gap-2",
				is_head && "border-green-600",
				className,
			)}
		>
			{!isRenaming ? (
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
						onKeyUp={(e) => {
							if (e.key == "Escape") {
								setIsRenaming(false);
							}
						}}
					/>
				</div>
			)}
			<div>
				{!isRenaming ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={"ghost"} size="sm">
								<DotsHorizontalIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => setIsRenaming(true)}>
									{t("Rename")}
								</DropdownMenuItem>
								{!is_head && (
									<DropdownMenuItem>{t("Checkout")}</DropdownMenuItem>
								)}
								<DropdownMenuItem>{t("Details")}</DropdownMenuItem>
								<DropdownMenuItem>{t("Set upstream")}</DropdownMenuItem>
								<DropdownMenuItem>{t("Pull")}</DropdownMenuItem>
								<DropdownMenuItem>{t("Push")}</DropdownMenuItem>
								<DropdownMenuItem className="text-red-600">
									{t("Delete")}
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<div className="flex gap-2">
						<Button onClick={() => setIsRenaming(false)}>{t("Enter")}</Button>
						<Button onClick={() => setIsRenaming(false)} variant={"outline"}>
							{t("Cancel")}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
