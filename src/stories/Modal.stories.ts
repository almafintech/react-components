import type { Meta, StoryObj } from "@storybook/react";
import Modal from "../Modal/Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Content"
  },
};
