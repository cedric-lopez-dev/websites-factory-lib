#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// lib/bin/index.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_child_process = require("child_process");
var command = process.argv[2];
var moduleName = process.argv[3];
var createDirectories = (baseDir) => {
  const directoriesToCreate = [
    "/websites-factory-modules"
  ];
  directoriesToCreate.forEach((dir) => {
    const dirPath = import_path.default.join(baseDir, dir);
    if (!import_fs.default.existsSync(dirPath)) {
      import_fs.default.mkdirSync(dirPath, { recursive: true });
      console.log(`Directory created: ${dirPath}`);
    } else {
      console.log(`Directory already exists: ${dirPath}`);
    }
  });
};
var copyConfigFile = (baseDir) => {
  const configFileName = "websites-factory-config.json";
  const destPath = import_path.default.join(baseDir, configFileName);
  const sourceFilePath = import_path.default.join(baseDir, "node_modules", "websites-factory", "dist", "websites-factory-config.json");
  if (!import_fs.default.existsSync(destPath)) {
    try {
      import_fs.default.copyFileSync(sourceFilePath, destPath);
    } catch (error) {
      console.error(`Error copying config file: ${error}`);
    }
  } else {
    console.log(`Config file already exists: ${configFileName}`);
  }
};
var copyModules = (baseDir) => {
  const sourceDir = import_path.default.join(baseDir, "node_modules", "websites-factory", "dist", "modules");
  const destDir = import_path.default.join(baseDir, "websites-factory-modules");
  if (import_fs.default.existsSync(sourceDir)) {
    import_fs.default.readdirSync(sourceDir).forEach((item) => {
      const srcItemPath = import_path.default.join(sourceDir, item);
      const destItemPath = import_path.default.join(destDir, item);
      if (import_fs.default.lstatSync(srcItemPath).isDirectory()) {
        if (!import_fs.default.existsSync(destItemPath)) {
          import_fs.default.mkdirSync(destItemPath, { recursive: true });
        }
        copyDirectory(srcItemPath, destItemPath);
      } else {
        import_fs.default.copyFileSync(srcItemPath, destItemPath);
      }
    });
  } else {
    console.error(`Source directory does not exist: ${sourceDir}`);
  }
};
var copyDirectory = (src, dest) => {
  import_fs.default.readdirSync(src).forEach((item) => {
    const srcItemPath = import_path.default.join(src, item);
    const destItemPath = import_path.default.join(dest, item);
    if (import_fs.default.lstatSync(srcItemPath).isDirectory()) {
      if (!import_fs.default.existsSync(destItemPath)) {
        import_fs.default.mkdirSync(destItemPath, { recursive: true });
      }
      copyDirectory(srcItemPath, destItemPath);
    } else {
      import_fs.default.copyFileSync(srcItemPath, destItemPath);
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
  (0, import_child_process.exec)("npm install websites-factory", { cwd: process.cwd() }, (error, stdout, stderr) => {
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
    console.log("Installation of websites-factory-core completed.");
  });
}
