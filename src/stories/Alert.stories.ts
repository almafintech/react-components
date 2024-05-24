import type { Meta, StoryObj } from "@storybook/react";
import Alert from "../Alert/Alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    children: "Este es un mensaje de información",
    variant: "INFO",
    hasSummary: false,
  },
};

export const Warn: Story = {
  args: {
    children: "Este es un mensaje de advertencia",
    variant: "WARN",
    hasSummary: false,
  },
};

export const Error: Story = {
  args: {
    children: "Este es un mensaje de error",
    variant: "ERROR",
    hasSummary: false,
  },
};

export const WithSummary: Story = {
  args: {
    children:
      "Como parte de nuestro compromiso con la transparencia y la seguridad, queremos informarte sobre algunas actualizaciones importantes y cambios en nuestra plataforma. Estamos emocionados de anunciar que hemos lanzado varias nuevas características basadas en tus comentarios. Estas mejoras están diseñadas para mejorar la usabilidad y optimizar tu experiencia. Te animamos a explorar estas adiciones y hacernos saber tus pensamientos.",
    variant: "INFO",
    hasSummary: true,
  },
};

export const WithCustomStyles: Story = {
  args: {
    children: "Este es un mensaje especial",
    variant: "INFO",
    className: "customAlert",
  },
};
