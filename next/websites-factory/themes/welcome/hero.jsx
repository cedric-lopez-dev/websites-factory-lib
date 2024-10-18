

import { twMerge } from "tailwind-merge"
import { Paragraph } from "./text"

export const Hero = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('max-w-2xl lg:text-center m-auto py-10', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </div>
}

export const HeroTitle = ({ className, refUI, ...props }) => {
    return <h2
        className={twMerge('text-base font-semibold leading-7 text-cyan-600', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </h2>
}

export const HeroSubtitle = ({ className, refUI, ...props }) => {
    return <h3
        className={twMerge('mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </h3>
}
export const HeroDescription = ({ className, refUI, ...props }) => {
    return <Paragraph
        className={twMerge('mt-6 text-lg leading-8 text-gray-600', className)}
        ref={refUI}
        {...props}>
        {props.children}
    </Paragraph>

}