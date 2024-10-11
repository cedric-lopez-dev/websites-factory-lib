// core/getThemeComponent.ts
import dynamic from "next/dynamic";

export const getThemeComponent = (componentUIGroup, component) => {

    const Components = dynamic(
        () => import(`/websites-factory/themes/main/${componentUIGroup}`).then((mod) => {
            return mod[component];
        })
    );
    return Components;
}