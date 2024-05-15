import type { Meta, StoryObj } from "@storybook/react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    children: "Contenido",
    placement: "auto",
    width: "32rem"
  },
};

export const WithNoCloseButton: Story = {
  args: {
    ...Default.args,
    hideCloseButton: true,
  },
};

export const WithHeader: Story = {
  args: {
    ...Default.args,
    header: (<h1>Detalle</h1>)
  },
};

export const WithFooter: Story = {
  args: {
    ...Default.args,
    footer: (<Button text="Cerrar"/>)
  },
};

export const WithFooterCenter: Story = {
  args: {
    ...Default.args,
    footer: (<Button text="Cerrar"/>),
    centerFooter: true
  },
};
