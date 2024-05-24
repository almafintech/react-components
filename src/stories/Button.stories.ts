import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Button from "../Button/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      options: ["primary", "secondary", "tertiary"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["desktop", "mobile"],
      control: {
        type: "select",
      },
    },
    isDisabled: {
      control: "boolean",
    },
    isLoading:{
      control: "boolean",
    },
    disableAnimation: {
      control: "boolean",
    },
    disableRipple: {
      control: "boolean",
    }
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    text: "Click",
    size: "desktop",
    isDisabled: false,
    isLoading: false,
    disableAnimation: true,
    disableRipple: true
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    ...Primary.args,
    variant: "tertiary",
  },
};

export const Desktop: Story = {
  args: {
    ...Primary.args,
  },
};

export const Mobile: Story = {
  args: {
    ...Primary.args,
    size: "mobile",
  },
};

export const IsLoading: Story = {
  args: {
    ...Primary.args,
    isLoading: true,
  },
};

export const IsDisabled: Story = {
  args: {
    ...Primary.args,
    isDisabled: true,
  },
};

export const WithCustomStyles: Story = {
  args: {
    ...Primary.args,
    className:
      "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
  },
};
