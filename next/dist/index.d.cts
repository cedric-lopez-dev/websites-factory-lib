import React, { ComponentType, PropsWithChildren } from 'react';

interface Metadata {
    [path: string]: string;
}
interface EntityInstance {
    name: string;
    findOne: () => Promise<Entity | null>;
}
interface Entity {
    [key: string]: unknown;
}
interface PageResult {
    PageComponent: ComponentType<PropsWithChildren>;
    pageSectionsComponents: (ComponentType | null)[];
    PageLayoutComponent: ComponentType<PropsWithChildren> | null;
    pageMetadata: Metadata | null;
    pageEntities: EntityInstance[] | null;
}

type Params = {
    [path: string]: string;
};
declare const getPage: (params?: Params) => Promise<PageResult | null>;

declare const populateMetadata: (pageResult: PageResult) => Promise<Metadata>;

declare const PageRenderer: ({ pageResult }: {
    pageResult: PageResult;
}) => React.JSX.Element;

export { PageRenderer, getPage, populateMetadata };
