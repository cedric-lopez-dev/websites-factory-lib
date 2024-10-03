#!/usr/bin/env node

// lib/bin/index.ts
import fs from "fs";
import path from "path";
import { exec } from "child_process";
var command = process.argv[2];
var moduleName = process.argv[3];
var createDirectories = (baseDir) => {
  const directoriesToCreate = [
    "/websites-factory-modules"
  ];
  directoriesToCreate.forEach((dir) => {
    const dirPath = path.join(baseDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Directory created: ${dirPath}`);
    } else {
      console.log(`Directory already exists: ${dirPath}`);
    }
  });
};
var copyConfigFile = (baseDir) => {
  const configFileName = "websites-factory-config.json";
  const destPath = path.join(baseDir, configFileName);
  const sourceFilePath = path.join(baseDir, "node_modules", "websites-factory", "dist", "websites-factory-config.json");
  if (!fs.existsSync(destPath)) {
    try {
      fs.copyFileSync(sourceFilePath, destPath);
      console.log(`Config file copied: ${configFileName}`);
    } catch (error) {
      console.error(`Error copying config file: ${error}`);
    }
  } else {
    console.log(`Config file already exists: ${configFileName}`);
  }
};
var copyModules = (baseDir) => {
  const sourceDir = path.join(baseDir, "node_modules", "websites-factory", "dist", "modules");
  const destDir = path.join(baseDir, "websites-factory-modules");
  if (fs.existsSync(sourceDir)) {
    fs.readdirSync(sourceDir).forEach((item) => {
      const srcItemPath = path.join(sourceDir, item);
      const destItemPath = path.join(destDir, item);
      if (fs.lstatSync(srcItemPath).isDirectory()) {
        if (!fs.existsSync(destItemPath)) {
          fs.mkdirSync(destItemPath, { recursive: true });
          console.log(`Directory created: ${destItemPath}`);
        }
        copyDirectory(srcItemPath, destItemPath);
      } else {
        fs.copyFileSync(srcItemPath, destItemPath);
        console.log(`File copied: ${srcItemPath} to ${destItemPath}`);
      }
    });
  } else {
    console.error(`Source directory does not exist: ${sourceDir}`);
  }
};
var copyDirectory = (src, dest) => {
  fs.readdirSync(src).forEach((item) => {
    const srcItemPath = path.join(src, item);
    const destItemPath = path.join(dest, item);
    if (fs.lstatSync(srcItemPath).isDirectory()) {
      if (!fs.existsSync(destItemPath)) {
        fs.mkdirSync(destItemPath, { recursive: true });
        console.log(`Directory created: ${destItemPath}`);
      }
      copyDirectory(srcItemPath, destItemPath);
    } else {
      fs.copyFileSync(srcItemPath, destItemPath);
      console.log(`File copied: ${srcItemPath} to ${destItemPath}`);
    }
  });
};
var installModule = (moduleName2) => {
  console.log(moduleName2);
};
if (command)
  switch (command) {
    case "install":
      installModule(moduleName);
      break;
    default:
      console.log("Command not found");
  }
else {
  exec("npm install websites-factory", { cwd: process.cwd() }, (error, stdout, stderr) => {
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
    copyModules(baseDir);
    copyConfigFile(baseDir);
    console.log(stdout);
    console.log("Installation of websites-factory-core completed.");
  });
}
