import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import InputTextArea from "../InputTextArea/InputTextArea";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/InputTextArea",
  component: InputTextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    maxLength: 1,
  },
  decorators: [
    (Story) => (
      <div className="inputContainer">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputTextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "textarea",
    maxLength: 250,
    disableAutosize: true,
    label: "Mensaje",
  },
};
