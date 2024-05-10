import type { Meta, StoryObj } from "@storybook/react";
import InputFile from "../InputFile/InputFile";

const meta = {
  title: "Components/InputFile",
  component: InputFile,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputFile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "label",
    text: "Seleccionar archivo",
    infoText: "Máximo 25MB",
  },
};
