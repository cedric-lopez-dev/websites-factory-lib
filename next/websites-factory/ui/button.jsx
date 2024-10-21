'use client';

import { forwardRef } from "react";
import { useGetThemeComponent } from "../useGetThemeComponent";

const componentUIGroup = 'button'

export const Button = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'Button')
    return <Component {...props} refUI={ref}></Component>
})

Button.displayName = "Button"