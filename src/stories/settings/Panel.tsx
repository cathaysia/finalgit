import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import Nav from "./Nav";
import { MdHome } from "react-icons/md";

export interface PanelProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

interface NavItemProps {
    to: string;
    text: string | React.ReactNode;
}

export default function Panel({ className, ...props }: PanelProps) {
    const { t } = useTranslation();
    const navs: NavItemProps[] = [
        {
            to: "/",
            text: <MdHome />,
        },
        {
            to: "/settings/ai",
            text: t("Ai"),
        },
    ];
    return (
        <div className={cn("h-screen w-56 bg-slate-900", className)} {...props}>
            {navs.map((item) => {
                return (
                    <Nav
                        key={item.to}
                        to={item.to}
                        className="w-full h-16 border-b border-neutral-200 dark:border-slate-800 rounded-none"
                    >
                        {item.text}
                    </Nav>
                );
            })}
        </div>
    );
}
