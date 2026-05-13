import type { Meta, StoryObj } from "@storybook/react";
import LoadingCircle from "../LoadingCircle/LoadingCircle";

const meta = {
  title: "Feedback & Status/Loading Circle",
  component: LoadingCircle,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: {
      control: "color",
    },
    small: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingCircle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    small: false,
  },
};

export const Small: Story = {
  args: {
    small: true,
  },
};

export const CustomColor: Story = {
  args: {
    small: false,
    color: "#10b981",
  },
};
