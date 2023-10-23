#!/usr/bin/env node

import colors from "picocolors";
import packageJson from "./package.json";
import { Command } from "commander";
import path from "path";
import { fileURLToPath } from "url";
import { cwd, argv } from "process";
import fs from "fs-extra";
import { checkDirEmpty, checkDirExits } from "./helpers/check-dir.js";
import { splitDir } from "./helpers/split-dir.js";
import { select, input } from "@inquirer/prompts";

let projectPath: string = "";

// const program = new Command(packageJson.name)
//   .version(packageJson.version)
//   .usage(`${colors.green("<project-directory>")} [options]`)
//   .description("Command line utility used for creating new Rezact project")
//   .argument("<project-directory>")
//   .option("-ts --typescript", "Use Typescript")
//   .option("-tw --tailwind", "Use tailwind as default styling")
//   .parse(argv);

// const options = program.opts();
// //choose flavor
// console.log(options);
//choose if tailwind or not

console.log("Welcome, Quickly scaffold a rezact Project");
console.log();

const directory = await input({
  message: "Project name?",
  default: "my-app",
});

const typescript = await select({
  message: "Use Typescript?",
  choices: [
    {
      name: "Yes",
      value: true,
    },
    {
      name: "No",
      value: false,
    },
  ],
});
const tailwind = await select({
  message: "Use Tailwind CSS?",
  choices: [
    {
      name: "Yes",
      value: true,
    },
    {
      name: "No",
      value: false,
    },
  ],
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

projectPath = path.resolve(cwd(), directory);

// copy folder from template to new folder
console.log("Creating New Rezact Project...");

//check if dir exists
const dirExist = checkDirExits({ pathName: projectPath });

// if (!dirExist) {
//   fs.mkdirSync(projectPath);
// }

if (dirExist) {
  const compareAgainst = [
    ".gitignore",
    "index.html",
    "package.json",
    "tsconfig.json",
    "vite.config.ts",
  ];
  const dirContent = checkDirEmpty({ pathName: projectPath });
  compareAgainst.map((i) => {
    if (dirContent.includes(i)) {
      console.log("Please Choose another directory as this is not empty");
      process.exit(1);
    }
  });
}

const templateDir = path.join(__dirname, "templates");
fs.copySync(
  `${templateDir}/${
    typescript
      ? `${tailwind ? "tw-ts" : "default-ts"}`
      : `${tailwind ? "tw" : "default"}`
  }`,
  projectPath
);

const projectName = splitDir(projectPath);

//create packkage.json file
const JsonPackage = `{
  "name": "${projectName}",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": ${typescript ? `"tsc && vite build"` : `"vite build"`},
    "preview": "vite preview"
  },
  ${
    tailwind
      ? `"devDependencies": {
      ${typescript ? `"typescript": "*",` : ""}
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "latest",
    "vite": "latest"
  },`
      : `"devDependencies": {
        ${typescript ? ` "typescript": "*",` : ""}
    "vite": "latest"
  },`
  }
  
  "dependencies": {
    "@rezact/rezact": "latest"
  }
}
`;
fs.writeFileSync(`${projectPath}/package.json`, JsonPackage);

//console.log install instructions
console.log(`${projectName} created!`);
console.log();
console.log(`cd ${projectName}`);
console.log();
console.log("npm install");
console.log();
console.log("npm run dev");
