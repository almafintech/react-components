// Subpath imports made possible by the following article:
// https://medium.com/singapore-gds/how-to-support-subpath-imports-using-react-rollup-typescript-1d3d331f821b

import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import terser from "@rollup/plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import generatePackageJson from "rollup-plugin-generate-package-json";
import replace from "@rollup/plugin-replace";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import svgr from "@svgr/rollup";
import dotenv from "dotenv";
import tailwindConfig from "./tailwind.config.js";
import pkg from "./package.json" assert { type: "json" };
import { getComponentsFolders } from "./scripts/utils.js";

dotenv.config();

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const globals = {
  react: "React",
  "react-dom": "ReactDOM",
};

const commonPlugins = [
  replace({
    "process.env.GOOGLE_MAPS_API_KEY": JSON.stringify(
      process.env.GOOGLE_MAPS_API_KEY
    ),
    // add other environment variables here
  }),
  // dotenv(), // Load environment variables
  external(), // Keep from including peerDependencies since they are expected to be provided by the consumer of the library
  image(), // Bundle images
  resolve({ extensions, browser: true }), // Locate and bundle third-party dependencies in node_modules
  commonjs(), // Convert CommonJS modules to ES6
  typescript({ tsconfig: "./tsconfig.json", useTsconfigDeclarationDir: true }), // Compile TypeScript files
  postcss({
    plugins: [autoprefixer(), tailwindcss(tailwindConfig)],
    extract: "index.css",
    autoModules: true,
    extensions: [".scss"],
    use: ["sass"],
    minimize: true,
    sourceMap: true,
  }), // Compile CSS files
  terser(), // Minify output
  json(), // Compile JSON files
  svgr(), // Compile SVG files
];

// Returns rollup configuration for a given component
function component(folder) {
  return {
    input: `src/${folder}/index.ts`,
    output: [
      {
        file: `dist/${folder}/index.esm.js`,
        exports: "named",
        format: "esm",
        sourcemap: true,
        globals,
      },
      {
        file: `dist/${folder}/index.cjs.js`,
        exports: "named",
        format: "cjs",
        sourcemap: true,
        globals,
      },
    ],
    plugins: [
      ...commonPlugins,
      generatePackageJson({
        baseContents: {
          name: `${pkg.name}/${folder}`,
          private: true,
          main: "./index.cjs.js",
          module: "./index.esm.js",
          types: "./index.d.ts",
          peerDependencies: pkg.peerDependencies,
        },
        outputFolder: `dist/${folder}/`,
      }),
    ],
    // Ignore warnings when using "use client" directive
    onwarn(warning, warn) {
      if (warning.code !== "MODULE_LEVEL_DIRECTIVE") {
        warn(warning);
      }
    },
    // Don't bundle this
    external: [
      /node_modules/,
      "uuid",
      "file-saver",
      "react-phone-input-2",
      "react-toastify",
    ],
  };
}

export default [
  // Build all components separately for individual imports
  ...getComponentsFolders("./src").map((folder) => component(folder)),
  // Build the main file that includes all components
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.module,
        exports: "named",
        format: "esm",
        sourcemap: true,
        globals,
      },
      {
        file: pkg.main,
        exports: "named",
        format: "cjs",
        sourcemap: true,
        globals,
      },
    ],
    plugins: commonPlugins,
    // Ignore warnings when using "use client" directive
    onwarn(warning, warn) {
      if (warning.code !== "MODULE_LEVEL_DIRECTIVE") {
        warn(warning);
      }
    },
    // Don't bundle node_modules
    external: [
      /node_modules/,
      "uuid",
      "file-saver",
      "react-phone-input-2",
      "react-toastify",
    ],
  },
];
