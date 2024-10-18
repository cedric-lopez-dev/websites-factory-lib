
import { twMerge } from "tailwind-merge"

export const Features = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </div>
}