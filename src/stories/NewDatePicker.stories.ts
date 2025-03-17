import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import NewDatePicker from "../NewDatePicker/NewDatePicker";

const meta = {
  title: "Components/NewDatePicker",
  component: NewDatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    onKeyDown: fn(),
  },
} satisfies Meta<typeof NewDatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Fecha",
  },
};

export const isDisabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const withMonthAndYear: Story = {
  args: {
    ...Default.args,
    showMonthAndYearPickers: true,
  },
};

export const withDefaultValue: Story = {
  args: {
    ...Default.args,
    defaultValue: new Date("10-02-1991"),
  },
};

export const isValid: Story = {
  args: {
    ...Default.args,
    isInvalid: false,
    touched: true,
  },
};

export const isInvalid: Story = {
  args: {
    ...Default.args,
    isInvalid: true,
    touched: true,
    errorMessage: "Seleccionar una fecha para continuar",
  },
};

export const formFieldLabel: Story = {
  args: {
    ...Default.args,
    isFormField: true,
  },
};

export const noLabel: Story = {
  args: {
    hasLabel: false,
  },
};

export const withDescription: Story = {
  args: {
    ...Default.args,
    description: "Descripción",
  },
};

export const WithInfoMessage: Story = {
  args: {
    ...Default.args,
    infoMessage: "Mensaje informativo",
  },
};

export const WithInfoLabelMessage: Story = {
  args: {
    ...Default.args,
    customInfo: "Opcional",
  },
};
