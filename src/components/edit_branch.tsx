import { BranchInfo } from "@/lib/branch";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Input } from "./ui/input";

export interface BranchProps {
	branch: BranchInfo;
}

export default function EditBranch({ branch }: BranchProps) {
	const { t, i18n } = useTranslation();
	const [newName, setNewName] = useState<string>(branch.name);

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>
					{`${t("Edit branch")} ${branch.name} `}
					<Badge>{t(branch.kind || "Local")}</Badge>
				</SheetTitle>
			</SheetHeader>
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input
					type="text"
					value={newName}
					placeholder={t("New branch name")}
					onChange={(e) => {
						setNewName(e.target.value);
					}}
				></Input>
				<Button
					onClick={() =>
						newName && console.log(`rename from ${branch.name} to ${newName}`)
					}
				>
					{t("Rename")}
				</Button>
			</div>
			{branch.remote == null ? (
				<div>
					<Button>{t("Push")}</Button>
					<Button>{t("Pull")}</Button>
				</div>
			) : (
				<></>
			)}
		</SheetContent>
	);
}
