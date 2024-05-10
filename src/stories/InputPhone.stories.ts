import type { Meta, StoryObj } from "@storybook/react";
import InputPhone from "../InputPhone/InputPhone";

const meta = {
  title: "Components/InputPhone",
  component: InputPhone,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputPhone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "phone",
    placeholder: "1159682222",
  },
};

export const WithDescription: Story = {
  args: {
    name: "phone",
    description: "Número de teléfono con código de área sin 0 ni 15",
  },
};

export const isValid: Story = {
  args: {
    name: "phone",
    isValid: true
  },
};

export const isInvalid: Story = {
  args: {
    name: "phone",
    isValid: false
  },
};

export const isInvalidWithCustomErrorMessage: Story = {
  args: {
    name: "phone",
    isValid: false,
    errorMessage: "Número de teléfono con código de área sin 0 ni 15"
  },
};