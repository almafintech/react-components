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
    onRemove: { action: "removed" },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
  },
};

export const Removable: Story = {
  args: {
    label: "Label",
    removable: true,
  },
};

export const Selected: Story = {
  args: {
    label: "Label",
    removable: true,
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    removable: true,
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    label: "Label",
    removable: true,
    size: "large",
  },
};

export const LargeSelected: Story = {
  args: {
    label: "Label",
    removable: true,
    size: "large",
    selected: true,
  },
};