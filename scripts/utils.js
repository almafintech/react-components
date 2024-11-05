const fs = require("fs");

const getComponentsFolders = (entry) => {
  const dirs = fs.readdirSync(entry);
  const dirsWithoutIndex = dirs.filter(
    (name) =>
      name !== "index.ts" &&
      name !== "styles" &&
      name !== "stories" &&
      name !== "utils" &&
      name !== "declaration.d.ts"
  );

  return dirsWithoutIndex;
};

module.exports.getComponentsFolders = getComponentsFolders;
