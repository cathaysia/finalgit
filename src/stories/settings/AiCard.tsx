"use client";
import { useTranslation } from "react-i18next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAiState } from "@/lib/state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ollama } from "@/lib/ai";

export default function AiCard() {
    const { t } = useTranslation();
    const [endpoint, models, setModels, current_model, setCurrentModel] =
        useAiState((s) => [
            s.ollama_endpoint,
            s.ollama_model,
            s.setOllamaModels,
            s.current_ollama_model,
            s.setOllamaModel,
        ]);

    useQuery({
        queryKey: ["ollama_model"],
        queryFn: async () => {
            const v = await ollama.queryModels(endpoint);
            const res = v.models.map((item) => item.model);
            setModels(res);
            if (!current_model && res.length > 0) {
                setCurrentModel(res[0]);
            }
            return 0;
        },
    });

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{t("profile.ai_provider")}</CardTitle>
            </CardHeader>
            <CardContent>
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
                                <Select
                                    onValueChange={(value) =>
                                        setCurrentModel(value)
                                    }
                                    defaultValue={current_model}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={current_model}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {models.map((item) => {
                                            return (
                                                <SelectItem
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                <div className="w-full flex gap-2 items-center">
                                    <Input
                                        className="mt-2"
                                        type="text"
                                        id="ollama_model"
                                    />
                                    <Button>{t("ollama.add_model")}</Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
