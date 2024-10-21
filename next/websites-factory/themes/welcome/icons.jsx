import { twMerge } from "tailwind-merge"
export const Icon = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('flex rounded-lg items-center justify-center w-10 h-10 bg-cyan-600', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </div>
}