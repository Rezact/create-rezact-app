import fse from "fs-extra";

interface directory {
  pathName: string;
}

export const checkDir = (params: directory) => {
  return fse.existsSync(params.pathName);
};
