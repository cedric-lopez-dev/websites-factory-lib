import { Config, Page, Module } from './types';
import { importComponent } from './importComponent';
import { ComponentType } from 'react';

export const getPageComponent = async (config: Config, pageTemplate: Page): Promise<ComponentType | null> => {

    const isModuleEnabled: boolean = checkModuleEnabled(config, pageTemplate.module)
    if (!isModuleEnabled)
        return null

    const pageComponentPath = `${pageTemplate.module}/pages/${pageTemplate.page}`

    const pageComponent = await importComponent(pageComponentPath)

    return pageComponent
}
export const getPageLayoutComponent = async (config: Config, pageTemplate: Page): Promise<ComponentType | null> => {

    const isModuleEnabled: boolean = checkModuleEnabled(config, pageTemplate.module)
    if (!isModuleEnabled)
        return null

    const layout = pageTemplate.layout;
    if (!layout) {
        return null;
    }
    const pageLayoutComponentPath = `${layout.module}/layout/${layout.name}`
    const layoutComponent = await importComponent(pageLayoutComponentPath)
    return layoutComponent
}

export const getPageSectionsComponents = async (config: Config, pageTemplate: Page): Promise<(React.ComponentType | null)[]> => {
    const sections = pageTemplate?.sections;
    if (!sections) return [];

    const sectionsComponents = await Promise.all(
        sections.map(async (section) => {
            const isModuleEnabled: boolean = checkModuleEnabled(config, section.module)
            if (!isModuleEnabled)
                return null
            const sectionComponentPath = `${section.module}/sections/${section.name}`;
            const sectionComponent = await importComponent(sectionComponentPath);
            return sectionComponent;
        })
    );

    return sectionsComponents;
};

const checkModuleEnabled = (config: Config, moduleName: string): boolean => {
    const modules = config?.modules
    if (!modules)
        return false

    const currentModule: Module | undefined = modules.find((module) => module.name === moduleName)
    if (!currentModule || !currentModule.enabled)
        return false
    return true
}
