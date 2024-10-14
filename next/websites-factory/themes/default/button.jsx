'use client'
export const Button = ({ className, test, ...props }) => {
    return <div
        className={`relative rounded-full my-4 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 ${className}`}
        {...props} >
        {props.children}
    </div>
}
Button.displayName = "Button"


