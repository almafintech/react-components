import type { Meta, StoryObj } from "@storybook/react";
import { ToastMessage } from "../ToastMessage/ToastMessage";

const meta = {
  title: "Components/ToastMessage",
  component: ToastMessage,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ToastMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { messageId: "1" },
};
