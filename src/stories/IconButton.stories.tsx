import type { Meta, StoryObj } from "@storybook/react";
import IconButton from "../IconButton/IconButton";
import { Tooltip } from "../Tooltip";
import { Dropdown } from "../Dropdown";

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    width="16"
    height="16"
    color="currentColor"
  >
    <path
      d="M8 1v9m0 0L5 7m3 3 3-3M2 12h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta = {
  title: "Actions/Icon Button",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    icon: <DownloadIcon />,
    size: "medium",
    disabled: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// --- Filled ---

export const Filled: Story = {
  args: { variant: "filled" },
};

export const FilledWithBadge: Story = {
  args: { variant: "filled", badge: 4 },
};

export const FilledDisabled: Story = {
  args: { variant: "filled", disabled: true },
};

// --- Outline ---

export const Outline: Story = {
  args: { variant: "outline" },
};

export const OutlineWithBadge: Story = {
  args: { variant: "outline", badge: 4 },
};

export const OutlineWithLabel: Story = {
  args: { variant: "outline", label: "Label" },
};

export const OutlineDisabled: Story = {
  args: { variant: "outline", disabled: true },
};

export const OutlineWithLabelDisabled: Story = {
  args: { variant: "outline", label: "Label", disabled: true },
};

// --- Ghost ---

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const GhostDisabled: Story = {
  args: { variant: "ghost", disabled: true },
};

// --- Sizes ---

export const Small: Story = {
  args: { variant: "filled", size: "small" },
};

export const Medium: Story = {
  args: { variant: "filled", size: "medium" },
};

export const Large: Story = {
  args: { variant: "filled", size: "large" },
};

// --- Custom className ---

export const Custom: Story = {
  args: {
    variant: "outline",
    className: "!rounded-full !w-14 !h-14 shadow-lg",
  },
};

// --- With Tooltip ---

export const WithTooltip: Story = {
  render: (args) => (
    <Tooltip content="Descargar">
      <IconButton {...args} />
    </Tooltip>
  ),
  args: { variant: "filled" },
};

// --- With Dropdown ---

export const WithDropdown: Story = {
  render: (args) => (
    <Dropdown
      items={[
        { key: "download", label: "Descargar", action: () => {} },
        { key: "share", label: "Compartir", action: () => {} },
        { key: "delete", label: "Eliminar", action: () => {} },
      ]}
    >
      <IconButton {...args} />
    </Dropdown>
  ),
  args: { variant: "filled" },
};
