const path = require("path");

const config = {
  branches: ["main", "next", "beta"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          { type: "style", release: "patch" },
          { type: "refactor", release: "patch" },
        ],
      },
    ],
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
        prepareCmd: "./postVersion.sh ${nextRelease.version}",
      },
    ],
    "@semantic-release/git",
  ],
};

module.exports = config;
