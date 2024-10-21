'use client';

import { forwardRef } from "react";
import { useGetThemeComponent } from "../useGetThemeComponent";

const componentUIGroup = 'features'

export const Features = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'Features')
    return <Component {...props} refUI={ref}></Component>
})

Features.displayName = "Features"

export const Feature = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'Feature')
    return <Component {...props} refUI={ref}></Component>
})

Feature.displayName = "Feature"

export const FeatureContainer = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'FeatureContainer')
    return <Component {...props} refUI={ref}></Component>
})

FeatureContainer.displayName = "FeatureContainer"

export const FeatureTitle = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'FeatureTitle')
    return <Component {...props} refUI={ref}></Component>
})

FeatureTitle.displayName = "FeatureTitle"