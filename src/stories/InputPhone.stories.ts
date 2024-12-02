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

    touched: false,
    description: "",
  },
};

export const WithDescription: Story = {
  args: {
    ...Default.args,
    description: "Número de teléfono con código de área sin 0 ni 15",
  },
};

export const WithInfoMessage: Story = {
  args: {
    ...Default.args,
    infoMessage: "Con código de área sin 0 ni 15.",
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
    isValid: true,
    touched: true,
  },
};

export const isInvalid: Story = {
  args: {
    ...Default.args,
    isValid: false,
    touched: true,
  },
};

export const isInvalidWithCustomErrorMessage: Story = {
  args: {
    ...isInvalid.args,
    errorMessage: "Número de teléfono con código de área sin 0 ni 15",
  },
};

export const WithAutoFormat: Story = {
  args: {
    ...Default.args,
    autoFormat: true,
  },
};

export const WithoutCountryCodeEditable: Story = {
  args: {
    ...Default.args,
    countryCodeEditable: false,
  },
};

export const WithCustomLabel: Story = {
  args: {
    ...Default.args,
    label: "Teléfono celular",
  },
};

export const withCustomCountry: Story = {
  args: {
    ...Default.args,
    country: "us",
  },
};

export const withCustomStyles: Story = {
  args: {
    ...Default.args,
    inputClass: "border-none",
    dropdownClass: "border-none",
    buttonClass: "border-none",
  },
};

export const DefaultWithBymaTheme: Story = {
  args: {
    name: "phone",
    placeholder: "1159682222",

    touched: false,
    description: "",
    theme: "byma",
  },
};

export const WithDescriptionWithBymaTheme: Story = {
  args: {
    ...Default.args,
    description: "Número de teléfono con código de área sin 0 ni 15",
    theme: "byma",
  },
};

export const WithInfoMessageWithBymaTheme: Story = {
  args: {
    ...Default.args,
    infoMessage: "Con código de área sin 0 ni 15.",
    theme: "byma",
  },
};

export const isValidWithBymaTheme: Story = {
  args: {
    ...Default.args,
    isValid: true,
    touched: true,
    theme: "byma",
  },
};

export const isInvalidWithCustomErrorMessageWithBymaTheme: Story = {
  args: {
    ...isInvalid.args,
    errorMessage: "Número de teléfono con código de área sin 0 ni 15",
    theme: "byma",
  },
};
