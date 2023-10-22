#!/usr/bin/env node

import colors from "picocolors";
import packageJson from "./package.json" assert { type: "json" };
import { Command } from "commander";
import path from "path";
import { cwd, argv } from "process";
import fs from "fs";
import fse from "fs-extra";
import { checkDirEmpty, checkDirExits } from "./helpers/check-dir.js";
import { splitDir } from "./helpers/split-dir.js";
import { select } from "@inquirer/prompts";

let projectPath: string = "";

const program = new Command(packageJson.name)
  .version(packageJson.version)
  .usage(`${colors.green("<project-directory>")} [options]`)
  .description("Command line utility used for creating new Rezact project")
  .argument("<project-directory>")
  .option("-ts --typescript", "Use Typescript")
  .option("-tw --tailwind", "Use tailwind as default styling")
  .parse(argv);

const options = program.opts();
//choose flavor
console.log(options);
//choose if tailwind or not

const typescript = await select({
  message: "Would you like to use Typescript?",
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
// const tailwind = await select({
//   message: "Would you like to use Tailwind CSS for styling?",
//   choices: [
//     {
//       name: "Yes",
//       value: true,
//     },
//     {
//       name: "No",
//       value: false,
//     },
//   ],
// });

console.log(typescript);

projectPath = path.resolve(cwd(), argv[2]);

// copy folder from template to new folder
console.log("Creating New Rezact Project...");

//check if dir exists
const dirExist = checkDirExits({ pathName: projectPath });

// if (!dirExist) {
//   fs.mkdirSync(projectPath);
// }

// if (dirExist) {
//   const compareAgainst = [
//     ".gitignore",
//     "index.html",
//     "package.json",
//     "tsconfig.json",
//     "vite.config.ts",
//   ];
//   const dirContent = checkDirEmpty({ pathName: projectPath });
//   compareAgainst.map((i) => {
//     if (dirContent.includes(i)) {
//       console.log("Please Choose another directory as this is not empty");
//       process.exit(1);
//     }
//   });
// }

// const templateDir = path.join(__dirname, "templates");
// fse.copySync(`${templateDir}/default`, projectPath);

const projectName = splitDir(projectPath);

//create packkage.json file
const JsonPackage = `{
  "name": "${projectName}",
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
//fs.writeFileSync(`${projectPath}/package.json`, JsonPackage);

//console.log install instructions
console.log(`${projectName} created!`);
console.log();
console.log(`cd ${projectName}`);
console.log();
console.log("npm install");
console.log();
console.log("npm run dev");
