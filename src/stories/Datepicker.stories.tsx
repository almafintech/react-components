import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "../DatePicker/DatePicker";
import {
  getCurrentYear,
  getCurrentMonth,
  getCurrentDay,
} from "../DatePicker/helpers";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-auto m-auto max-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SelectMonth: Story = {
  args: {
    ...Default.args,
    defaultCalendarVariant: "MONTH",
  },
};

export const SelectDate: Story = {
  args: {
    ...Default.args,
    defaultCalendarVariant: "DATE",
  },
};

export const SelectDays: Story = {
  args: {
    ...Default.args,
    defaultCalendarVariant: "DAY",
  },
};

export const MinDateValue: Story = {
  args: {
    ...Default.args,
    min: new Date(getCurrentYear(), getCurrentMonth(), getCurrentDay() - 5),
  },
};

export const MaxDateValue: Story = {
  args: {
    ...Default.args,
    max: new Date(getCurrentYear(), getCurrentMonth(), getCurrentDay() + 5),
  },
};

export const WithDefaultValue: Story = {
  args: {
    ...Default.args,
    defaultRange: [
      new Date(getCurrentYear(), getCurrentMonth(), getCurrentDay() - 5),
      new Date(getCurrentYear(), getCurrentMonth(), getCurrentDay() - 5),
    ],
    restoreDefaultOnDelete: true,
  },
};

export const WithCustomStyles: Story = {
  args: {
    ...Default.args,
    calendarClassName: "bg-blue-50 rounded-2xl p-2"
  },
};