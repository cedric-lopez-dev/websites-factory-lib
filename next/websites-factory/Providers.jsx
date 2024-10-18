'use client';
import { useState } from "react";
import { ThemeContext } from "./themeContext";

export const Providers = ({ themeTemplate, children }) => {
    const [theme, setTheme] = useState(themeTemplate);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}