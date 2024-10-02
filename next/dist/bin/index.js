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
  const sourcePath = path.join(__dirname, configFileName);
  const destPath = path.join(baseDir, configFileName);
  if (!fs.existsSync(destPath)) {
    try {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Config file copied: ${configFileName}`);
    } catch (error) {
      console.error(`Error copying config file: ${error}`);
    }
  } else {
    console.log(`Config file already exists: ${configFileName}`);
  }
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
  exec("npm install websites-factory-core", { cwd: process.cwd() }, (error, stdout, stderr) => {
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
    copyConfigFile(baseDir);
    console.log(stdout);
    console.log("Installation of websites-factory-core completed.");
  });
}
