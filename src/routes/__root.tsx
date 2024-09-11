import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { open } from "@tauri-apps/plugin-dialog";
import { useCommitState, useOpenState } from "@/lib/state";
import { commands } from "@/bindings";
import { match } from "ts-pattern";
import { useErrorState } from "@/lib/error";
import { useEffect } from "react";
import { toast } from "sonner";
import { Nav } from "@/components/Nav";
import { FaHome } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const Route = createRootRoute({
    component: () => {
        const setIsOpened = useOpenState((s) => s.setIsOpened);
        const { err, setError, clearError } = useErrorState();
        const commit = useCommitState((s) => s.commit);
        const { t, i18n } = useTranslation();

        useEffect(() => {
            if (err) {
                toast(err);
                clearError();
            }
        }, [err]);

        return (
            <>
                <div className="pl-2 pr-2 flex items-center h-16 justify-between">
                    <div>
                        <Nav to="/" text={t("Home")} />
                        <Nav to="/filetree" text={t("File")} />
                        <Nav to="/file_content" text={t("Content")} />
                        <Nav to="/status" text={t("Status")} />
                        <Nav to="/about" text={t("About")} />
                    </div>
                    <div className="flex w-40 justify-between">
                        <Button
                            onClick={() => {
                                open({
                                    directory: true,
                                }).then((dir) => {
                                    dir &&
                                        commands.openRepo(dir).then((v) => {
                                            match(v)
                                                .with({ status: "ok" }, (v) => {
                                                    setIsOpened(true);
                                                })
                                                .with(
                                                    { status: "error" },
                                                    (err) => {
                                                        setError(err.error);
                                                    },
                                                );
                                        });
                                });
                            }}
                            title={t("Open Repo")}
                        >
                            {commit ? commit.slice(0, 6) : t("Open Repo")}
                        </Button>
                        <ModeToggle />
                    </div>
                </div>
                <hr />
                <Outlet />
                <TanStackRouterDevtools />
            </>
        );
    },
});
