import Link from "next/link";
import { PiTarget } from "react-icons/pi";

export interface BranchCardProps {
	className?: string;
}

export default function Default({ className }: BranchCardProps) {
	return (
		<div className={className}>
			<Link
				className="w-full h-20 text-center text-2xl inline-flex justify-center items-center"
				href="/"
			>
				<PiTarget className="text-red-500" />
				Master
			</Link>
		</div>
	);
}
