import type { Meta, StoryObj } from "@storybook/react";
import InputPhone from "../InputPhone/InputPhone";

const meta = {
  title: "Components/InputPhone",
  component: InputPhone,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputPhone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "phone"
  },
};
