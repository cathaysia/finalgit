import { BranchInfo } from "@/lib/branch";
import {
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "./ui/sheet";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Input } from "./ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

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
			<SheetDescription>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>{t("Branch Name")}</TableCell>
							<TableCell>{branch.name}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>{t("Commit")}</TableCell>
							<TableCell>{branch.commit}</TableCell>
						</TableRow>
						{branch.upstream && (
							<TableRow>
								<TableCell>{t("Upstream")}</TableCell>
								<TableCell>{branch.upstream}</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</SheetDescription>
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
						newName &&
						newName != branch.name &&
						invoke("create_branch", {
							name: newName,
							commit: branch.commit,
						})
					}
				>
					{t("Create")}
				</Button>
			</div>
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
						newName &&
						newName != branch.name &&
						invoke("rename_branch", {
							info: branch,
							to: newName,
						})
					}
				>
					{t("Rename")}
				</Button>
			</div>
			<div>
				{branch.remote == null ? (
					<>
						<Button>{t("Push")}</Button>
						<Button>{t("Pull")}</Button>
					</>
				) : (
					<></>
				)}
				<Button
					onClick={() =>
						invoke("remove_branch", {
							info: branch,
						})
					}
				>
					{t("Delete")}
				</Button>
				{branch.kind == "Local" && !branch.is_head && (
					<Button
						onClick={() =>
							invoke("checkout_branch", {
								branch: branch.name,
							})
						}
					>
						{t("Checkout")}
					</Button>
				)}
			</div>
		</SheetContent>
	);
}
