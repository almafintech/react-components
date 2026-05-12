import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "../Chip";

const meta = {
  title: "Actions/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: { control: "radio", options: ["medium", "large"] },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    onRemove: undefined,
  },
};

export const Removable: Story = {
  args: {
    label: "Label",
    onRemove: () => {},
  },
};

export const Selected: Story = {
  args: {
    label: "Label",
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    onRemove: () => {},
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    label: "Label",
    size: "large",
  },
};

export const LargeSelected: Story = {
  args: {
    label: "Label",
    size: "large",
    selected: true,
  },
};