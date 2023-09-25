#!/usr/bin/env node

import { green } from "picocolors";
import packageJson from "./package.json";
import Commander from "commander";
import path from "path";
import { cwd, argv } from "process";
import fs from "fs";
import fse from "fs-extra";

let projectPath: string = "";

const handleExit = () => process.exit(1);

process.on("SIGTERM", handleExit);
process.on("SIGINT", handleExit);

const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .usage(`${green("<project-directory>")} [options]`)
  .description("Command line utility used for creating new Rezact project")
  .argument("<project-directory>")
  .parse(argv);

projectPath = path.resolve(cwd(), argv[2]);

// copy folder from template to new folder
console.log("Copying Project Files...");

fs.mkdirSync(projectPath);

fse.copySync(`${cwd()}/templates/default`, projectPath);

//create packkage.json file
const JsonPackage = `{
  "name": "${argv[2]}",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "typescript": "*",
    "vite": "latest"
  },
  "dependencies": {
    "@rezact/rezact": "latest"
  }
}
`;
fs.writeFileSync(`${projectPath}/package.json`, JsonPackage);

//console.log install instructions
console.log(`${argv[2]} created!`);
console.log();
console.log(`cd ${argv[2]}`);
console.log();
console.log("npm install");
console.log();
console.log("npm run dev");

process.exit(1);
