import { defineConfig } from 'tsup';
import fs from 'fs-extra';
import path from 'path';

const copyModules = async () => {
    const sourceDir = 'websites-factory-modules';
    const destDir = path.join(__dirname, 'dist', 'modules');

    try {
        await fs.copy(sourceDir, destDir);
        console.log(`Directory ${sourceDir} copied to ${destDir}`);
    } catch (err) {
        console.error(`Error during copy: ${err}`);
    }
};

const copyFile = async (fileName: string) => {
    const sourceFile = path.join(__dirname, fileName);
    const destDir = path.join(__dirname, 'dist');
    try {
        await fs.copyFile(sourceFile, path.join(destDir, fileName));
        console.log(`File ${fileName} copied to ${destDir}`);
    } catch (err) {
        console.error(`Error during copy: ${err}`);
    }
}

const copy = async () => {
    copyModules()
    copyFile('websites-factory-config.json')
    copyFile('entities.json')
}

export default defineConfig([
    {
        entry: ['lib/index.ts'],
        format: ['cjs', 'esm'],
        outDir: 'dist',
        dts: true,
        shims: true,
        clean: true,
        onSuccess: copy,
    },
    {
        entry: ['lib/bin/index.ts'],
        format: ['cjs', 'esm'],
        outDir: 'dist/bin',
        dts: false,
        clean: false,
    },
]);
