import type { Meta, StoryObj } from "@storybook/react";
import InputTextArea from "../InputTextArea/InputTextArea";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/InputTextArea",
  component: InputTextArea,
  parameters: {
    layout: "centered",
  },
  args: {
    maxLength: 1,
  },
} satisfies Meta<typeof InputTextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "textarea",
    maxLength: 250,
    disableAutosize: true,
  },
};
