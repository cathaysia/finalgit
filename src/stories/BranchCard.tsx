import { BranchInfo, TagInfo } from "@/bindings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Children, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	FaArrowLeft,
	FaArrowRight,
	FaCodeBranch,
	FaFilter,
	FaTag,
} from "react-icons/fa";
import Branch from "./Branch";
import { cn } from "@/lib/utils";

export interface BranchCardProps {
	branches: BranchInfo[];
	tags: TagInfo[];
}

export default function BranchCard({ branches, tags }: BranchCardProps) {
	const { t, i18n } = useTranslation();
	const [filter, setFilter] = useState<string | null>(null);
	const [isBranch, setIsBranch] = useState<boolean>(true);

	return (
		<Tabs defaultValue="branch" className="border">
			<div className="w-full flex justify-between px-4 py-3 items-center gap-2">
				<TabsList
					className={cn(
						"hidden sm:flex sm:gap-2 sm:items-center",
						filter == null && "flex",
					)}
				>
					<TabsTrigger value="branch">
						<FaCodeBranch />
						{t("Branches")}
					</TabsTrigger>
					<TabsTrigger value="tags">
						<FaTag />
						{t("Tags")}
					</TabsTrigger>
				</TabsList>
				{filter == null ? (
					<FaFilter
						onClick={() => {
							setFilter("");
						}}
					/>
				) : (
					<>
						<Input
							value={filter || ""}
							onChange={(e) => {
								setFilter(e.target.value);
							}}
							autoFocus
							onKeyUp={(e) => {
								if (e.key == "Escape") {
									setFilter(null);
								}
							}}
						/>
						<Button onClick={() => setFilter(null)}>{t("Cancel")}</Button>
					</>
				)}
			</div>
			<div>
				<TabsContent value="branch" className="w-full flex flex-col">
					{branches
						.filter((item) => {
							if (!filter) {
								return true;
							}

							return item.name.includes(filter);
						})
						.map((item) => {
							return (
								<Branch
									branch={item.name}
									is_head={item.is_head}
									is_local={item.kind == "Local"}
									upstream={item.upstream || undefined}
								></Branch>
							);
						})}
				</TabsContent>
				<TabsContent value="tag"></TabsContent>
			</div>
		</Tabs>
	);
}
