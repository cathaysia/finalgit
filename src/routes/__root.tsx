import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { useOpenState } from "@/lib/state";

export const Route = createRootRoute({
	component: () => {
		const { isOpened, setIsOpened } = useOpenState();

		return (
			<>
				<div className="p-2 flex gap-2">
					<Button
						className="inline"
						onClick={() => {
							open({
								directory: true,
							}).then((dir) => {
								dir &&
									invoke("open_repo", {
										repoPath: dir,
									}).then(() => {
										console.log(`open repo: ${dir}`);
										setIsOpened(true);
									});
							});
						}}
					>
						Open Repo
					</Button>
					<Link to="/" className="[&.active]:font-bold">
						Home
					</Link>{" "}
					<Link to="/about" className="[&.active]:font-bold">
						About
					</Link>
					<ModeToggle />
				</div>
				<hr />
				<Outlet />
				<TanStackRouterDevtools />
			</>
		);
	},
});
