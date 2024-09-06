import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileStatus, commands } from "@/bindings";
import { useOpenState } from "@/lib/state";
import { match } from "ts-pattern";
import { useErrorState } from "@/lib/error";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

export const Route = createLazyFileRoute("/status")({
	component: StatusComponent,
});

function StatusComponent() {
	const [status, setStatus] = useState<FileStatus[]>([]);
	const setError = useErrorState((s) => s.setError);
	const isOpened = useOpenState((s) => s.isOpened);

	useEffect(() => {
		commands.getCurrentStatus().then((v) => {
			match(v)
				.with({ status: "ok" }, (v) => {
					setStatus(v.data);
				})
				.with({ status: "error" }, (err) => {
					setError(err.error);
				});
		});
	}, [isOpened]);
	return (
		<ScrollArea className="w-screen h-screen ">
			<div className="flex flex-col">
				{status
					.filter((item) => {
						return !(item.status & GIT_STATUS_IGNORED);
					})
					.map((item) => {
						let badge = generate_badge(item.status);
						return (
							<a
								key={item.path}
								className={clsx(
									"w-full h-12 border",
									(item.status & GIT_STATUS_INDEX_NEW ||
										item.status & GIT_STATUS_INDEX_MODIFIED ||
										item.status & GIT_STATUS_INDEX_DELETED ||
										item.status & GIT_STATUS_INDEX_RENAMED ||
										item.status & GIT_STATUS_INDEX_TYPECHANGE) &&
										"text-green-600",
								)}
							>
								{item.path} {badge}
							</a>
						);
					})}
			</div>
		</ScrollArea>
	);
}

function generate_badge(status: number) {
	if (status & GIT_STATUS_INDEX_NEW || status & GIT_STATUS_WT_NEW) {
		return <Badge title="new file">N</Badge>;
	}
	if (status & GIT_STATUS_INDEX_MODIFIED || status & GIT_STATUS_WT_MODIFIED) {
		return <Badge title="modified">M</Badge>;
	}
	if (status & GIT_STATUS_INDEX_DELETED || status & GIT_STATUS_WT_DELETED) {
		return <Badge title="deleted">D</Badge>;
	}
	if (status & GIT_STATUS_INDEX_RENAMED || status & GIT_STATUS_WT_RENAMED) {
		return <Badge title="rename">R</Badge>;
	}
	if (
		status & GIT_STATUS_INDEX_TYPECHANGE ||
		status & GIT_STATUS_WT_TYPECHANGE
	) {
		return <Badge title="type chagne">T</Badge>;
	}

	if (status & GIT_STATUS_WT_UNREADABLE) {
		return <Badge title="unreachable">U</Badge>;
	}

	if (status & GIT_STATUS_CONFLICTED) {
		return <Badge title="conflict">C</Badge>;
	}

	return null;
}

const GIT_STATUS_CURRENT: number = 0;

const GIT_STATUS_INDEX_NEW: number = 1 << 0;
const GIT_STATUS_INDEX_MODIFIED: number = 1 << 1;
const GIT_STATUS_INDEX_DELETED: number = 1 << 2;
const GIT_STATUS_INDEX_RENAMED: number = 1 << 3;
const GIT_STATUS_INDEX_TYPECHANGE: number = 1 << 4;

const GIT_STATUS_WT_NEW: number = 1 << 7;
const GIT_STATUS_WT_MODIFIED: number = 1 << 8;
const GIT_STATUS_WT_DELETED: number = 1 << 9;
const GIT_STATUS_WT_TYPECHANGE: number = 1 << 10;
const GIT_STATUS_WT_RENAMED: number = 1 << 11;
const GIT_STATUS_WT_UNREADABLE: number = 1 << 12;

const GIT_STATUS_IGNORED: number = 1 << 14;
const GIT_STATUS_CONFLICTED: number = 1 << 15;
function generate_class_name(status: number) {
	let result = "";
	if (status & GIT_STATUS_INDEX_NEW) {
		result += "";
	}
}
