import { defineConfig } from 'tsup';
import fs from 'fs-extra';
import path from 'path';

const copyModules = async () => {
    const sourceDir = 'websites-factory';
    const destDir = path.join(__dirname, 'build', 'export');

    try {
        await fs.copy(sourceDir, destDir);
        console.log(`Directory ${sourceDir} copied to ${destDir}`);
    } catch (err) {
        console.error(`Error during copy: ${err}`);
    }
};

const copyFile = async (fileName: string, pathFolder: string, folder: string) => {
    const sourceFile = path.join(__dirname, pathFolder, fileName);
    const destDir = path.join(__dirname, 'build', folder);
    try {
        await fs.copyFile(sourceFile, path.join(destDir, fileName));
        console.log(`File ${fileName} copied to ${destDir}`);
    } catch (err) {
        console.error(`Error during copy: ${err}`);
    }
}

const copy = async () => {
    await copyModules()
    copyFile('websites-factory-config.json', 'websites-factory', 'export')
    copyFile('entities.json', 'websites-factory', 'export')
    copyFile('README.md', '', '')
    copyFile('package.json', '', '')
}

export default defineConfig([
    {
        entry: ['lib/index.ts'],
        format: ['esm'],
        outDir: 'build',
        dts: true,
        shims: true,
        clean: true,
        onSuccess: copy,
    },
    {
        entry: ['lib/bin/index.ts'],
        format: ['esm'],
        outDir: 'build/bin',
        dts: false,
        clean: false,
    },
    {
        entry: ['lib/ui.ts'],
        format: ['esm'],
        outDir: 'build',
        dts: false,
        clean: true,
    }
]);
