import { Metadata, PageResult } from "./types";


type EntitiesData = { [key: string]: unknown }


export const populateMetadata = async (pageResult: PageResult): Promise<Metadata> => {
    const metadata = pageResult?.pageMetadata
    if (!metadata)
        return {}
    const entities = pageResult?.pageEntities
    if (!entities)
        return metadata

    const entitiesData: EntitiesData = {};

    await Promise.all(
        entities.map(async (entity) => {
            const entityData = await entity.findOne();
            entitiesData[entity.name] = entityData;
        })
    );

    const populateMetadata: Metadata = Object.fromEntries(
        Object.entries(metadata).map(([key, content]) => {
            const populateContent = typeof content === 'string'
                ? replaceVariables(content, entitiesData)
                : content;
            return [key, populateContent]
        }))
    return populateMetadata
}

const replaceVariables = (metadataEntryContent: string, entitiesData: EntitiesData): string => {
    const replacedContent = metadataEntryContent.replace(/{{(.*?)}}/g, (_, key) => {
        const trimmedKey = key.trim();
        const splitedKey = trimmedKey.split(".");
        let value: unknown = entitiesData;
        for (const part of splitedKey) {
            if (typeof value === 'object' && value !== null && part in value) {
                value = (value as Record<string, unknown>)[part];
            } else {
                return `{{${trimmedKey}}}`;
            }
        }
        return value !== undefined ? String(value) : `{{${trimmedKey}}}`;
    });

    return replacedContent;
};