import { commands } from "@/bindings";
import { Nav } from "@/components/Nav";
import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import { useErrorState } from "@/lib/error";
import { useCommitState, useOpenState } from "@/lib/state";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { open } from "@tauri-apps/plugin-dialog";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { match } from "ts-pattern";

export const Route = createRootRoute({
    component: () => {
        const setIsOpened = useOpenState((s) => s.setIsOpened);
        const { err, setError, clearError } = useErrorState();
        const commit = useCommitState((s) => s.commit);
        const t = useTranslation().t;

        useEffect(() => {
            if (err) {
                toast(err);
                clearError();
            }
        }, [err, clearError]);

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
                                                .with({ status: "ok" }, (_) => {
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
                            title={t("worksapce.open_repo")}
                        >
                            {commit
                                ? commit.slice(0, 6)
                                : t("worksapce.open_repo")}
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
