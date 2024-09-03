import { createLazyFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { BranchInfo, TagInfo } from "../lib/branch";

import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

export interface OpenState {
	isOpened: boolean;
	setIsOpened: (isOpened: boolean) => void;
}

const useOpenState = create<OpenState>((set) => ({
	isOpened: false,
	setIsOpened: (isOpened: boolean) => set({ isOpened: isOpened }),
}));

function Index() {
	const { isOpened, setIsOpened } = useOpenState();
	const [branches, setBranches] = useState<BranchInfo[]>();
	const [tags, setTags] = useState<TagInfo[]>();
	const { t, i18n } = useTranslation();
	const [target, setTarget] = useState<BranchInfo>();

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
			<Button
				onClick={() => {
					open({
						directory: true,
					}).then((dir) => {
						dir &&
							invoke("open_repo", {
								repoPath: dir,
							}).then(() => {
								console.log(`open repo: ${dir}`);
								setIsOpened(true);
							});
					});
				}}
			>
				Open Repo
			</Button>
			<Sheet>
				<Tabs defaultValue="local">
					<TabsList>
						<TabsTrigger value="local">{t("Local")}</TabsTrigger>
						<TabsTrigger value="remote">{t("Remote")}</TabsTrigger>
						<TabsTrigger value="tags">{t("Tag")}</TabsTrigger>
					</TabsList>
					<TabsContent value="local">
						{branches &&
							branches
								.filter((v) => v.kind == "Local")
								.map((value) => {
									return (
										<SheetTrigger
											asChild
											onClick={() => {
												setTarget(value);
											}}
										>
											<li className="p-4 border text-center hover:bg-slate-50 flex justify-center">
												<a className="pr-4 pl-4">{value.name}</a>
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
												setTarget(value);
											}}
										>
											<li className="p-4 border text-center hover:bg-slate-50 flex justify-center">
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
									<li className="p-4 border text-center hover:bg-slate-50 flex justify-center">
										<a className="pr-4 pl-4">{value.name}</a>
										<Badge>{value.commit.slice(0, 6)}</Badge>
									</li>
								);
							})}
					</TabsContent>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Edit {target && target.name}</SheetTitle>
						</SheetHeader>
					</SheetContent>
					<div></div>
				</Tabs>
			</Sheet>
		</div>
	);
}
