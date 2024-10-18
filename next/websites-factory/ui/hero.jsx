'use client'
import { forwardRef } from "react";
import { useGetThemeComponent } from "../useGetThemeComponent";

const componentUIGroup = 'hero'


export const Hero = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'Hero')
    return <Component {...props} refUI={ref}></Component>
})

Hero.displayName = "Hero"

export const HeroTitle = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'HeroTitle')
    return <Component {...props} refUI={ref}></Component>
})

HeroTitle.displayName = "HeroTitle"

export const HeroSubtitle = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'HeroSubtitle')
    return <Component {...props} refUI={ref}></Component>
})

HeroSubtitle.displayName = "HeroSubtitle"

export const HeroDescription = forwardRef(({ ...props }, ref) => {
    const Component = useGetThemeComponent(componentUIGroup, 'HeroDescription')
    return <Component {...props} refUI={ref}></Component>
})

HeroDescription.displayName = "HeroDescription"