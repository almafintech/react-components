import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // Para ignorar archivos SVG
  // transformIgnorePatterns: ["/node_modules/", "\\.svg$"],

  // Para transformar archivos SVG usando svg-transformer.js
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/fileTransformer.js",
    "^.+\\.tsx?$": "babel-jest",
  },
};

export default config;
