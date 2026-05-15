import type { Meta, StoryObj } from "@storybook/react";
import LoadingCircle from "../LoadingCircle/LoadingCircle";

const meta = {
  title: "Feedback & Status/Loading Circle",
  component: LoadingCircle,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LoadingCircle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "#8690a1",
  },
};
