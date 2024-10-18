'use client';

import { forwardRef } from "react";
import { useGetThemeComponent } from "../useGetThemeComponent";

const componentUIGroup = 'features'

export const Features = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'Features')
    return <Component {...props} refUI={ref}></Component>
})

Features.displayName = "Features"