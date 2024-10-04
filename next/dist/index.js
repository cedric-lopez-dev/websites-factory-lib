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
  const currentModule = modules.find((module) => module.name === moduleName);
  if (!currentModule || !currentModule.enabled)
    return false;
  return true;
};

// core/createEntity.ts
import fs from "fs";
import path from "path";
var createEntity = (name) => {
  const findOne = async () => {
    try {
      const jsonDirectory = path.join(process.cwd(), "entities.json");
      const data = fs.readFileSync(jsonDirectory, "utf8");
      const entity = JSON.parse(data);
      return entity[name];
    } catch {
      return null;
    }
  };
  return { name, findOne };
};

// core/getJson.ts
import fs2 from "fs";
import path2 from "path";
var getJson = (pathFile) => {
  try {
    const jsonDirectory = path2.join(process.cwd(), pathFile);
    const data = fs2.readFileSync(jsonDirectory, "utf8");
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
import React from "react";
var PageRenderer = ({ pageResult }) => {
  const {
    PageComponent,
    pageSectionsComponents,
    PageLayoutComponent
  } = pageResult;
  if (PageLayoutComponent) {
    return /* @__PURE__ */ React.createElement(PageLayoutComponent, null, /* @__PURE__ */ React.createElement(PageComponent, null, pageSectionsComponents.map(
      (Section, i) => Section ? /* @__PURE__ */ React.createElement(Section, { key: i }) : null
    )));
  }
  return /* @__PURE__ */ React.createElement(PageComponent, null, pageSectionsComponents.map(
    (Section, i) => Section ? /* @__PURE__ */ React.createElement(Section, { key: i }) : null
  ));
};
export {
  PageRenderer,
  getPage,
  populateMetadata
};
