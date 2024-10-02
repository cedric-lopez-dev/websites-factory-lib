
Welcome to the **Websites Factory library** (beta).

This library aims to generate pages in [Next.js](https://nextjs.org) from your modules or modules created by the community.

# Getting Started

```bash
npx install websites-factory-core
```

This command creates a `websites-factory-modules` directory, which will be used to store the modules and the `websites-factory-config.json` file. It will also install the Websites Factory Core library in `node_modules`.

> **Note**: The configuration file in this form is temporary. The idea is to eventually retrieve the configuration from a database. In that case, this will likely be used as the default configuration.

# Overview

The modules provide pages and sections to the template of the `websites-factory-config.json` file. This allows for the construction of the various pages of the site.

## Websites-factory-config

The configuration file consists of the list of modules and the template.

```json
{
    "modules": [
        {
            "name": "welcome",
            "enabled": true
        }
    ],
    "template": {
        "/": {
            "module": "welcome",
            "page": "home",
            "sections": []
        }
    }
}
```

### Template

- **Layout**

- **Entities**

- **Metadatada**

## Modules

Modules should be placed in the `websites-factory-modules` folder.
The pages provided by the module should be placed in a `pages` folder and a folder named after the page.
The sections provided by the module should be placed in a `sections` folder and a folder named after the section.

```
└──websites-factory-modules
    ├── welcome
    │   ├── pages
    │   │   ├── home  
    │   │   │  └── index.tsx  
    │   ├── sections  
    │   │   ├── introduction
    │   │   │   └── index.tsx  
```

