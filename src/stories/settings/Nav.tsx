import { cn } from "@/lib/utils";
import Link from "next/link";

export interface NavProps extends React.ComponentProps<typeof Link> {}

export default function Nav({ className, children, ...props }: NavProps) {
    return (
        <Link
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap text-lg px-4 py-2 h-9 text-center w-24 [&.active]:bg-neutral-900 [&.active]:font-bold  [&.active]:text-neutral-50 hover:bg-neutral-200 dark:hover:bg-neutral-50/90 [&.active]:hover:bg-neutral-900/90",
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
