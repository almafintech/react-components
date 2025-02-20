import React from "react";
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
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputFile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Archivo",
    text: "Arrastrá o seleccioná un archivo de tu dispositivo",
  },
};

export const isOptional: Story = {
  args: {
    ...Default.args,
    label: "Frente",
    isOptional: true,
  },
};

export const WithInfoMessage: Story = {
  args: {
    ...Default.args,
    infoText: "Adjuntá la información necesaria",
    label: "Frente",
  },
};

export const WithInfoMessageCustomPosition: Story = {
  args: {
    ...Default.args,
    infoText: "Adjuntá la información necesaria",
    label: "Frente",
    infoTextPosition: "top",
  },
};

export const WithInfoMessageClassName: Story = {
  args: {
    ...Default.args,
    infoText: "Adjuntá la información necesaria",
    label: "Frente",
    infoTextClassName: "!text-blue-500",
  },
};

export const WithValidTypesFiles: Story = {
  args: {
    ...Default.args,
    validTypes: ["image/jpg", "image/png"],
    infoText: "Formato .jpg .png",
    label: "Frente",
  },
};

export const WithFileData: Story = {
  args: {
    ...Default.args,
    label: "Frente",
    fileData: {
      id: 1,
      name: "293714292-62793937-3c58-4d32-a2e1-a461c616c155293714292-62793937-3c58-4d32-a2e1-a461c616c155293714292-62793937-3c58-4d32-a2e1-a461c616c155293714292-62793937-3c58-4d32-a2e1-a461c616c155 (2) (1) (1).png",
    },
    hideDownloadIcon: true,
  },
};

export const WithMaxSize: Story = {
  args: {
    ...Default.args,
    maxSize: 1,
    infoText: "Peso máximo 1MB",
    label: "Frente",
  },
};

export const withoutDownloadIcon: Story = {
  args: {
    ...Default.args,
    hideDownloadIcon: true,
  },
};

export const WithTooltip = {
  args: {
    ...Default.args,
    label: "Frente",
    tooltip: "Tooltip",
  },
};

export const WithAnchor = {
  args: {
    ...Default.args,
    label: "Frente",
    anchor: (
      <a href="https://www.google.com" target="_blank">
        <b>Click aquí</b>
      </a>
    ),
  },
};

export const isMobile: Story = {
  args: {
    ...Default.args,
    label: "Frente",
    isMobile: true,
  },
};

export const isMobileWithCustomSuccessMessage: Story = {
  args: {
    ...Default.args,
    label: "Frente",
    successMessage: "Imagen subida con éxito",
    isMobile: true,
  },
};

export const multiple: Story = {
  args: {
    ...Default.args,
    multiple: true,
    text: "Arrastrá o seleccioná archivos de tu dispositivo",
    maxSize: 1,
    sizeErrorMessage: "El archivo excede el peso máximo de",
  },
};

export const multipleWithFileData: Story = {
  args: {
    ...Default.args,
    multiple: true,
    text: "Arrastrá o seleccioná archivos de tu dispositivo",
    maxSize: 1,
    sizeErrorMessage: "El archivo excede el peso máximo de",
    fileData: [
      {
        id: 1,
        name: "293714292-62793937-3c58-4d32-a2e1-a461c616c155293714292-62793937-3c58-4d32-a2e1-a461c616c155293714292-62793937-3c58-4d32-a2e1-a461c616c155293714292-62793937-3c58-4d32-a2e1-a461c616c155 (2) (1) (1).png",
      },
      {
        id: 2,
        name: "hola.jpeg",
      },
    ],
    hideDownloadIcon: true,
  },
};
