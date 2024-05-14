import type { Meta, StoryObj } from "@storybook/react";
import Dropdown from "../Dropdown/Dropdown";
import { Button } from "../Button";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button text="Trigger"></Button>,
    selectionMode: "single",
    items: [
      {
        key: "new",
        label: "New file",
        action: () => console.log("new"),
      },
      {
        key: "copy",
        label: "Copy link",
        action: () => console.log("copy"),
      },
      {
        key: "edit",
        label: "Edit file",
        action: () => console.log("edit"),
      },
      {
        key: "delete",
        label: "Delete file",
        action: () => console.log("delete"),
      },
    ],
  },
};

export const MultipleSelection: Story = {
  args: {
    ...Default.args,
    selectionMode: "multiple",
  },
};


