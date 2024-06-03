import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import InputTextArea from "../InputTextArea/InputTextArea";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/InputTextArea",
  component: InputTextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    onKeyDown: fn(),
  },
  decorators: [
    (Story) => (
      <div className="inputContainer">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputTextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "textarea",
    maxLength: 250,
    disableAutosize: true,
    label: "Mensaje",
  },
};

export const isFormField: Story = {
  args: {
    ...Default.args,
    isFormField: true,
  },
};

export const withPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: "Ingresá el mensaje",
  },
};

export const withInitialValue: Story = {
  args: {
    ...Default.args,
    initialValue: "Tu mensaje",
  },
};

export const isValid: Story = {
  args: {
    ...Default.args,
    label: "Mensaje",
    initialValue: "Tu mensaje",
    isInvalid: false,
    touched: true,
  },
};

export const isInvalid: Story = {
  args: {
    ...Default.args,
    label: "Mensaje",
    initialValue: "",
    isInvalid: true,
    touched: true,
  },
};

export const isInvalidWithCustomErrorMessage: Story = {
  args: {
    ...Default.args,
    label: "Mensaje",
    isInvalid: true,
    touched: true,
    errorMessage: "Mensaje de error personalizado",
  },
};

export const withMaxLength: Story = {
  args: {
    ...Default.args,
    maxLength: 3,
  },
};
