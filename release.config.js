const config = {
  branches: ["main", "next", "beta"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    "@semantic-release/npm",
    "@semantic-release/git",
  ],
};

module.exports = config;
