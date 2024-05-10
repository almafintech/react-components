import type { Meta, StoryObj } from "@storybook/react";
import Alert from "../Alert/Alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    children: "This is an info message",
    variant: "INFO",
    hasSummary: false,
  },
};

export const Warn: Story = {
  args: {
    children: "This is a warning message",
    variant: "WARN",
    hasSummary: false,
  },
};

export const Error: Story = {
  args: {
    children: "This is an error message",
    variant: "ERROR",
    hasSummary: false,
  },
};

export const WithSummary: Story = {
  args: {
    children:
      "As part of our commitment to transparency and security, we want to inform you about some important updates and changes to our platform. we're excited to announce that we've launched several new features based on your feedback. These enhancements are designed to improve usability and streamline your experience. We encourage you to explore these additions and let us know your thoughts.",
    variant: "INFO",
    hasSummary: true,
  },
};

export const CustomWithClassName: Story = {
  args: {
    children: "This is a message",
    variant: "INFO",
    className: "w-3/6",
  },
};
