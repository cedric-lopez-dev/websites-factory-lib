import { getThemeComponent } from "../getThemeComponent";

const componentUIGroup = 'button'


export const Button = ({ ...props }) => {
    const Button = getThemeComponent(componentUIGroup, "Button");
    return <Button {...props} />
}