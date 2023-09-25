import fse from "fs-extra";

interface directory {
  pathName: string;
}

export const checkDirExits = (params: directory) => {
  return fse.existsSync(params.pathName);
};

export const checkDirEmpty = (params: directory) => {
  return fse.readdirSync(params.pathName);
};
