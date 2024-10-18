import dynamic from "next/dynamic";
import { useTheme } from "@/websites-factory/themeContext";

export const useGetThemeComponent = (componentUIGroup, component) => {
    const { theme } = useTheme();

    const Component = dynamic(
        () =>
            import(`./themes/${theme}/${componentUIGroup}`)
                .then((mod) => {
                    if (mod[component])
                        return mod[component]
                    else
                        return Promise.reject()
                })
                .catch(() => {
                    return import(`./themes/default/${componentUIGroup}`).then((mod) => mod[component]);
                }),
    );
    return Component;
};


