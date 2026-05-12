import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Button from "../Button/Button";

const meta = {
  title: "Actions/Button",
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
      options: ["small", "medium", "large"],
      control: {
        type: "select",
      },
    },
    isDisabled: {
      control: "boolean",
    },
    isLoading: {
      control: "boolean",
    },
    menu: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    text: "Click",
    size: "medium",
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

export const Menu: Story = {
  args: {
    ...Primary.args,
    menu: [{ label: "Opción 1" }, { label: "Opción 2" }, { label: "Opción 3" }],
  },
};

export const LeadingIcon: Story = {
  args: {
    ...Primary.args,
    leadingIcon: "🚀",
  },
};

export const TrailingIcon: Story = {
  args: {
    ...Primary.args,
    trailingIcon: "➡️",
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    ...Primary.args,
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    size: "large",
  },
};

export const loading: Story = {
  args: {
    ...Primary.args,
    isLoading: true,
  },
};

export const disabled: Story = {
  args: {
    ...Primary.args,
    isDisabled: true,
  },
};

export const Custom: Story = {
  args: {
    ...Primary.args,
    className:
      "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
  },
};
