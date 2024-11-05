import type { Meta, StoryObj } from "@storybook/react";
import RadioGroup from "../RadioGroup/RadioGroup";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: fn(),
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
  },
};

export const label: Story = {
  args: {
    ...Default.args,
    label: "Select an option",
  },
};

export const disabled: Story = {
  args: {
    ...Default.args,
    label: "Select an option",
    disabled: true,
  },
};

export const initialChecked: Story = {
  args: {
    ...Default.args,
    label: "Select an option",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2", initialChecked: true },
      { label: "Option 3", value: "option3" },
    ],
  },
};

export const withError: Story = {
  args: {
    ...Default.args,
    label: "Select an option",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2", initialChecked: true },
      { label: "Option 3", value: "option3" },
    ],
    error: "This is an error message",
  },
};

export const DefaultWithBymaTheme: Story = {
  args: {
    onChange: fn(),
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    theme: "byma",
  },
};

export const labelWithBymaTheme: Story = {
  args: {
    ...Default.args,
    label: "Select an option",
    theme: "byma",
  },
};

export const disabledWithBymaTheme: Story = {
  args: {
    ...Default.args,
    label: "Select an option",
    disabled: true,
    theme: "byma",
  },
};

export const initialCheckedWithBymaTheme: Story = {
  args: {
    ...Default.args,
    label: "Select an option",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2", initialChecked: true },
      { label: "Option 3", value: "option3" },
    ],
    theme: "byma",
  },
};

export const withErrorWithBymaTheme: Story = {
  args: {
    ...Default.args,
    label: "Select an option",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2", initialChecked: true },
      { label: "Option 3", value: "option3" },
    ],
    error: "This is an error message",
    theme: "byma",
  },
};
