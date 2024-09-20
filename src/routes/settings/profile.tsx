import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ThemeCard from "@/stories/settings/ThemeCard";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/settings/profile")({
    component: ProfileComponent,
});

function ProfileComponent() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-4 items-center grow m-2">
            <div className="w-1/2 flex flex-col gap-4 items-center">
                <ThemeCard className="w-full" />
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>{t("profile.behaviour")}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-between">
                        <Label htmlFor="profile.stash">
                            {t("profile.stash_before_checkout")}
                        </Label>
                        <Checkbox id="profile.stash" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
