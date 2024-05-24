import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "../Skeleton/Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: "20rem",
    height: "12rem"
  },
};

export const WithCustomBorderRadius: Story = {
  args: {
   ...Default.args,
   borderRadius: "0rem"
  },
};
