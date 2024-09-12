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
import { BsChevronExpand } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { MdAddToPhotos } from "react-icons/md";

export interface ProjectProps {
    current?: string;
    projects?: string[];
    className?: string;
}

export default function Project({
    current,
    projects = [],
    className,
}: ProjectProps) {
    const { t } = useTranslation();

    if (!current) {
        return (
            <Button className="w-full">
                {t("project.add_local_repository")}
            </Button>
        );
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className={cn("w-full flex justify-between", className)}
                    >
                        <span>{current}</span>
                        <BsChevronExpand />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={cn("w-full", className)}>
                    <DropdownMenuGroup>
                        {projects.map((item) => {
                            return (
                                <DropdownMenuItem
                                    key={item}
                                    className={cn(
                                        "flex justify-between",
                                        item === current && "bg-slate-200",
                                    )}
                                >
                                    <span>{item}</span>
                                    {item === current && (
                                        <FaCheck className="w-4 h-4 ml-2" />
                                    )}
                                </DropdownMenuItem>
                            );
                        })}
                        {projects.length !== 0 && <DropdownMenuSeparator />}
                        <DropdownMenuItem className="flex justify-between">
                            <span>{t("project.add_local_repository")}</span>
                            <IoIosAdd className="w-4 h-4 ml-2" />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex justify-between">
                            <span>{t("project.clone_repository")}</span>
                            <MdAddToPhotos className="w-4 h-4 ml-2" />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
