import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "../DatePicker/DatePicker";
import {
  getCurrentYear,
  getCurrentMonth,
  getCurrentDay,
  getLongMonthNames,
  isRangeFinal,
} from "../DatePicker/helpers";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Month: Story = {
  args: {
    ...Default.args,
    defaultCalendarVariant: "MONTH",
  },
};

// export const Date: Story = {
//   args: {
//     ...Default.args,
//     defaultCalendarVariant: "DATE",
//   },
// };

export const Day: Story = {
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

