import type { Meta, StoryObj } from "@storybook/react";
import Message from "../Message/Message";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Message",
  component: Message,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

export const infoMessage: Story = {
  args: {
    message: "This is a info message",
    variant: "info",
  },
};

export const errorMessage: Story = {
  args: {
    message: "This is a error message",
    variant: "error",
  },
};

export const successMessage: Story = {
  args: {
    message: "This is a success message",
    variant: "success",
  },
};
