/* eslint-disable no-console */
const fs = require("fs");
const pkg = require("./utils.js");
const { getComponentsFolders } = pkg;
const { resolve, join, basename } = require("path");
const { readFile, writeFile, copy } = require("fs-extra");
const packagePath = process.cwd();
const distPath = join(packagePath, "./dist");

const writeJson = (targetPath, obj) =>
  writeFile(targetPath, JSON.stringify(obj, null, 2), "utf8");

async function createPackageFile() {
  const packageData = await readFile(
    resolve(packagePath, "./package.json"),
    "utf8"
  );
  const { scripts, devDependencies, ...packageOthers } =
    JSON.parse(packageData);
  const newPackageData = {
    ...packageOthers,
    private: false,
    typings: "./index.d.ts",
    main: "./index.cjs.js",
    module: "./index.esm.js",
  };

  const targetPath = resolve(distPath, "./package.json");

  await writeJson(targetPath, newPackageData);
  console.log(`Created package.json in ${targetPath}`);
}

async function includeFileInBuild(file) {
  const sourcePath = resolve(packagePath, file);
  const targetPath = resolve(distPath, basename(file));
  await copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

async function deleteIndexCssForEachComponent() {
  const componentsFolders = getComponentsFolders("src");
  componentsFolders.forEach(async (folder) => {
    const targetPath = resolve(distPath, folder);
    const files = await fs.promises.readdir(targetPath);
    files.forEach(async (file) => {
      if (file.endsWith(".css") || file.endsWith(".css.map")) {
        const filePath = resolve(targetPath, file);
        await fs.promises.unlink(filePath);
        console.log(`Deleted ${filePath}`);
      }
    });
  });
}

async function run() {
  try {
    await createPackageFile();
    await includeFileInBuild("./README.md");
    await deleteIndexCssForEachComponent();
    // await includeFileInBuild('../../LICENSE');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
