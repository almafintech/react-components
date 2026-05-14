import type { Meta, StoryObj } from "@storybook/react";
import { Feedback } from "../Feedback";

const meta = {
  title: "Feedback & Status/Feedback",
  component: Feedback,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "reset",
    }
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Feedback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    type: "Info",
    title: "Título",
    description: "Descripción de máximo 3 líneas, en lo posible.",
    hasDescription: true,
    primaryAction: "Acción principal",
  },
};

export const Success: Story = {
  args: {
    type: "Success",
    title: "Operación exitosa",
    description: "Tu operación se realizó correctamente.",
    hasDescription: true,
    primaryAction: "Acción principal",
  },
};

export const Warning: Story = {
  args: {
    type: "Warning",
    title: "Advertencia",
    description: "Revisá la información antes de continuar.",
    hasDescription: true,
    primaryAction: "Acción principal",
  },
};

export const Pending: Story = {
  args: {
    type: "Pending",
    title: "En proceso",
    description: "Tu solicitud está siendo procesada.",
    hasDescription: true,
    primaryAction: "Acción principal",
  },
};

export const Error: Story = {
  args: {
    type: "Error",
    title: "Algo salió mal",
    description: "No pudimos completar la operación. Intentá nuevamente.",
    hasDescription: true,
    primaryAction: "Acción principal",
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    type: "Info",
    title: "Título",
    description: "Descripción de máximo 3 líneas, en lo posible.",
    hasDescription: true,
    primaryAction: "Acción principal",
  },
};

export const WithSecondaryAction: Story = {
  args: {
    type: "Info",
    title: "Título",
    description: "Descripción de máximo 3 líneas, en lo posible.",
    hasDescription: true,
    primaryAction: "Acción principal",
    secondaryAction: "Acción secundaria",
  },
};

export const WithoutDescription: Story = {
  args: {
    type: "Success",
    title: "Operación exitosa",
    hasDescription: false,
    primaryAction: "Acción principal",
  },
};

export const WithNestedContent: Story = {
  args: {
    type: "Info",
    title: "Título",
    description: "Descripción de máximo 3 líneas, en lo posible.",
    hasDescription: true,
    hasNestedContent: true,
    children: (
      <div
        style={{
          background: "#f0f0f0",
          borderRadius: "0.5rem",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.875rem",
          color: "#8c8c8c",
        }}
      >
        Contenido anidado
      </div>
    ),
    primaryAction: "Acción principal",
  },
};
