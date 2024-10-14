'use client';

import { getThemeComponent } from "../getThemeComponent";

export const Button = ({ ...props }) => {
    const Component = getThemeComponent('button', 'Button')
    return <Component {...props}></Component>
}

