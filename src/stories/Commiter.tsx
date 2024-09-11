import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaMagic } from "react-icons/fa";

export interface CommiterProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default function Commiter({ className, ...props }: CommiterProps) {
    const { t, i18n } = useTranslation();
    const [isCommiting, setIsCommiting] = useState(false);

    if (!isCommiting) {
        return (
            <div className={cn(className)}>
                <Button className="w-full" onClick={() => setIsCommiting(true)}>
                    {t("Start commit")}
                </Button>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-2", className)} {...props}>
            <div className="flex flex-col gap-2">
                <Textarea placeholder={t("Commit summary")}></Textarea>
                <Button>
                    <FaMagic className="w-4 h-4 mr-2" />
                    {t("Generate message")}
                </Button>
            </div>
            <div className="flex gap-2">
                <Button className="w-4/5">{t("Commit")}</Button>
                <Button
                    className="w-1/5"
                    variant={"outline"}
                    onClick={() => setIsCommiting(false)}
                >
                    {t("Cancel")}
                </Button>
            </div>
        </div>
    );
}
