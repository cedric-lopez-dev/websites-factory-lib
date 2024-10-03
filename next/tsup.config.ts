import { defineConfig } from 'tsup';
import fs from 'fs-extra';
import path from 'path';

const copyModules = async () => {
    const sourceDir = 'modules';
    const destDir = path.join(__dirname, 'dist', 'modules');

    try {
        await fs.copy(sourceDir, destDir);
        console.log(`Directory ${sourceDir} copied to ${destDir}`);
    } catch (err) {
        console.error(`Error during copy: ${err}`);
    }
};

const copyConfig = async () => {
    const configFileName = 'websites-factory-config.json';
    const sourceFile = path.join(__dirname, configFileName);
    const destDir = path.join(__dirname, 'dist');
    try {
        await fs.copyFile(sourceFile, path.join(destDir, configFileName));
        console.log(`File ${configFileName} copied to ${destDir}`);
    } catch (err) {
        console.error(`Error during copy: ${err}`);
    }
}

const copy = async () => {
    copyModules()
    copyConfig()
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
