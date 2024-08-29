import { fetchBranches } from "@/lib/action";
import { GitSideBar } from "@/components/GitSidebar";

export default async function Home() {
	const branches = await fetchBranches();

	return (
		<main className="flex min-h-screen">
			<aside className="w-1/4">
				<GitSideBar
					className="flex-col items-stretch justify-start"
					branches={branches}
				/>
			</aside>
			<div className="w-3/4 bg-gray-50 pl-2 pt-2">
				<p>content</p>
			</div>
		</main>
	);
}
