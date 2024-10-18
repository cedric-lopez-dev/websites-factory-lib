
import { twMerge } from 'tailwind-merge'
export const Button = ({ className, refUI, ...props }) => {
    return <div
        className={twMerge('', className)}
        ref={refUI}
        {...props} >
        {props.children}
    </div>
}

