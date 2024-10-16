import dynamic from "next/dynamic";
import { useTheme } from "@/core/themeContext";

export const getThemeComponent = (componentUIGroup, component) => {

    const { theme } = useTheme();
    const Component = dynamic(
        () =>
            import(`/websites-factory/themes/${theme}/${componentUIGroup}`)
                .then((mod) => mod[component])
                .catch(() => {
                    return import(`/websites-factory/themes/default/${componentUIGroup}`).then((mod) => mod[component]);
                }),
    );

    return Component;
};


