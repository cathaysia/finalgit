import { fetchBranches, fetchTags } from "@/lib/action";
import { GitSideBar } from "@/components/GitSidebar";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

export default async function Home() {
	const branches = await fetchBranches();
	const tags = await fetchTags();

	return (
		<main className="flex min-h-screen">
			<ResizablePanelGroup direction="horizontal" className="min-h-screen">
				<ResizablePanel defaultSize={15} className="min-w-52">
					<GitSideBar
						className="flex-col items-stretch justify-start border-r-slate-200 dark:border-r-slate-800"
						branches={branches}
						tags={tags}
					/>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={85}>
					<p>content</p>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
