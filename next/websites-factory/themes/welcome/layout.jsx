
import { twMerge } from "tailwind-merge"

export const Container = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge(' mx-auto max-w-7xl px-6 lg:px-8', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </div>
}

export const Section = ({ className, refUI, ...props }) => {
    return <section
        className={twMerge('py-8 lg:py-12', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </section>
}