#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
const command = process.argv[2]
const moduleName = process.argv[3]

const createDirectories = (baseDir: string) => {
    const directoriesToCreate = [
        '/websites-factory',
    ];
    directoriesToCreate.forEach(dir => {
        const dirPath = path.join(baseDir, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Directory created: ${dirPath}`);
        } else {
            console.log(`Directory already exists: ${dirPath}`);
        }
    });
};
const copyFile = (baseDir: string, fileName: string) => {
    const destPath = path.join(baseDir, fileName);
    const sourceFilePath = path.join(baseDir, 'node_modules', 'websites-factory', 'export', fileName);

    if (!fs.existsSync(destPath)) {
        try {
            fs.copyFileSync(sourceFilePath, destPath);
        } catch (error) {
            console.error(`Error copying config file: ${error}`);
        }
    } else {
        console.log(`Config file already exists: ${fileName}`);
    }
};
const copyFolder = (baseDir: string) => {
    const sourceDir = path.join(baseDir, 'node_modules', 'websites-factory', 'export');
    const destDir = path.join(baseDir, 'websites-factory');

    if (fs.existsSync(sourceDir)) {
        fs.readdirSync(sourceDir).forEach(item => {
            const srcItemPath = path.join(sourceDir, item);
            const destItemPath = path.join(destDir, item);

            if (fs.lstatSync(srcItemPath).isDirectory()) {
                if (!fs.existsSync(destItemPath)) {
                    fs.mkdirSync(destItemPath, { recursive: true });
                }
                copyDirectory(srcItemPath, destItemPath);
            } else {
                fs.copyFileSync(srcItemPath, destItemPath);
            }
        });
    } else {
        console.error(`Source directory does not exist: ${sourceDir}`);
    }
};
const copyDirectory = (src: string, dest: string) => {
    fs.readdirSync(src).forEach(item => {
        const srcItemPath = path.join(src, item);
        const destItemPath = path.join(dest, item);

        if (fs.lstatSync(srcItemPath).isDirectory()) {
            if (!fs.existsSync(destItemPath)) {
                fs.mkdirSync(destItemPath, { recursive: true });
            }
            copyDirectory(srcItemPath, destItemPath);
        } else {
            fs.copyFileSync(srcItemPath, destItemPath);
        }
    });
};
const installModule = (moduleName: string) => {
    console.log(moduleName);
}

if (command)
    switch (command) {
        case "install": installModule(moduleName);
            break;
        default: console.log('Command not found');

    }
else {
    exec('npm install websites-factory@0.4.2', { cwd: process.cwd() }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during installation: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        const baseDir = process.cwd();
        createDirectories(baseDir);
        copyFolder(baseDir);
        console.log('Installation of websites-factory completed.');
    });
}
