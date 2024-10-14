'use client';
import React from "react"

export const ThemeContext = React.createContext(null)

export function useTheme() {
    const context = React.useContext(ThemeContext)
    return context
}