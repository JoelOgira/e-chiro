"use client";

import { useState, useEffect } from "react";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
    const [isMounted, setIsMounted] = useState(false)
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button
            className="focus:outline-none focus:border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
        >
            {theme === "light" ? (
                <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : (
                <MoonStar className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
