
import { twMerge } from "tailwind-merge"

export const Container = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </div>
}

export const Section = ({ className, refUI, ...props }) => {
    return <section
        className={twMerge('', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </section>
}
