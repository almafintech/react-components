import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "../Checkbox/Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Option",
    isDisabled: false,
  },
};

export const isDisabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const DefaultSelected: Story = {
  args: {
    ...Default.args,
    defaultSelected: true,
  },
};

export const AlwaysSelected: Story = {
  args: {
    ...Default.args,
    isSelected: true,
  },
};
