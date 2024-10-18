import { Module } from "module";
import { ComponentType, PropsWithChildren } from "react";

export interface Config {
    modules: Modules;
    template: Template;
}

export type Modules = Module[];

export interface Template {
    [path: string]: Page;
}

export interface Page {
    module: string;
    page: string;
    sections: Sections;
    layout: Layout;
    metadata: Metadata;
    entities?: string[];
    subPage?: {
        [key: string]: Page;
    };
    theme: string
}

export type Sections = Section[];

export interface Layout {
    module: string;
    name: string;
}
export interface Section {
    module: string;
    name: string;
}
export interface Module {
    name: string;
    enabled: boolean;
    config: ModuleConfig;
}

export interface ModuleConfig {
    [path: string]: ItemConfig
}
export interface ItemConfig {
    entity: string;
    mapping: Mapping
}

export interface Mapping {
    [path: string]: string
}

export interface Metadata {
    [path: string]: string
}

export interface EntityInstance {
    name: string
    findOne: () => Promise<Entity | null>;
}

export interface Entity {
    [key: string]: unknown;
}

export interface PageResult {
    PageComponent: ComponentType<PropsWithChildren>;
    pageSectionsComponents: (ComponentType | null)[];
    PageLayoutComponent: ComponentType<PropsWithChildren> | null;
    pageMetadata: Metadata | null;
    pageEntities: EntityInstance[] | null
    theme: string | null
}