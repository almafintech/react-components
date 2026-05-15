import type { Meta } from "@storybook/react";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";

const meta = {
  title: "Actions/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    viewport: { defaultViewport: "reset" },
  },
} satisfies Meta<typeof ButtonGroup>;

export const Default = {
  args: {
    primary: { text: "Button", onClick: () => {} },
    secondary: { text: "Button", variant: "secondary", onClick: () => {} },
    tertiary: { text: "Button", variant: "tertiary", onClick: () => {} },
  },
};

export const Container = {
  args: {
    ...Default.args,
    container: true,
  },
};

export const MoreOptions = {
  args: {
    ...Default.args,
    moreOptions: (
      <Button text="More Options" variant="tertiary" onClick={() => {}} />
    ),
  },
};

export const Elevated = {
  args: {
    ...Default.args,
    hasElevation: true,
  },
};

export const AlignedLeft = {
  args: {
    ...MoreOptions.args,
    align: "left",
    container: true,
  },
};

export const AlignedCenter = {
  args: {
    ...Default.args,
    align: "center",
    container: true,
  },
};

export const AlignedRight = {
  args: {
    ...MoreOptions.args,
    align: "right",
    container: true,
  },
};

export const Vertical = {
  args: {
    ...Default.args,
    layout: "vertical",
    container: true,
  },
};

export const invertOrder = {
  args: {
    ...Default.args,
    invertOrder: true,
    container: true,
  },
};

export const Mobile = {
  args: {
    ...Default.args,
    container: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const CustomContainer = {
  args: {
    ...Default.args,
    container: true,
    containerClassName: "!bg-blue-50 rounded-xl",
  },
};

export const CustomButtonsContainer = {
  args: {
    ...Default.args,
    container: true,
    buttonsContainerClassName: "gap-2 bg-blue-200 p-4 rounded-lg",
  },
};

export default meta;
