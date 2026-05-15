import type { Meta, StoryObj } from "@storybook/react";
import Header from "../Header/Header";
import { Button } from "../Button";

const AllariaLogo = () => (
  <span
    style={{
      fontFamily: "inherit",
      fontWeight: 600,
      color: "#001c40",
      fontSize: "1rem",
    }}
  >
    Allaria<sup>+</sup>
  </span>
);

const meta = {
  title: "Navigation/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    logo: <AllariaLogo />,
    name: "Nombre",
    lastName: "Apellido",
    dropdown: {
      selectionMode: "single",
      items: [
        {
          key: "settings",
          label: "Configuración",
          action: () => console.log("settings"),
        },
        {
          key: "logout",
          label: "Cerrar sesión",
          action: () => console.log("logout"),
        },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTag: Story = {
  args: {
    /* To be replaced with the tag component */
    children: <Button text="Sin unificar" isDisabled />,
  },
};

export const WithoutDropdown: Story = {
  args: {
    dropdown: undefined,
  },
};

export const WithoutLogo: Story = {
  args: {
    logo: undefined,
  },
};

export const WithCustomStyles: Story = {
  args: {
    className: "customHeader",
  },
};
