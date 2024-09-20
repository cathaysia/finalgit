import { useTranslation } from "react-i18next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppState } from "@/lib/state";

export default function AiCard() {
    const { t } = useTranslation();
    const endpoint = useAppState((s) => s.ollama_endpoint);

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="Ollama">
                <AccordionTrigger>{t("Ollama")}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    <div>
                        <Label htmlFor="ollama.endpoint">
                            {t("ollama.endpoint")}
                        </Label>
                        <Input
                            id="ollama_endpoint"
                            className="mt-2"
                            type="url"
                            value={endpoint}
                        />
                    </div>
                    <div>
                        <Label htmlFor="ollama.model">
                            {t("ollama.model")}
                        </Label>
                        <Input className="mt-2" type="text" id="ollama_model" />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
