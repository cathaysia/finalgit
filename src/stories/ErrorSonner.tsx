import { Toaster } from "@/components/ui/sonner";
import { useErrorState } from "@/lib/error";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SonnerError() {
    const { err, clearError } = useErrorState();

    useEffect(() => {
        if (err) {
            toast(err);
            clearError();
        }
    }, [err, clearError]);

    return <Toaster />;
}
