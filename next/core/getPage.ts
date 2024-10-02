

import { getPageComponent, getPageLayoutComponent, getPageSectionsComponents } from "./getComponents";
import { createEntity } from "./createEntity";
import { Config, EntityInstance, Page, PageResult, Template } from "./types";
import { getJson } from "./getJson";


type Params = {
    [path: string]: string
}

export const getPage = async (params?: Params): Promise<PageResult | null> => {
    const config = getJson("websites-factory-config.json") as Config | null;
    if (!config)
        return null
    const pageTemplate = getPageTemplate(config.template, params)
    if (!pageTemplate)
        return null
    const PageComponent = await getPageComponent(config, pageTemplate)
    if (!PageComponent)
        return null
    const PageLayoutComponent = await getPageLayoutComponent(config, pageTemplate)
    const pageSectionsComponents = await getPageSectionsComponents(config, pageTemplate)
    const pageEntities = getPageEntities(pageTemplate) || null
    const pageMetadata = pageTemplate.metadata || null
    return { PageComponent, pageSectionsComponents, PageLayoutComponent, pageMetadata, pageEntities };
};


const getPageTemplate = (template: Template, params: Params | undefined): Page | undefined => {
    let pageTemplate: Page | undefined = template['/'];
    if (params && Object.keys(params).length > 0) {
        const slugs = Object.keys(params).map(key => params[key]);

        pageTemplate = template[slugs[0]];

        slugs.slice(1).forEach(slug => {
            if (pageTemplate && pageTemplate.subPage) {
                pageTemplate = pageTemplate.subPage[slug];
            } else {
                pageTemplate = undefined;
            }
        });
    }
    return pageTemplate;
};

const getPageEntities = (pageTemplate: Page): EntityInstance[] | null => {

    const entities = pageTemplate?.entities
    if (!entities)
        return null

    const entityInstances = entities.map((entity) => {
        return createEntity(entity)
    })
    return entityInstances
}

