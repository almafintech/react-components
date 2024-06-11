import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "../Tooltip/Tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>Hover me</span>,
    content: "Este es un mensaje",
    width: "14rem",
    variant: "blue"
  },
};

export const White: Story = {
  args: {
    ...Default.args,
    variant: "white",
  },
};

export const Black: Story = {
  args: {
    ...Default.args,
    variant: "black",
  },
};

export const WithCustomPlacement: Story = {
  args: {
    ...Default.args,
    placement: "left"
  },
};

export const WithCustomDelay: Story = {
  args: {
    ...Default.args,
   delay: 5
  },
};


export const WithCustomOffset: Story = {
  args: {
    ...Default.args,
  offset: 12
  },
};


export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true
  },
};
