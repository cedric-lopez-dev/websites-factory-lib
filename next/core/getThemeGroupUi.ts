// import dynamic from "next/dynamic";

// export const getThemeComponent = (componentUIGroup, component) => {
//     const Component = dynamic(
//         () =>
//             import(`/websites-factory/themes/${theme}/${componentUIGroup}`)
//                 .then((mod) => mod[component])
//                 .catch(() => {
//                     return import(`/websites-factory/themes/default/${componentUIGroup}`).then((mod) => mod[component]);
//                 }),
//     );

//     return Component;
// };

export const getThemeGroupUi = async (componentUIGroup) => {
    return await import(`/websites-factory/themes/default/${componentUIGroup}`)
}