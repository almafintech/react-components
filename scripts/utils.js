const fs = require("fs");

const getComponentsFolders = (entry) => {
  const dirs = fs.readdirSync(entry);
  const dirsWithoutIndex = dirs.filter(
    (name) =>
      name !== "stories" && name !== "index.ts" && name !== "styles" && name !== "declaration.d.ts"
  );

  return dirsWithoutIndex;
};

module.exports.getComponentsFolders = getComponentsFolders;
