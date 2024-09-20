import { useTheme } from "@/components/themeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { MdSettings } from "react-icons/md";

export interface ThemeCardProps extends React.ComponentProps<typeof Card> {}

export default function ThemeCard({ className, ...props }: ThemeCardProps) {
    const { setTheme } = useTheme();

    return (
        <Card className={cn(className)} {...props}>
            <CardHeader>
                <CardTitle>Theme</CardTitle>
            </CardHeader>
            <CardContent className="w-full flex justify-between items-center">
                <Button className="w-1/4" onClick={() => setTheme("light")}>
                    <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
                <Button className="w-1/4" onClick={() => setTheme("dark")}>
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
                <Button className="w-1/4" onClick={() => setTheme("system")}>
                    <MdSettings className="absolute h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
            </CardContent>
        </Card>
    );
}