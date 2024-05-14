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
    name: "Archivo",
    text: "Seleccionar archivo",
    onFileRemove: () => console.log("removido"),
    onFileUpload: () => console.log("subido"),
  },
};

export const WithValidTypesFiles: Story = {
  args: {
    ...Default.args,
    validTypes: ["image/jpg", "image/png"],
  },
};

export const WithMaxSize: Story = {
  args: {
    ...Default.args,
    maxSize: 10,
  },
};