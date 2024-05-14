import type { Meta, StoryObj } from "@storybook/react";
import InputSelect from "../InputSelect/InputSelect";
import {
  getCurrentYear,
  getCurrentMonth,
  getCurrentDay,
} from "../DatePicker/helpers";

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
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="inputContainer">
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
    confirmSelection: true,
    isFormField: false,
    touched: false,
    type: "single",
    items: [
      { label: "Opción 1", value: "1" },
      { label: "Opción 2", value: "2" },
    ],
    onChange: () => console.log("click"),
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

export const WithCheckboxMultipleSelection: Story = {
  args: {
    ...Default.args,
    type: "multiple-checkbox",
  },
};

export const WithDescription: Story = {
  args: {
    ...Default.args,
    description: "Descripción"
  },
};

export const WithDatePicker: Story = {
  args: {
    ...Default.args,
    label: "Seleccioná un período",
    type: "single-radio-date-picker",
    items: periodSelectOptions,
    confirmSelection: false,
    onDatepickerDateChanged: (keys) => null,
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
