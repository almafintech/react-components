// Subpath imports made possible by the following article:
// https://medium.com/singapore-gds/how-to-support-subpath-imports-using-react-rollup-typescript-1d3d331f821b

import { defineConfig } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import terser from "@rollup/plugin-terser";
import { babel } from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import generatePackageJson from "rollup-plugin-generate-package-json";
import svgr from "@svgr/rollup";
import tailwindConfig from "./tailwind.config.js";
import pkg from "./package.json" assert { type: "json" };
import fs from "fs";

const commonPlugins = [
  external(),
  typescriptPaths(),
  svgr(),
  resolve(),
  commonjs(),
  typescript({ tsconfig: "./tsconfig.json" }),
  postcss({
    minimize: true,
    plugins: [autoprefixer(), tailwindcss(tailwindConfig)],
    inject: {
      insertAt: "top",
    },
  }),
  // babel({
  //   babelHelpers: "bundled",
  //   exclude: "node_modules/**",
  //   extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"],
  // }),
  // terser(),
];

// const subfolderPlugins = (folderName) => [
//   ...plugins,
//   generatePackageJson({
//     baseContents: {
//       name: `${pkg.name}/${folderName}`,
//       private: true,
//       main: "../cjs/index.js", // --> points to cjs format entry point of whole library
//       module: "./index.js", // --> points to esm format entry point of individual component
//       types: "./index.d.ts", // --> points to types definition file of individual component
//     },
//   }),
// ];

export const getComponentsFolders = (entry) => {
  const dirs = fs.readdirSync(entry);
  const dirsWithoutIndex = dirs.filter(
    (name) => name !== "index.ts" && name !== "utils"
  );
  return dirsWithoutIndex;
};

// const folderBuilds = ["Button"].map((folder) => {
//   return {
//     input: `src/components/${folder}/index.ts`,
//     output: {
//       file: `dist/${folder}/index.js`,
//       sourcemap: true,
//       // exports: "named",
//       format: "esm",
//       exports: "named",
//     },
//     plugins: subfolderPlugins(folder),
//     external: ["react", "react-dom"],
//   };
// });

// Returns rollup configuration for a given component
function component(commonPlugins, folder) {
  return {
    input: `src/components/${folder}/index.ts`,
    output: [
      {
        file: `dist/${folder}/index.esm.js`,
        exports: "named",
        format: "esm",
        banner: `'use client';`,
      },
      {
        file: `dist/${folder}/index.cjs.js`,
        exports: "named",
        format: "cjs",
        banner: `'use client';`,
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
  // Build all components in ./src/*
  ...getComponentsFolders("./src/components").map((folder) =>
    component(commonPlugins, folder)
  ),
  // Build the main file that includes all components and utils
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.esm.js",
        exports: "named",
        format: "esm",
        banner: `'use client';`,
      },
      {
        file: "dist/index.cjs.js",
        exports: "named",
        format: "cjs",
        banner: `'use client';`,
      },
    ],
    plugins: commonPlugins,
    // Ignore warnings when using "use client" directive
    onwarn(warning, warn) {
      if (warning.code !== "MODULE_LEVEL_DIRECTIVE") {
        warn(warning);
      }
    },
    external: [/node_modules/],
  },
];

// export default defineConfig([
//   {
//     input: "src/index.ts",
//     output: [
//       {
//         file: pkg.main,
//         format: "cjs",
//         sourcemap: true,
//         exports: "named",
//       },
//       {
//         file: pkg.module,
//         format: "esm",
//         sourcemap: true,
//         exports: "named",
//       },
//     ],
//     plugins,
//     // Ignore warnings when using "use client" directive
//     onwarn(warning, warn) {
//       if (warning.code !== "MODULE_LEVEL_DIRECTIVE") {
//         warn(warning);
//       }
//     },
//   },
//   {
//     input: "dist/esm/types/index.d.ts",
//     output: [{ file: "dist/index.d.ts", format: "esm" }],
//     external: [/\.scss$/, /\.css$/],
//     plugins: [dts()],
//   },
//   // ...folderBuilds,
// ]);

// Return array of folder names
// const getFolders = (path) => {
//   return fs.readdirSync(path).filter((file) => {
//     return fs.statSync(`${path}/${file}`).isDirectory();
//   });
// };

// getFolders("./src/components")
