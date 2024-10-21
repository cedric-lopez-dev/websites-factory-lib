
import { twMerge } from "tailwind-merge"

export const Features = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('m-auto max-w-5xl grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16', className)}
        ref={refUI}
        {...props}
    >
        {props.children}

    </div>
}

export const Feature = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('flex items-start gap-4', className)}
        ref={refUI}
        {...props}
    >
        {props.children}

    </div>
}

export const FeatureContainer = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('', className)}
        ref={refUI}
        {...props}
    >
        {props.children}

    </div>
}

export const FeatureTitle = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('text-base font-semibold leading-7 text-gray-900 mb-3', className)}
        ref={refUI}
        {...props}
    >
        {props.children}

    </div>
}