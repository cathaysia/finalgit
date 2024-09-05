import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { open } from "@tauri-apps/plugin-dialog";
import { useOpenState } from "@/lib/state";
import { commands } from "@/bindings";
import { match } from "ts-pattern";

export const Route = createRootRoute({
	component: () => {
		const { isOpened, setIsOpened } = useOpenState();

		return (
			<>
				<div className="pl-2 pr-2 flex items-center h-16 justify-between">
					<div>
						<Link to="/" className="[&.active]:font-bold">
							Home
						</Link>{" "}
						<Link to="/filetree" className="[&.active]:font-bold">
							Files
						</Link>
						<Link to="/about" className="[&.active]:font-bold">
							About
						</Link>
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
												.with({ status: "error" }, (err) => {
													console.log(err);
												});
										});
								});
							}}
						>
							Open Repo
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
