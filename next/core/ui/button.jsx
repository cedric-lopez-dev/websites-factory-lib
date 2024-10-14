
import { getThemeComponent } from "../getThemeGroupUi";
const componentUIGroup = 'button'

const ButtonRounded = ({ ...props }) => {
    const ButtonRounded = getThemeComponent(componentUIGroup, "Button")
    return <ButtonRounded {...props} />
}

const ButtonComponents = {
    ButtonRounded,
};
export default ButtonComponents;