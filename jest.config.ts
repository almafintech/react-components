import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

export default config;
