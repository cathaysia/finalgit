import MainPanel from "@/stories/panels/MainPanel";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: () => {
        return (
            <>
                <MainPanel
                    project_name={""}
                    branches={[]}
                    tags={[]}
                    changeSet={[]}
                    branchName={""}
                />
                <hr />
                <Outlet />
                <TanStackRouterDevtools />
            </>
        );
    },
});
