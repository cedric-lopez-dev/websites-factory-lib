import { twMerge } from "tailwind-merge"
export const Paragraph = ({ className, refUI, ...props }) => {
    return <p
        className={twMerge('mt-6 text-lg leading-8 text-gray-600', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </p>
}

export const Strong = ({ className, refUI, ...props }) => {
    return <strong
        className={twMerge('text-base font-semibold text-cyan-600', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </strong>
}