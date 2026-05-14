import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@chromatic-com/storybook",
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        rules: [
          {
            test: /\.css$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: {
                    auto: true,
                    localIdentName: "[name]__[local]--[hash:base64:5]",
                  },
                },
              },
            ],
          },
          {
            test: /\.module\.scss$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: { importLoaders: 1 },
              },
              {
                // Gets options from `postcss.config.js` in your project root
                loader: "postcss-loader",
                options: { implementation: import.meta.resolve("postcss") },
              },
            ],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "sass-loader",
                options: { implementation: import.meta.resolve("sass") },
              },
            ],
          },
        ],
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),
  webpackFinal: async (config, { configType }) => {
    if (!config?.module?.rules) return config;

    // Remove the default SVG file-loader rule so SVGR can handle .svg files
    config.module.rules = config.module.rules.map((rule: any) => {
      if (rule?.test?.toString().includes("svg")) {
        return { ...rule, exclude: /\.svg$/ };
      }
      return rule;
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            template: (variables: any, { tpl }: any) => tpl`
              ${variables.imports};
              ${variables.interfaces};
              const ${variables.componentName} = (${variables.props}) => ${variables.jsx};
              export { ${variables.componentName} as ReactComponent };
              export default ${variables.componentName};
            `,
          },
        },
      ],
    });

    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@arrows": path.resolve(__dirname, "../assets/icons/arrows"),
      "@icons": path.resolve(__dirname, "../assets/icons"),
    };

    return config;
  },
  env: (config: Record<string, string> | undefined, options: any) => ({
    ...config,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || "",
  }),
};
export default config;
