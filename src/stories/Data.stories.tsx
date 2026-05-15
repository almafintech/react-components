import type { Meta, StoryObj } from "@storybook/react";
import { Data } from "../Data";

const meta = {
  title: "Data Display/Data",
  component: Data,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Label",
    value: "$54.670,00",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Data>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InlineDefault: Story = {};

export const InlineEmphasis: Story = {
  args: { emphasis: true },
};

export const InlineWithSubItems: Story = {
  args: {
    label: "Comisiones",
    value: "$700,00",
    subItems: [
      { label: "Comisión", value: "$500,00" },
      { label: "Derechos de mercado", value: "$200,00" },
    ],
  },
};

export const Stacked: Story = {
  args: {
    variant: "stacked",
    label: "Label",
    value: "Primer nivel de información",
    secondaryValue: "Segundo nivel de información",
  },
};

export const StackedFull: Story = {
  args: {
    variant: "stacked",
    label: "Label",
    value: "Primer nivel de información",
    secondaryValue: "Segundo nivel de información",
    action: {
      text: "Acción",
      onClick: () => alert("Acción ejecutada"),
    }
  },
};
