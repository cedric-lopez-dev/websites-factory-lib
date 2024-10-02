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

export default defineConfig([
    {
        entry: ['lib/index.ts'],
        format: ['cjs', 'esm'],
        outDir: 'dist',
        dts: true,
        shims: true,
        clean: true,
        onSuccess: copyModules,
    },
    {
        entry: ['lib/bin/index.ts'],
        format: ['cjs', 'esm'],
        outDir: 'dist/bin',
        dts: false,
        clean: false,
    },
]);
