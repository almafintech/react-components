import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Input from "../Input/Input";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Input",
  component: Input,
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
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Nombre",
    type: "text",
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
    placeholder: "Nombre",
  },
};

export const withDescription: Story = {
  args: {
    ...Default.args,
    description: "Tu nombre completo",
  },
};

export const WithInfoMessage: Story = {
  args: {
    ...Default.args,
    info: "CUSTOM",
    customInfo: "Opcional",
  },
};

export const withInitialValue: Story = {
  args: {
    ...Default.args,
    initialValue: "Alejandro",
  },
};

export const withoutLabel: Story = {
  args: {
    ...Default.args,
    placeholder: "Ingresá la cantidad personalizada de días",
    label: "",
    type: "number",
    hasLabel: false,
  },
};

export const search: Story = {
  args: {
    ...Default.args,
    label: "",
    placeholder: "Buscar",
    type: "search",
  },
};

export const Money: Story = {
  args: {
    ...Default.args,
    label: "Monto",
    type: "money",
    initialValue: "3345",
    isNumberPercentage: true,
  },
};

export const MoneyWithCustomCurrency: Story = {
  args: {
    ...Default.args,
    label: "Monto",
    type: "money",
    currency: "USD",
    initialValue: "3345",
    isNumberPercentage: true,
  },
};

export const BalanceWithInfoMessage: Story = {
  args: {
    ...Default.args,
    label: "Monto",
    type: "money",
    balance: 1212,
    info: "BALANCE",
  },
};

export const Number: Story = {
  args: {
    ...Default.args,
    label: "Cantidad",
    initialValue: "10",
    type: "number",
  },
};

export const Percentage: Story = {
  args: {
    ...Default.args,
    label: "Porcentaje",
    type: "number",
    isNumberPercentage: true,
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    label: "Contraseña",
    type: "password",
  },
};

export const Cuit: Story = {
  args: {
    ...Default.args,
    label: "CUIT",
    type: "cuit",
    initialValue: "203434343402"
  },
};

export const Dni: Story = {
  args: {
    ...Default.args,
    label: "DNI",
    type: "dni",
    initialValue: "12345678"
  },
};

export const isRequired: Story = {
  args: {
    ...Default.args,
    isRequired: true,
  },
};

export const isReadOnly: Story = {
  args: {
    ...Default.args,
    initialValue: "Alex",
    isReadOnly: true,
  },
};

export const isDisabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const isValid: Story = {
  args: {
    ...Default.args,
    label: "Cantidad",
    initialValue: "0",
    type: "number",
    isInvalid: false,
    touched: true,
  },
};

export const isInvalid: Story = {
  args: {
    ...Default.args,
    label: "Cantidad",
    initialValue: "0",
    type: "number",
    isInvalid: true,
    touched: true,
  },
};

export const isInvalidWithCustomErrorMessage: Story = {
  args: {
    ...Default.args,
    label: "Cantidad",
    initialValue: "0",
    type: "number",
    isInvalid: true,
    touched: true,
    errorMessage: "No puede ser 0",
  },
};

export const withMaxLength: Story = {
  args: {
    ...Default.args,
    maxLength: 4,
  },
};

export const startContent: Story = {
  args: {
    ...Default.args,
    label: "Número de orden",
    type: "number",
    startContent: "#",
  },
};

export const endContent: Story = {
  args: {
    ...Default.args,
    label: "Email",
    endContent: "✉️",
  },
};
