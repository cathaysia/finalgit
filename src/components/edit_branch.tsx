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
import { Input } from "./ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import {
	checkout_branch,
	create_branch,
	remove_branch,
	rename_branch,
} from "@/lib/api";

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
						create_branch(newName, branch.commit)
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
						newName && newName != branch.name && rename_branch(branch, newName)
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
				<Button onClick={() => remove_branch(branch)}>{t("Delete")}</Button>
				{branch.kind == "Local" && (
					<Button
						onClick={() => checkout_branch(branch.name)}
						disabled={branch.is_head}
					>
						{t("Checkout")}
					</Button>
				)}
			</div>
		</SheetContent>
	);
}
