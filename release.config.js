const path = require("path");

const config = {
  branches: ["main", "next", "beta"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/github",
    [
      "@semantic-release/npm",
      {
        pkgRoot: "dist",
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd: "npm run postversion",
      },
    ],
    "@semantic-release/git",
  ],
};

module.exports = config;
