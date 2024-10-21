
import { twMerge } from 'tailwind-merge'
export const Button = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('inline-flex my-4 px-3 py-1 text-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 cursor-pointer font-semibold leading-7', className)}
        ref={refUI}
        {...props} >
        {props.children}
    </div>
}

