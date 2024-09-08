import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { ReactElement } from "react";

export interface NavProps {
	to: string;
	text: string | ReactElement;
}
export function Nav({ to, text }: NavProps) {
	return (
		<Link
			to={to}
			className={clsx(
				"inline-flex items-center justify-center whitespace-nowrap text-lg",
				"px-4 py-2 h-9 text-center w-24",
				"[&.active]:bg-neutral-900 [&.active]:font-bold  [&.active]:text-neutral-50",
				"hover:bg-neutral-200 dark:hover:bg-neutral-50/90 [&.active]:hover:bg-neutral-900/90",
			)}
		>
			{text}
		</Link>
	);
}