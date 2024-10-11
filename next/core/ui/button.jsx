import { getThemeComponent } from "../getThemeComponent";
import React from "react";


const componentUIGroup = 'button'

export const Button = ({ ...props }) => {
    const Button = getThemeComponent(componentUIGroup, "Button");
    return <Button {...props} />
}