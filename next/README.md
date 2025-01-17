# Websites Factory library (Beta)

Welcome to the **Websites Factory library**.

This library aims to generate pages in [Next.js](https://nextjs.org) from your modules or modules created by the community.

## Table of Contents
- [Getting Started](#getting-started)
- [Overview](#overview)
- [Configuration](#configuration)
- [Pages](#pages)
- [Modules](#modules)
- [Themes](#themes)

# Getting Started

## Requirements

**Website Factory** is designed to be used with [Next.js](https://nextjs.org) (App Router) and [Tailwind](https://tailwindui.com).

## Installation

```bash
npx websites-factory
```

This command creates a `websites-factory` directory, which will be used to store the modules, themes and the `websites-factory-config.json` file. It will also install the Websites Factory library in `node_modules`.

### Tailwind

Add the path for all modules in `tailwind.config.js`

```js
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Add the path for all websites-factory
   "./websites-factory/**/*.{js,ts,jsx,tsx,mdx}",
  ],
```

### page.js / page.tsx

Replace the code in the page.js or page.tsx file created by Next.js:

```js
import { notFound } from "next/navigation";
import { getPage, PageRenderer } from "websites-factory";

const page = async ({ params }) => {
  const pageResult = await getPage(params);
  if (!pageResult) {
    notFound();
  }
  return (
    <PageRenderer pageResult={pageResult} />
  );
};

export default page;
```

> (Beta)
**Note**: The websites-factory-config file in this form is temporary. The idea is to eventually retrieve the configuration from a database. In that case, this will likely be used as the default configuration.

# Overview

The modules provide pages and sections to the template of the `websites-factory-config.json` file. This allows for the construction of the various pages of the site.

# Configuration

The `Websites-factory-config` file consists of the list of modules, the template, and the entities.

## Modules config

```json

    "modules": [
        {
            "name": "welcome",
            "enabled": true
        }
    ]
```
- **Config**
*Coming soon*
Mapping entities and more?

## Template

The template contains all the pages to be generated by **Websites Factory** in the form of an object, with the page path as the key.  
To `generate a page`, you must at least specify which page from which module you want to display

```json
    "template": {
        "/": {
            "module": "welcome",
            "page": "home",
        }
    }
```

- **Layout**

The page can use a `layout` provided by one of the installed modules.

```json

      "layout": {
          "module": "welcome",
          "name": "main"
            }
            
```

- **Sections**  
The page will display the `sections` provided by the various modules.
```json
      "sections": [
          {
            "module": "welcome",
            "name": "introduction"
          }
        ]

```
- **Entities**

Defines the `entities` that will be available on the page.
```json
      "entities": [
        "websitesFactory"
      ]
```

- **Metadatada**

Creation of metadata. The different texts accept variables in the format {{variable}}. The variables are filled in from the entities available on the page.

```json
      "metadata": {
          "title": "{{websitesFactory.name}} | Welcome!",
          "description": "This is the example homepage of {{websitesFactory.name}}"
        }
```

- **SubPage**
The `subPage` key allows nesting a subpage within a page. A subpage functions like a top-level page, with its key being the path of the subpage.
You can nest as many `subPage` as you like

> **Note**: the entry point "/" corresponds to the site's index page. It does not accept any subPages. The subpages of the index page are the other keys of type entrypoints.

```json
    "template": {
        "/": {
            "module": "welcome",
            "page": "home",
        },
        "hello-world": {
            "module": "helloWorld",
            "page": "hello",
            "subPage": {
                "subPage-exemple": {
                    "module": "welcome",
                    "page": "home",
                }
            }
        }
    }
```

- **Full template exemple**

```json
    "template": {
        "/": {
            "module": "welcome",
            "page": "home",
            "sections": [
                {
                    "module": "welcome",
                    "name": "introduction"
                }
            ],
            "layout": {
                "module": "welcome",
                "name": "main"
            },
            "entities": [
                "websitesFactory"
            ],
            "metadata": {
                "title": "{{websitesFactory.name}} | Welcome!",
                "description": "This is the example homepage of {{websitesFactory.name}}"
            }
        },
        "hello-world": {
            "module": "helloWorld",
            "page": "hello",
            "layout": {
                "module": "welcome",
                "name": "main"
            },
            "subPage": {
                "subPage-exemple": {
                    "module": "welcome",
                    "page": "home",
                    "sections": [
                        {
                            "module": "welcome",
                            "name": "introduction"
                        }
                    ]
                }
            }
        }
    }
```
## Entities
Lists the entities available for the App and their path.
```json
    "entities": {
        "websitesFactory": "websitesFactory"
    }
```
> (Beta)
**Note**: For now, the entities are provided by the entities.json file. Later, they will be fetched via an API. The path will then be the one provided by the API.


# Pages

## Routing

**Website Factory** uses the [Next.js](https://nextjs.org) App Router.

### Slug-Page

For dynamic routes, you need to create a `[...slug]` folder with a page template.

## Page Rendering

### Base Page Rendering
```js
import { notFound } from "next/navigation";
import { getPage, PageRenderer } from "websites-factory";

const page = async ({ params }) => {
  const pageResult = await getPage(params);
  if (!pageResult) {
    notFound();
  }
  return (
    <PageRenderer pageResult={pageResult} />
  );
};
export default page;
```

### getPage

`getPage` returns the elements of a page using the `websites-factory-config`. The function takes the `params` object from [Next.js](https://nextjs.org) as a parameter.

> **Note**: For the sake of clarity, it was decided to use the same template for the root page and for all other pages. In reality, for the root page, `params` are not necessary to build it.
⚠️ In the absence of `params`, the "/" template will always be generated.

If you want to customize the rendering of your page, you can use the elements returned by getPage :
`PageComponent`, `pageSectionsComponents`, `PageLayoutComponent`
```js
  const { PageComponent, pageSectionsComponents, PageLayoutComponent } = pageResult

      return (
        <PageLayoutComponent>

          <PageComponent>
            {
              pageSectionsComponents.map((Section, i) => {
                if (Section)
                  return <  Section key={i} />
              })
            }
          </PageComponent>
        </PageLayoutComponent>  
    );
```
### PageRenderer

`PageRenderer` returns the complete JSX template required by **Websites Factory**. It requires the result of `getPage` as props.

```js
  return (
    <PageRenderer pageResult={pageResult} />
  );
```
### Metadada Rendering

**Websites Factory** uses the `generateMetadata` function and the `params` object from [Next.js](https://nextjs.org).

```js
import { populateMetadata } from 'websites-factory';
export async function generateMetadata({ params }){
    const pageResult = await getPage(params)
    if (!pageResult) {
        notFound();
    }
    const populatedMetadata = populateMetadata(pageResult)
    return populatedMetadata
}
```

You can also retrieve the page metadata directly from the result of `getPage`:
```js
  const { pageMetadata } = pageResult
```

- **populateMetadata**

`populateMetadata` returns the metadata object populated using `websites-factory-config`. It takes as a parameter the result of the `getPage` function.

### pageEntities

The getPage function also returns entities as instances.

> (Beta)
**Note**: This feature is still in development. Currently, an entity instance is composed of the entity name and the findOne function. The idea is that modules will use the mapping in their configuration to match their attributes with those of the page's entities.
FindOne retrieves the corresponding entity from `entities.json`

```js
  const { pageEntities } = pageResult
  ```
# Modules

Modules should be placed in the `websites-factory` folder.
The pages provided by the module should be placed in a `pages` folder and a folder named after the page.
The sections provided by the module should be placed in a `sections` folder and a folder named after the section.

```
└──modules
    ├── welcome
    │   ├── pages
    │   │   ├── home  
    │   │   │  └── index.tsx  
    │   ├── sections  
    │   │   ├── introduction
    │   │   │   └── index.tsx
    │   ├── layout  
    │   │   ├── main
    │   │   │   └── index.tsx        
```

# Themes

## Providers

To use theme management, you need to add the context provider to the pages and provide it with the theme from the configuration.

```js
import { notFound } from "next/navigation";
import { getPage, PageRenderer } from "websites-factory";
import { Providers } from "@/websites-factory/Providers"

const page = async ({ params }) => {
  const pageResult = await getPage(params);
  if (!pageResult) {
    notFound();
  }
  const { theme } = pageResult
  return (
    <Providers themeTemplate={theme}>
      <PageRenderer pageResult={pageResult} />
    </Providers>
  );
};

export default page;
  ```

## UI

Modules can import components from the `@/websites-factory/ui` folder.

Example:


```js
import { Button } from "@/websites-factory/ui/button";
```

UI components can be imported from both server-side and client-side components.

> (Beta)
**Note**: ⚠️ Currently, all UI components (even when imported into a server-side component) are imported on the client side.
This is due to the use of context in the theme components import. I plan to change this so that components are only loaded on the client side when necessary.

## New Theme

To create a theme, you need to copy the default theme from `websites-factory/themes`. Only the components provided by the UI are available.
