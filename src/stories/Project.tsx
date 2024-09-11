import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { MdAddToPhotos } from "react-icons/md";
import { BsChevronExpand } from "react-icons/bs";

export interface ProjectProps {
	current: string;
	projects?: string[];
	className?: string;
}

export default function Project({
	current,
	projects = [],
	className,
}: ProjectProps) {
	const { t, i18n } = useTranslation();
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className={cn("w-52 flex justify-between", className)}>
						<span>{current}</span>
						<BsChevronExpand />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className={cn("w-52", className)}>
					<DropdownMenuGroup>
						{projects.map((item) => {
							return (
								<DropdownMenuItem
									className={cn(
										"flex justify-between",
										item == current && "bg-slate-200",
									)}
								>
									<span>{item}</span>
									{item == current && <FaCheck />}
								</DropdownMenuItem>
							);
						})}
						{projects.length != 0 && <DropdownMenuSeparator />}
						<DropdownMenuItem className="flex justify-between">
							<span>{t("Add local repository")}</span>
							<IoIosAdd />
						</DropdownMenuItem>
						<DropdownMenuItem className="flex justify-between">
							<span>{t("Clone repository")}</span>
							<MdAddToPhotos />
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
