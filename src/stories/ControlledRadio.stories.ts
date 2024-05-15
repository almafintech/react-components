import type { Meta, StoryObj } from "@storybook/react";
import ControlledRadio from "../ControlledRadio/ControlledRadio";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/ControlledRadio",
  component: ControlledRadio,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof ControlledRadio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Option",
    value: "option",
    name: "name",
    checked: false,
  },
};

export const checked: Story = {
  args: {
    ...Default.args,
    checked: true
  },
};
