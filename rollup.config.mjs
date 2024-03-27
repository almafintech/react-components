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
import {typescriptPaths} from "rollup-plugin-typescript-paths"
import svgr from '@svgr/rollup'
import tailwindConfig from "./tailwind.config.js";
import pkg from "./package.json" assert { type: "json" };


export default defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
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
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"],
      }),
      terser(),
    ],
    // Ignore warnings when using "use client" directive
    onwarn(warning, warn) {
      if (warning.code !== "MODULE_LEVEL_DIRECTIVE") {
        warn(warning);
      }
    },
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.scss$/, /\.css$/],
    plugins: [dts()],
  },
]);
