"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var lib_exports = {};
__export(lib_exports, {
  PageRenderer: () => PageRenderer,
  getPage: () => getPage,
  populateMetadata: () => populateMetadata
});
module.exports = __toCommonJS(lib_exports);

// core/importComponent.ts
var importComponent = async (pathComponent) => {
  try {
    const ComponentModule = await import(`/websites-factory-modules/${pathComponent}`);
    return ComponentModule.default;
  } catch (error) {
    return null;
  }
};

// core/getComponents.ts
var getPageComponent = async (config, pageTemplate) => {
  const isModuleEnabled = checkModuleEnabled(config, pageTemplate.module);
  if (!isModuleEnabled)
    return null;
  const pageComponentPath = `${pageTemplate.module}/pages/${pageTemplate.page}`;
  const pageComponent = await importComponent(pageComponentPath);
  return pageComponent;
};
var getPageLayoutComponent = async (config, pageTemplate) => {
  const isModuleEnabled = checkModuleEnabled(config, pageTemplate.module);
  if (!isModuleEnabled)
    return null;
  const layout = pageTemplate.layout;
  if (!layout) {
    return null;
  }
  const pageLayoutComponentPath = `${layout.module}/layout/${layout.name}`;
  const layoutComponent = await importComponent(pageLayoutComponentPath);
  return layoutComponent;
};
var getPageSectionsComponents = async (config, pageTemplate) => {
  const sections = pageTemplate == null ? void 0 : pageTemplate.sections;
  if (!sections) return [];
  const sectionsComponents = await Promise.all(
    sections.map(async (section) => {
      const isModuleEnabled = checkModuleEnabled(config, section.module);
      if (!isModuleEnabled)
        return null;
      const sectionComponentPath = `${section.module}/sections/${section.name}`;
      const sectionComponent = await importComponent(sectionComponentPath);
      return sectionComponent;
    })
  );
  return sectionsComponents;
};
var checkModuleEnabled = (config, moduleName) => {
  const modules = config == null ? void 0 : config.modules;
  if (!modules)
    return false;
  const currentModule = modules.find((module2) => module2.name === moduleName);
  if (!currentModule || !currentModule.enabled)
    return false;
  return true;
};

// core/createEntity.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var createEntity = (name) => {
  const findOne = async () => {
    try {
      const jsonDirectory = import_path.default.join(process.cwd(), "entities.json");
      const data = import_fs.default.readFileSync(jsonDirectory, "utf8");
      const entity = JSON.parse(data);
      return entity[name];
    } catch {
      return null;
    }
  };
  return { name, findOne };
};

// core/getJson.ts
var import_fs2 = __toESM(require("fs"), 1);
var import_path2 = __toESM(require("path"), 1);
var getJson = (pathFile) => {
  try {
    const jsonDirectory = import_path2.default.join(process.cwd(), pathFile);
    const data = import_fs2.default.readFileSync(jsonDirectory, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file:`, error);
    return null;
  }
};

// core/getPage.ts
var getPage = async (params) => {
  const config = getJson("websites-factory-config.json");
  if (!config)
    return null;
  const pageTemplate = getPageTemplate(config.template, params);
  if (!pageTemplate)
    return null;
  const PageComponent = await getPageComponent(config, pageTemplate);
  if (!PageComponent)
    return null;
  const PageLayoutComponent = await getPageLayoutComponent(config, pageTemplate);
  const pageSectionsComponents = await getPageSectionsComponents(config, pageTemplate);
  const pageEntities = getPageEntities(pageTemplate) || null;
  const pageMetadata = pageTemplate.metadata || null;
  return { PageComponent, pageSectionsComponents, PageLayoutComponent, pageMetadata, pageEntities };
};
var getPageTemplate = (template, params) => {
  let pageTemplate = template["/"];
  if (params && Object.keys(params).length > 0) {
    const slugs = Object.keys(params).map((key) => params[key]);
    pageTemplate = template[slugs[0]];
    slugs.slice(1).forEach((slug) => {
      if (pageTemplate && pageTemplate.subPage) {
        pageTemplate = pageTemplate.subPage[slug];
      } else {
        pageTemplate = void 0;
      }
    });
  }
  return pageTemplate;
};
var getPageEntities = (pageTemplate) => {
  const entities = pageTemplate == null ? void 0 : pageTemplate.entities;
  if (!entities)
    return null;
  const entityInstances = entities.map((entity) => {
    return createEntity(entity);
  });
  return entityInstances;
};

// core/populateMetadata.ts
var populateMetadata = async (pageResult) => {
  const metadata = pageResult == null ? void 0 : pageResult.pageMetadata;
  if (!metadata)
    return {};
  const entities = pageResult == null ? void 0 : pageResult.pageEntities;
  if (!entities)
    return metadata;
  const entitiesData = {};
  await Promise.all(
    entities.map(async (entity) => {
      const entityData = await entity.findOne();
      entitiesData[entity.name] = entityData;
    })
  );
  const populateMetadata2 = Object.fromEntries(
    Object.entries(metadata).map(([key, content]) => {
      const populateContent = typeof content === "string" ? replaceVariables(content, entitiesData) : content;
      return [key, populateContent];
    })
  );
  return populateMetadata2;
};
var replaceVariables = (metadataEntryContent, entitiesData) => {
  const replacedContent = metadataEntryContent.replace(/{{(.*?)}}/g, (_, key) => {
    const trimmedKey = key.trim();
    const splitedKey = trimmedKey.split(".");
    let value = entitiesData;
    for (const part of splitedKey) {
      if (typeof value === "object" && value !== null && part in value) {
        value = value[part];
      } else {
        return `{{${trimmedKey}}}`;
      }
    }
    return value !== void 0 ? String(value) : `{{${trimmedKey}}}`;
  });
  return replacedContent;
};

// core/PageRenderer.tsx
var import_react = __toESM(require("react"), 1);
var PageRenderer = ({ pageResult }) => {
  const {
    PageComponent,
    pageSectionsComponents,
    PageLayoutComponent
  } = pageResult;
  if (PageLayoutComponent) {
    return /* @__PURE__ */ import_react.default.createElement(PageLayoutComponent, null, /* @__PURE__ */ import_react.default.createElement(PageComponent, null, pageSectionsComponents.map(
      (Section, i) => Section ? /* @__PURE__ */ import_react.default.createElement(Section, { key: i }) : null
    )));
  }
  return /* @__PURE__ */ import_react.default.createElement(PageComponent, null, pageSectionsComponents.map(
    (Section, i) => Section ? /* @__PURE__ */ import_react.default.createElement(Section, { key: i }) : null
  ));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PageRenderer,
  getPage,
  populateMetadata
});
