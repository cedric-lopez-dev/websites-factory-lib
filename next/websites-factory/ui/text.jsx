'use client'
import { forwardRef } from "react";
import { useGetThemeComponent } from "../useGetThemeComponent";

const componentUIGroup = 'text'


export const Paragraph = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'Paragraph')
    return <Component {...props} refUI={ref}></Component>
})

Paragraph.displayName = "Paragraph"

export const Strong = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'Strong')
    return <Component {...props} refUI={ref}></Component>
})

Strong.displayName = "Strong"