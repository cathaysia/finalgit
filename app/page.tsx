import { fetchBranches, fetchCommits, fetchTags } from "@/lib/action";
import { GitSideBar } from "@/components/GitSidebar";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CommitInfo, CommitPanel } from "@/components/CommitPanel";

export default async function Home() {
	const branches = await fetchBranches();
	const tags = await fetchTags();
	// const [branch, setBranch] = useState<string>();
	let commits: CommitInfo[] = [];
	// if (branch) {
	commits = await fetchCommits("master");
	// }

	return (
		<main className="flex min-h-screen">
			<ResizablePanelGroup direction="horizontal" className="min-h-screen">
				<ResizablePanel defaultSize={15} className="min-w-52">
					<GitSideBar
						className="flex-col items-stretch justify-start border-r-slate-200 dark:border-r-slate-800"
						branches={branches}
						tags={tags}
						// on_branch={setBranch}
					/>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={85}>
					<CommitPanel commits={commits} />
					<p>content</p>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
