import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import InputSelect from "../InputSelect/InputSelect";
import {
  getCurrentYear,
  getCurrentMonth,
  getCurrentDay,
} from "../DatePicker/helpers";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/InputSelect",
  component: InputSelect,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    type: {
      options: [
        "single",
        "multiple",
        "single-radio",
        "multiple-checkbox",
        "multiple-sections-checkbox",
        "single-radio-date-picker",
        "single-radio-date-picker-day",
      ],
      control: {
        type: "select",
      },
    },
    confirmSelection: {
      control: "boolean",
    },
  },
  args: {
    onChange: fn(),
    onDatepickerDateChanged: fn(),
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="inputContainer top">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const periodSelectOptions = [
  { label: "Hoy", value: "0" },
  { label: "Últimos 7 días", value: "7" },
  { label: "Últimos 15 días", value: "15" },
  { label: "Últimos 30 días", value: "30" },
];

export const Default: Story = {
  args: {
    label: "Selecciona una opción",
    placeholder: "Selecciona una opción",
    isFormField: false,
    touched: false,
    type: "single",
    items: [
      { label: "Opción 1", value: "1" },
      { label: "Opción 2", value: "2" },
      { label: "Opción 3", value: "3" },
      { label: "Opción 4", value: "4" },
      { label: "Opción 5", value: "5" },
      { label: "Opción 6", value: "6" },
    ],
  },
};

export const WithRadioSingleSelection: Story = {
  args: {
    ...Default.args,
    type: "single-radio",
  },
};

export const WithMultipleSelection: Story = {
  args: {
    ...Default.args,
    type: "multiple",
  },
};

export const WithMultipleSelectionExternalBox: Story = {
  args: {
    ...Default.args,
    type: "multiple",
    showExternalBox: true,
  },
};

export const WithCheckboxMultipleSelection: Story = {
  args: {
    ...Default.args,
    type: "multiple-checkbox",
  },
};

export const WithDescription: Story = {
  args: {
    ...Default.args,
    description: "Descripción",
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
    isInvalid: false,
    touched: true,
    defaultSelectedKeys: ["1"],
  },
};

export const isInvalid: Story = {
  args: {
    ...Default.args,
    isInvalid: true,
    touched: true,
    defaultSelectedKeys: ["1"],
    errorMessage: "La opción seleccionada no es válida.",
  },
};

export const isDisabled: Story = {
  args: {
    ...Default.args,
    touched: true,
    isDisabled: true,
  },
};

export const withDefaultSelected: Story = {
  args: {
    ...Default.args,
    defaultSelectedKeys: ["1"],
  },
};

export const withDisabledOptions: Story = {
  args: {
    ...Default.args,
    disabledKeys: ["1"],
  },
};

export const WithDatePicker: Story = {
  args: {
    ...Default.args,
    label: "Seleccioná un período",
    type: "single-radio-date-picker",
    items: periodSelectOptions,
  },
};

export const WithDatePickerAndInitialRange: Story = {
  args: {
    ...WithDatePicker.args,
    initialDatePickerRange: [
      new Date(getCurrentYear(), getCurrentMonth(), getCurrentDay() - 5),
      new Date(getCurrentYear(), getCurrentMonth(), getCurrentDay()),
    ],
  },
};

export const WithDatePickerDaySelection: Story = {
  args: {
    ...Default.args,
    type: "single-radio-date-picker-day",
  },
};

export const withConfirmSelection: Story = {
  args: {
    ...Default.args,
    confirmSelection: true,
  },
};

export const withConfirmSelectionAndRadioSingleSelection: Story = {
  args: {
    ...Default.args,
    type: "single-radio",
    confirmSelection: true,
  },
};

export const withConfirmSelectionAndMultipleSelection: Story = {
  args: {
    ...Default.args,
    type: "multiple",
    confirmSelection: true,
  },
};

export const withConfirmSelectionAndCheckboxMultipleSelection: Story = {
  args: {
    ...Default.args,
    type: "multiple-checkbox",
    confirmSelection: true,
  },
};

export const withConfirmSelectionAndDefaultSelected: Story = {
  args: {
    ...Default.args,
    defaultSelectedKeys: ["1"],
    confirmSelection: true,
  },
};

export const WithBymaThemeDefault: Story = {
  args: {
    theme: "byma",
    label: "Selecciona una opción",
    placeholder: "Selecciona una opción",
    isFormField: false,
    touched: false,
    type: "single",
    items: [
      { label: "Opción 1", value: "1" },
      { label: "Opción 2", value: "2" },
      { label: "Opción 3", value: "3" },
      { label: "Opción 4", value: "4" },
      { label: "Opción 5", value: "5" },
      { label: "Opción 6", value: "6" },
    ],
  },
};

export const WithBymaThemeRadioSingleSelection: Story = {
  args: {
    ...Default.args,
    type: "single-radio",
    theme: "byma",
  },
};

export const WithBymaThemeMultipleSelection: Story = {
  args: {
    ...Default.args,
    type: "multiple",
    theme: "byma",
  },
};

export const WithBymaThemeMultipleSelectionExternalBox: Story = {
  args: {
    ...Default.args,
    type: "multiple",
    showExternalBox: true,
    theme: "byma",
  },
};

export const WithBymaThemeCheckboxMultipleSelection: Story = {
  args: {
    ...Default.args,
    type: "multiple-checkbox",
    theme: "byma",
  },
};

export const isDisabledWithBymaTheme: Story = {
  args: {
    ...Default.args,
    touched: true,
    isDisabled: true,
    theme: "byma",
  },
};
