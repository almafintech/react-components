import type { Meta, StoryObj } from "@storybook/react";
import InputFile from "../InputFile/InputFile";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/InputFile",
  component: InputFile,
  parameters: {
    layout: "centered",
  },
  args: {
    onFileUpload: fn(),
    onFileDownload: fn(),
    onFileRemove: fn(),
  },
} satisfies Meta<typeof InputFile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Archivo",
    text: "Seleccionar archivo",
  },
};

export const WithInfoMessage: Story = {
  args: {
    ...Default.args,
    infoText: "Adjuntá la información necesaria"
  },
};

export const WithValidTypesFiles: Story = {
  args: {
    ...Default.args,
    error: true,
    validTypes: ["image/jpg", "image/png"],
    infoText: "Formato .jpg .png"
  },
};

export const WithMaxSize: Story = {
  args: {
    ...Default.args,
    maxSize: 3145728,
    infoText: "Peso máximo 3MB"

  },
};