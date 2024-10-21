'use client'
import { forwardRef } from "react";
import { useGetThemeComponent } from "../useGetThemeComponent";

const componentUIGroup = 'icons'


export const Icon = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'Icon')
    return <Component {...props} refUI={ref}></Component>
})

Icon.displayName = "Icon"