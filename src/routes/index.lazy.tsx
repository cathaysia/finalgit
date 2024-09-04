import { createLazyFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { BranchInfo, TagInfo } from "../lib/branch";
import EditBranch from "@/components/edit_branch";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useOpenState } from "@/lib/state";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditTag from "@/components/edit_tag";
import { FaCodeBranch, FaTag } from "react-icons/fa";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	const { isOpened, setIsOpened } = useOpenState();
	const [branches, setBranches] = useState<BranchInfo[]>();
	const [tags, setTags] = useState<TagInfo[]>();
	const { t, i18n } = useTranslation();
	const [targetBranch, setTargetBranch] = useState<BranchInfo>();
	const [targetTag, setTargetTag] = useState<TagInfo>();

	invoke("is_opened").then((value) => {
		if (value) {
			if (!isOpened) {
				setIsOpened(true);
			}
		}
	});

	useEffect(() => {
		if (!isOpened) {
			return;
		}

		invoke("get_branch_info").then((values) => {
			let value = values as BranchInfo[];
			setBranches(value);
		});
		invoke("get_tag_info").then((values) => {
			let value = values as TagInfo[];
			setTags(value);
		});
	}, [isOpened]);

	return (
		<div>
			<Sheet>
				<Tabs defaultValue="local">
					<TabsList className="flex items-center">
						<TabsTrigger value="local">{t("Local")}</TabsTrigger>
						<TabsTrigger value="remote">{t("Remote")}</TabsTrigger>
						<TabsTrigger value="tags">{t("Tag")}</TabsTrigger>
					</TabsList>
					<ScrollArea className="h-screen">
						<TabsContent value="local">
							{branches &&
								branches
									.filter((v) => v.kind == "Local")
									.map((value) => {
										return (
											<SheetTrigger
												asChild
												onClick={() => {
													setTargetBranch(value);
												}}
											>
												<li className="p-4 border text-center hover:bg-slate-50 flex justify-center">
													<FaCodeBranch />
													<a className="pr-4 pl-4">
														{value.name + (value.is_head ? "*" : "")}
													</a>
													<Badge>{value.kind || "Local"}</Badge>
												</li>
											</SheetTrigger>
										);
									})}
						</TabsContent>
						<TabsContent value="remote">
							{branches &&
								branches
									.filter((v) => v.kind == "Remote")
									.map((value) => {
										return (
											<SheetTrigger
												asChild
												onClick={() => {
													setTargetBranch(value);
													setTargetTag(undefined);
												}}
											>
												<li className="p-4 border text-center hover:bg-slate-50 flex justify-center">
													<FaCodeBranch />
													<a className="pr-4 pl-4">{value.name}</a>
													<Badge>{value.kind || "Local"}</Badge>
												</li>
											</SheetTrigger>
										);
									})}
						</TabsContent>
						<TabsContent value="tags">
							{tags &&
								tags.map((value) => {
									return (
										<SheetTrigger
											asChild
											onClick={() => {
												setTargetTag(value);
												setTargetBranch(undefined);
											}}
										>
											<li className="p-4 border text-center hover:bg-slate-50 flex justify-center">
												<FaTag />
												<a className="pr-4 pl-4">{value.name}</a>
												<Badge>{value.commit.slice(0, 6)}</Badge>
											</li>
										</SheetTrigger>
									);
								})}
						</TabsContent>
						<SheetContent>
							{targetBranch && <EditBranch branch={targetBranch} />}
							{targetTag && <EditTag tag={targetTag} />}
						</SheetContent>
					</ScrollArea>
				</Tabs>
			</Sheet>
		</div>
	);
}
