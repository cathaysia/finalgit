import { BranchInfo, TagInfo } from "@/bindings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Children, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	FaArrowLeft,
	FaArrowRight,
	FaCodeBranch,
	FaFilter,
	FaTag,
} from "react-icons/fa";

export interface BranchCardProps {
	branches: BranchInfo[];
	tags: TagInfo[];
}

export default function BranchCard({ branches, tags }: BranchCardProps) {
	const { t, i18n } = useTranslation();
	const [filter, setFilter] = useState<string | null>(null);
	const [isBranch, setIsBranch] = useState<boolean>(true);

	return (
		<div className="w-full border flex justify-between px-4 py-3 items-center">
			<div className="flex gap-2 items-center">
				<Button variant={"ghost"} className="flex gap-2">
					{isBranch ? (
						<>
							<FaCodeBranch />
							{t("Branches")}
						</>
					) : (
						<>
							<FaTag />
							{t("Tags")}
						</>
					)}
				</Button>
			</div>
			{filter == null ? (
				<FaFilter
					onClick={() => {
						setFilter("");
					}}
				/>
			) : (
				<div className="flex gap-2 items-center">
					<Input
						value={filter || ""}
						onChange={(e) => {
							setFilter(e.target.value);
						}}
					/>
					<Button>{t("Enter")}</Button>
					<Button onClick={() => setFilter(null)} variant={"outline"}>
						{t("Cancel")}
					</Button>
				</div>
			)}
		</div>
	);
}
