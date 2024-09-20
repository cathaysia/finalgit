"use client";
import { Toaster } from "@/components/ui/sonner";
import { useErrorState } from "@/lib/error";
import { useEffect } from "react";
import { toast } from "sonner";
import { error } from "@tauri-apps/plugin-log";

export default function SonnerError() {
    const { err, clearError } = useErrorState();

    useEffect(() => {
        if (err) {
            toast(err);
            error(err);
            clearError();
        }
    }, [err, clearError]);

    return <Toaster />;
}
