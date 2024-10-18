'use client';

import { forwardRef } from "react";
import { useGetThemeComponent } from "../useGetThemeComponent";

const componentUIGroup = 'layout'


export const Container = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'Container')
    return <Component {...props} refUI={ref}></Component>
})

Container.displayName = "Container"

export const Section = forwardRef(({ variant, ...props }, ref) => {
    const type = "Section" + (variant || "")
    const Component = useGetThemeComponent(componentUIGroup, type)
    return <Component {...props} refUI={ref}></Component>
})

Section.displayName = "Section"