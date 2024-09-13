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
import { open } from "@tauri-apps/plugin-dialog";
import { match } from "ts-pattern";
import { commands } from "@/bindings";
import { useErrorState } from "@/lib/error";
import { useAppState } from "@/lib/state";

export interface ProjectProps {
    projects?: string[];
    className?: string;
}

export default function Project({ projects = [], className }: ProjectProps) {
    const { t } = useTranslation();
    const setError = useErrorState((s) => s.setError);
    const [repo_path, setRepoPath] = useAppState((s) => [
        s.repo_path,
        s.setRepoPath,
    ]);

    function open_repo() {
        open({
            directory: true,
        }).then((value) => {
            value &&
                commands.openRepo(value).then((res) => {
                    match(res)
                        .with({ status: "ok" }, () => {
                            setRepoPath(value);
                        })
                        .with({ status: "error" }, (err) => {
                            setError(err.error);
                        });
                });
        });
    }

    if (!repo_path) {
        return (
            <Button className="w-full" onClick={open_repo}>
                {t("project.add_local_repository")}
            </Button>
        );
    }
    const current = repo_path.split("/").at(-1);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className={cn("w-full flex justify-between", className)}
                    >
                        {current}
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
                        <DropdownMenuItem
                            className="flex justify-between"
                            onClick={open_repo}
                        >
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
