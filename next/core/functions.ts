import fs from 'fs';
import path from 'path';
import { Config } from './types';


type AvailablePages = { [key: string]: string }

export const getAvailablePages = (config: Config): AvailablePages | null => {

    const modules = config?.modules
    if (!modules)
        return null
    const enabledModules = config?.modules.filter((module) => module.enabled)
    const enabledModulesNames = enabledModules.map(module => module.name);
    const availablePages: AvailablePages = {}

    enabledModulesNames.forEach(moduleName => {
        const directoryPath = path.join(process.cwd(), `/app/modules/${moduleName}/pages`);
        try {
            const files = fs.readdirSync(directoryPath, { withFileTypes: true });
            files
                .filter(file => file.isDirectory())
                .map(dir => {
                    availablePages[dir.name] = `${moduleName}/pages/${dir.name}`
                });
        }
        catch {

        }
    });
    return availablePages
}





