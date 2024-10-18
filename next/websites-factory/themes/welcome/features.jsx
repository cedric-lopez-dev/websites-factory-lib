
import { twMerge } from "tailwind-merge"

export const Features = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16', className)}
        ref={refUI}
        {...props}
    >
        {props.children}

    </div>
}