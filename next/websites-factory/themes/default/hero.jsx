
import { twMerge } from "tailwind-merge"

export const Hero = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </div>
}

export const HeroTitle = ({ className, refUI, ...props }) => {
    return <h2
        className={twMerge('', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </h2>
}

export const HeroSubtitle = ({ className, refUI, ...props }) => {
    return <h3
        className={twMerge('', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </h3>
}
export const HeroDescription = ({ className, refUI, ...props }) => {
    return <p
        className={twMerge('', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </p>
}