export const splitDir = (projectPath: string) => {
  if (process.platform === "win32") {
    return projectPath.split("\\")[projectPath.split("\\").length - 1];
  } else {
    return projectPath.split("/")[projectPath.split("/").length - 1];
  }
};
