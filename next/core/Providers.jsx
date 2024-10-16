'use client';
import React from "react"
import { ThemeContext } from "./themeContext";

export function Providers({ children }) {
    const [theme, setTheme] = React.useState("welcome");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}