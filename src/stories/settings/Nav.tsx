import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavProps extends React.ComponentProps<typeof Link> {}

export default function Nav({ className, children, href, ...props }: NavProps) {
    const pathname = usePathname();

    return (
        <Link
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap text-lg px-4 py-2 h-9 text-center w-full",
                "border-neutral-200 text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
                pathname === href
                    ? "font-bold bg-neutral-200 dark:bg-neutral-900"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                className,
            )}
            href={href}
            {...props}
        >
            {children}
        </Link>
    );
}
