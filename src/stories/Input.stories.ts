import type { Meta, StoryObj } from "@storybook/react";
import Input from "../Input/Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: "value",
  },
};
