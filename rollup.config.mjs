// Subpath imports made possible by the following article:
// https://medium.com/singapore-gds/how-to-support-subpath-imports-using-react-rollup-typescript-1d3d331f821b

import { defineConfig } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
// import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import terser from "@rollup/plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import generatePackageJson from "rollup-plugin-generate-package-json";
import svgr from "@svgr/rollup";
import tailwindConfig from "./tailwind.config.js";
import pkg from "./package.json" assert { type: "json" };
import fs from "fs";

const commonPlugins = (declarationDir) => [
  external(), // Keep from including peerDependencies since they are expected to be provided by the consumer of the library
  svgr(), // Convert SVGs to React components
  resolve(), // Locate and bundle third-party dependencies in node_modules
  commonjs(), // Convert CommonJS modules to ES6
  // typescript({ tsconfig: "./tsconfig.json", declarationDir: declarationDir }), // Compile TypeScript files
  typescript({ tsconfig: "./tsconfig.json", useTsconfigDeclarationDir: true }), // Compile TypeScript files
  postcss({
    minimize: true,
    plugins: [autoprefixer(), tailwindcss(tailwindConfig)],
    inject: {
      insertAt: "top",
    },
  }), // Process CSS files
  // terser(), // Minify output
];

export const getComponentsFolders = (entry) => {
  const dirs = fs.readdirSync(entry);
  const dirsWithoutIndex = dirs.filter(
    (name) =>
      name !== "index.ts" && name !== "styles" && name !== "declaration.d.ts"
  );

  console.log("dirs", dirs);
  console.log("dirsWithoutIndex", dirsWithoutIndex);

  return dirsWithoutIndex;
};

// Returns rollup configuration for a given component
function component(commonPlugins, folder) {
  return {
    input: `src/${folder}/index.ts`,
    output: [
      {
        file: `dist/${folder}/index.esm.js`,
        exports: "named",
        format: "esm",
        // banner: `'use client';`,
        sourcemap: true,
      },
      {
        file: `dist/${folder}/index.cjs.js`,
        exports: "named",
        format: "cjs",
        // banner: `'use client';`,
        sourcemap: true,
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
    // Don't bundle node_modules
    //
    // We should also exclude relative imports of other components, but a trivial exclude of /\.\./ does not work
    // It may require changes to the way the components are exported
    external: [/node_modules/],
  };
}

export default [
  // Build all components separately for individual imports
  ...getComponentsFolders("./src").map((folder) =>
    component(commonPlugins(`dist/${folder}`), folder)
  ),
  // Build the main file that includes all components
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.module,
        exports: "named",
        format: "esm",
        // banner: `'use client';`,
        sourcemap: true,
      },
      {
        file: pkg.main,
        exports: "named",
        format: "cjs",
        // banner: `'use client';`,
        sourcemap: true,
      },
    ],
    plugins: commonPlugins("dist"),
    // Ignore warnings when using "use client" directive
    onwarn(warning, warn) {
      if (warning.code !== "MODULE_LEVEL_DIRECTIVE") {
        warn(warning);
      }
    },
    external: [/node_modules/],
  },
];
