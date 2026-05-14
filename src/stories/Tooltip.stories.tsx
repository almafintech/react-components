import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "../Tooltip/Tooltip";
import { Button } from "../Button";

const meta = {
  title: "Feedback & Status/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: false },
    content: { control: "text" },
    variant: {
      control: { type: "radio" },
      options: ["light", "dark"],
    },
    placement: {
      control: { type: "radio" },
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      control: { type: "inline-radio" },
      options: ["start", "center", "end"],
    },
    width: { control: "text" },
    offset: { control: { type: "number", min: 0 } },
    delay: { control: { type: "number", min: 0 } },
    size: {
      control: { type: "radio" },
      options: ["medium", "small"],
    },
    disabled: { control: "boolean" },
    showOnClick: { control: "boolean" },
    contentClassName: { control: "text" },
    arrowClassName: { control: "text" },
    open: { control: false },
    defaultOpen: { control: false },
    onOpenChange: { action: "onOpenChange" },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="border border-gray-300 rounded-xl p-4">Hover me</div>
    ),
    content: "Este es un mensaje",
  },
};

export const Dark: Story = {
  args: {
    ...Default.args,
    variant: "dark",
  },
};

export const CustomPlacement: Story = {
  args: {
    ...Default.args,
    placement: "left",
  },
};

export const CustomWidth: Story = {
  args: {
    ...Default.args,
    width: 200,
  },
};

export const CustomDelay: Story = {
  args: {
    ...Default.args,
    delay: 500,
  },
};

export const CustomOffset: Story = {
  args: {
    ...Default.args,
    offset: 12,
  },
};

export const CustomVariant: Story = {
  render: (args) => (
    <>
      <style>{`
        .tooltip-custom-content {
          background-color: #7c3aed;
          color: #fff;
          border: none;
          border-radius: 1rem;
        }
        .tooltip-custom-arrow {
          visibility: hidden;
        }

      `}</style>
      <Tooltip {...args} />
    </>
  ),
  args: {
    ...Default.args,
    contentClassName: "tooltip-custom-content",
    arrowClassName: "tooltip-custom-arrow",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const AlignStart: Story = {
  args: {
    ...Default.args,
    align: "start",
  },
};

export const AlignCenter: Story = {
  args: {
    ...Default.args,
    align: "center",
  },
};

export const AlignEnd: Story = {
  args: {
    ...Default.args,
    align: "end",
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "small",
  },
};

export const ShowOnClick: Story = {
  args: {
    children: (
      <div className="border border-gray-300 rounded-xl p-4">Click me</div>
    ),
    content: "Este es un mensaje",
    showOnClick: true,
  },
};

export const DefaultOpen: Story = {
  args: {
    ...Default.args,
    defaultOpen: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <Tooltip {...args} open={open} onOpenChange={setOpen} />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button text="Open" onClick={() => setOpen(true)} />
          <Button
            text="Close"
            variant="secondary"
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};
