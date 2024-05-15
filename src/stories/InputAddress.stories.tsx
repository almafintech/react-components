import type { Meta, StoryObj } from "@storybook/react";
import InputAddress from "../InputAddress/InputAddress";
import { fn } from "@storybook/test";


const meta = {
  title: "Components/InputAddress",
  component: InputAddress,
  parameters: {
    layout: "centered",
  },
  args: {
    onValueChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="inputContainer">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputAddress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Dirección",
    name: "address",
    country: "A",
    isFormField: false,
    disabled: false,
    touched: false,
    exactAddress: false
  },
};

export const withCustomCountry: Story = {
  args: {
    ...Default.args,
    country: "ar",
  },
};

export const withExactAddress: Story = {
    args: {
      ...Default.args,
      exactAddress: true
    },
  };

export const withDescription: Story = {
  args: {
    ...Default.args,
    description: "Escribí tu dirección",
  },
};

export const withPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: "Dirección",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const isFormField: Story = {
  args: {
    ...Default.args,
    isFormField: true,
  },
};

export const isValid: Story = {
  args: {
    ...Default.args,
    value: "Belgrano, CABA",
    isInvalid: false,
    touched: true,
  },
};

export const isInvalid: Story = {
  args: {
    ...Default.args,
    value: "Belgrano, CABA",
    isInvalid: true,
    touched: true,
  },
};

export const isInvalidWithCustomErrorMessage: Story = {
  args: {
    ...Default.args,
    value: "Belgrano, CABA",
    isInvalid: true,
    touched: true,
    errorMessage: "La dirección ingresada no es válida",
  },
};
