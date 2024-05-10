import type { Meta, StoryObj } from "@storybook/react";
import InputSelect from "../InputSelect/InputSelect";

const meta = {
  title: "Components/InputSelect",
  component: InputSelect,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    label: "Selecciona una opción",
    placeholder: "Selecciona",
    type: "single",
    items: [],
    onChange: () => console.log("hola")
  },
};
