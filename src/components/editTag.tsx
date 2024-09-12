import type { TagInfo } from "@/bindings";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

export interface BranchProps {
    tag: TagInfo;
}

export default function EditTag({ tag }: BranchProps) {
    const { t } = useTranslation();
    const [newName, setNewName] = useState<string>(tag.name);

    return (
        <SheetContent title={t("tag.edit_tag")}>
            <SheetHeader>
                <SheetTitle>
                    {`${t("tag.edit_tag")} ${tag.name} `}
                    <Badge>{tag.commit.slice(0, 6)}</Badge>
                </SheetTitle>
            </SheetHeader>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                    type="text"
                    value={newName}
                    placeholder={t("tag.new_tag_name")}
                    onChange={(e) => {
                        setNewName(e.target.value);
                    }}
                />
                <Button
                    onClick={() =>
                        newName &&
                        console.log(`rename from ${tag.name} to ${newName}`)
                    }
                >
                    {t("Rename")}
                </Button>
                <Button
                    onClick={() =>
                        newName &&
                        console.log(`rename from ${tag.name} to ${newName}`)
                    }
                >
                    {t("Delete")}
                </Button>
            </div>
            <div>
                <Button>{t("Push")}</Button>
                <Button>{t("Pull")}</Button>
            </div>
        </SheetContent>
    );
}
