import type { Meta, StoryObj } from "@storybook/react";
import { ToastMessage, showToastMessage } from "../ToastMessage/ToastMessage";
import { Button } from "../Button";

const meta = {
  title: "Components/ToastMessage",
  component: ToastMessage,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div>
        <Button
          text="Click"
          onClick={() => {
            showToastMessage("¡Hiciste click!", {
              containerId: "toastMessageSuccess",
              type: "success",
            });
            showToastMessage("Hiciste click", {
              containerId: "toastMessageError",
              type: "error",
            });
            showToastMessage("Hiciste click", {
              containerId: "toastMessageInfo",
              type: "info",
            });
            showToastMessage("Hiciste click", {
              containerId: "toastMessageWarning",
              type: "warning",
            });
          }}
        />
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ToastMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: { messageId: "toastMessageSuccess" },
};

export const Error: Story = {
  args: { messageId: "toastMessageError" },
};

export const Info: Story = {
  args: { messageId: "toastMessageInfo" },
};

export const Warning: Story = {
  args: { messageId: "toastMessageWarning" },
};
