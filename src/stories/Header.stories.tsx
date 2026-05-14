import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Header from "../Header/Header";

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

const GearIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path
      d="M13 8c0-.32-.03-.63-.08-.94l1.42-1.1-1.4-2.42-1.66.66c-.5-.4-1.06-.7-1.67-.9L9.34 1.5h-2.7l-.27 1.8c-.6.2-1.17.5-1.67.9l-1.66-.66-1.4 2.42 1.42 1.1c-.05.31-.08.62-.08.94s.03.63.08.94l-1.42 1.1 1.4 2.42 1.66-.66c.5.4 1.06.7 1.67.9l.27 1.8h2.66l.27-1.8c.6-.2 1.17-.5 1.67-.9l1.66.66 1.4-2.42-1.42-1.1c.05-.31.08-.62.08-.94Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.5 2.5h-6v11h6"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 5.5 13.5 8 11 10.5M6.5 8h7"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta = {
  title: "Navigation/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    logo: <AllariaLogo />,
    userName: "Nombre Apellido",
    userInitials: "NA",
    dropdownItems: [
      {
        key: "settings",
        label: "Configuración",
        icon: <GearIcon />,
        onClick: fn(),
      },
      {
        key: "logout",
        label: "Cerrar sesión",
        icon: <LogoutIcon />,
        onClick: fn(),
      },
    ],
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTag: Story = {
  args: {
    hasTag: true,
    tagLabel: "Sin unificar",
  },
};

export const WithoutDropdown: Story = {
  args: {
    showDropdown: false,
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
