import type { FileStatus } from "@/bindings";
import { cn } from "@/lib/utils";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import Commiter from "./Commiter";
import { useState } from "react";
import { debug } from "@tauri-apps/plugin-log";
import ChangeItem from "./ChangeItem";

export interface ChangeCardProps
    extends React.HtmlHTMLAttributes<HTMLDivElement> {
    changeSet: FileStatus[];
}

const formSchema = z.object({
    files: z.array(z.string()).refine((value) => value.some((item) => item)),
});

export default function ChangeCard({ className, changeSet }: ChangeCardProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            files: [],
        },
    });

    const [commitFiles, setCommitFiels] = useState<string[]>([]);
    const [isCommiting, setIsCommiting] = useState(false);

    function onSubmit(values: z.infer<typeof formSchema>) {
        let v = values.files;
        if (values.files.length === 0) {
            v = changeSet.map((item) => item.path);
        }
        debug(`set commit files: ${v}`);
        setIsCommiting(true);
        setCommitFiels(v);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("flex flex-col gap-2", className)}
            >
                <div className="grow">
                    {changeSet.map((item) => {
                        return (
                            <FormField
                                control={form.control}
                                name="files"
                                key={item.path}
                                render={({ field }) => {
                                    return (
                                        <ChangeItem
                                            item={item}
                                            checked={field.value?.includes(
                                                item.path,
                                            )}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([
                                                          ...field.value,
                                                          item.path,
                                                      ])
                                                    : field.onChange(
                                                          field.value?.filter(
                                                              (value) =>
                                                                  value !==
                                                                  item.path,
                                                          ),
                                                      );
                                            }}
                                        />
                                    );
                                }}
                            />
                        );
                    })}
                </div>
                <Separator />
                <Commiter
                    files={commitFiles}
                    isCommiting={isCommiting}
                    on_commit_complete={() => {
                        setIsCommiting(false);
                    }}
                />
            </form>
        </Form>
    );
}
