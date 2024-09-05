import { BranchInfo, TagInfo } from "@/bindings";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";

export interface BranchProps {
	tag: TagInfo;
}

export default function EditTag({ tag }: BranchProps) {
	const { t, i18n } = useTranslation();
	const [newName, setNewName] = useState<string>(tag.name);

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>
					{`${t("Edit Tag")} ${tag.name} `}
					<Badge>{tag.commit.slice(0, 6)}</Badge>
				</SheetTitle>
			</SheetHeader>
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input
					type="text"
					value={newName}
					placeholder={t("New tag name")}
					onChange={(e) => {
						setNewName(e.target.value);
					}}
				></Input>
				<Button
					onClick={() =>
						newName && console.log(`rename from ${tag.name} to ${newName}`)
					}
				>
					{t("Rename")}
				</Button>
			</div>
			<div>
				<Button>{t("Push")}</Button>
				<Button>{t("Pull")}</Button>
			</div>
		</SheetContent>
	);
}
