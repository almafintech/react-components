import type { Preview } from "@storybook/react";

import "./index.scss";
import "../src/styles/global.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['*'],
        method: 'alphabetical',
      },
    },
  },
};

export default preview;
