import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import InputCopy from "../InputCopy/InputCopy";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/InputCopy",
  component: InputCopy,
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputCopy>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "https://www.google.com",
  },
};
