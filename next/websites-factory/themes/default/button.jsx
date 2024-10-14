'use client'
export const Button = ({ className, test, ...props }) => {
    return <div
        className={`${className}`}
        {...props} >
        {props.children}
    </div>
}
Button.displayName = "Button"


