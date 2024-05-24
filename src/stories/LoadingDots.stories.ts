import type { Meta, StoryObj } from "@storybook/react";
import LoadingDots from "../LoadingDots/LoadingDots";

const meta = {
  title: "Components/LoadingDots",
  component: LoadingDots,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoadingDots>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "#8690a1",
  },
};
