

import { twMerge } from "tailwind-merge"

export const Button = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('inline-flex rounded-full my-4 px-3 py-1 text-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 cursor-pointer font-semibold leading-7 text-cyan-600', className)}
        ref={refUI}
        {...props}
    >
        {props.children}
    </div>
}
Button.displayName = "Button"


