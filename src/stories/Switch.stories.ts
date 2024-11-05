import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Switch from "../Switch/Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  args: {
    onValueChange: fn(),
  },
  argTypes: {
    isLoading: { control: "boolean" },
    isDisabled: { control: "boolean" },
    defaultSelected: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isLoading: false,
  },
};

export const DefaultSelected: Story = {
  args: {
    defaultSelected: true,
  },
};

export const IsDisabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const IsLoading: Story = {
  args: {
    isLoading: true,
  },
};

export const DefaultWithBymaTheme: Story = {
  args: {
    isLoading: false,
    theme: "byma",
  },
};
