import type { Meta, StoryObj } from "@storybook/react";
import { Feedback } from "../Feedback";

const meta = {
  title: "Feedback & Status/Feedback",
  component: Feedback,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "reset",
    },
  },
  tags: ["autodocs"],
  args: {
    isOpen: true,
  },
} satisfies Meta<typeof Feedback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Título",
    description: "Descripción de máximo 3 líneas, en lo posible.",
    primary: { text: "Acción principal" },
  },
};

export const Success: Story = {
  args: {
    type: "SUCCESS",
    title: "Operación exitosa",
    description: "Tu operación se realizó correctamente.",
    primary: { text: "Acción principal" },
  },
};

export const Warning: Story = {
  args: {
    type: "WARNING",
    title: "Advertencia",
    description: "Revisá la información antes de continuar.",
    primary: { text: "Acción principal" },
  },
};

export const Pending: Story = {
  args: {
    type: "PENDING",
    title: "En proceso",
    description: "Tu solicitud está siendo procesada.",
    primary: { text: "Acción principal" },
  },
};

export const Error: Story = {
  args: {
    type: "ERROR",
    title: "Algo salió mal",
    description: "No pudimos completar la operación. Intentá nuevamente.",
    primary: { text: "Acción principal" },
  },
};

export const NoButtonsContainer: Story = {
  args: {
    type: "INFO",
    title: "Título",
    description: "Descripción de máximo 3 líneas, en lo posible.",
    primary: { text: "Acción principal" },
    secondary: { text: "Acción secundaria" },
    showButtonsContainer: false,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    type: "INFO",
    title: "Título",
    description: "Descripción de máximo 3 líneas, en lo posible.",
    primary: { text: "Acción principal" },
  },
};

export const WithSecondaryAction: Story = {
  args: {
    type: "INFO",
    title: "Título",
    description: "Descripción de máximo 3 líneas, en lo posible.",
    primary: { text: "Acción principal" },
    secondary: { text: "Acción secundaria" },
  },
};

export const WithChildren: Story = {
  args: {
    type: "INFO",
    title: "Título",
    description: "Descripción de máximo 3 líneas, en lo posible.",
    primary: { text: "Acción principal" },
    children: <p style={{ margin: 0, fontSize: 14, color: "#666" }}>Contenido adicional debajo de la descripción.</p>,
  },
};

export const WithoutDescription: Story = {
  args: {
    type: "SUCCESS",
    title: "Operación exitosa",
    primary: { text: "Acción principal" },
  },
};
