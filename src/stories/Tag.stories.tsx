import type { Meta, StoryObj } from "@storybook/react";
import Tag from "../Tag/Tag";

const meta = {
  title: "Data Display/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 8l3.5 3.5L13 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 4l8 8M12 4l-8 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Success: Story = {
  args: {
    label: "Activo",
    variant: "success",
  },
};

export const Error: Story = {
  args: {
    label: "Rechazado",
    variant: "error",
  },
};

export const Warning: Story = {
  args: {
    label: "Pendiente",
    variant: "warning",
  },
};

export const Info: Story = {
  args: {
    label: "En revisión",
    variant: "info",
  },
};

export const Inactive: Story = {
  args: {
    label: "Inactivo",
    variant: "inactive",
  },
};

export const WithLeadingIcon: Story = {
  args: {
    label: "Confirmado",
    variant: "success",
    leadingIcon: <CheckIcon />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: "Cerrado",
    variant: "error",
    trailingIcon: <CloseIcon />,
  },
};


export const Custom: Story = {
  args: {
    label: "Personalizado",
    variant: "custom",
    leadingIcon: <CheckIcon />,
    className: "bg-purple-500 text-white !p-6 !rounded",
  },
};