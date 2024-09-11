import { FileStatus } from "@/bindings";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";

export interface WorkspacePanelProps
	extends React.HtmlHTMLAttributes<HTMLDivElement> {
	branchName: string;
	upstream?: string;
	changeSet: FileStatus[];
}

export default function WorkspacePanel({
	className,
	branchName,
	upstream,
	changeSet,
	...props
}: WorkspacePanelProps) {
	const { t, i18n } = useTranslation();

	return (
		<div className={cn(className)} {...props}>
			<div className="rounded flex flex-col gap-2 border shadow">
				<div>{branchName}</div>
				{upstream && <Badge className="w-fit">{upstream}</Badge>}
				<div className="flex justify-between">
					<Button>{t("Set as default")}</Button>
					<Button>{t("Create PR")}</Button>
				</div>
			</div>
			<div className="flex flex-col gap-2 rounded">
				<div>
					<span>{t("Changed files")} </span>
					<Avatar className="bg-gray-50 inline-block">
						{changeSet.length}
					</Avatar>
				</div>
				<div>
					{changeSet.map((item) => {
						return <div>{item.path}</div>;
					})}
				</div>
			</div>
			<div>
				<Button>{t("Start commit")}</Button>
			</div>
		</div>
	);
}
