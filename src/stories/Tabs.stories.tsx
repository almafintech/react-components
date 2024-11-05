import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Tabs from "../Tabs/Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  args: {
    handleChange: fn(),
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="tabsContainer">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: "1",
        label: "Tab 1",
      },
      {
        id: "2",
        label: "Tab 2",
      },
      {
        id: "3",
        label: "Tab 3",
      },
    ],
  },
};

export const DefaultSelectedKey: Story = {
  args: {
    ...Default.args,
    defaultSelectedKey: "2",
  },
};

export const DarkBlueVariant: Story = {
  args: {
    ...Default.args,
    colorVariant: "dark_blue",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const DisabledKeys: Story = {
  args: {
    ...Default.args,
    disabledKeys: ["2"],
  },
};

export const WithContent: Story = {
  args: {
    items: [
      {
        id: "1",
        label: "Tab 1",
        content: "Tab 1 Content",
      },
      {
        id: "2",
        label: "Tab 2",
        content: "Tab 2 Content",
      },
      {
        id: "3",
        label: "Tab 3",
        content: "Tab 3 Content",
      },
    ],
  },
};

export const DefaultWithBymaTheme: Story = {
  args: {
    ...Default.args,
    theme: "byma",
  },
};
