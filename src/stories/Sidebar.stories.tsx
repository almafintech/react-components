import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "../Sidebar/Sidebar";

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-5 5.5C3 11 5 9.5 8 9.5s5 1.5 5 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const PlaceholderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const FooterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 18 14 8m0 0H6m8 0v8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const userMenu = [
  {
    key: "profile",
    label: "Mi perfil",
    onClick: () => console.log("profile"),
  },
  {
    key: "logout",
    label: "Cerrar sesión",
    onClick: () => console.log("logout"),
  },
];

const accountMenu = [
  { key: "a1", label: "Almarena SA", onClick: () => console.log("a1") },
  { key: "a2", label: "Otra cuenta SRL", onClick: () => console.log("a2") },
];

const baseItems = [
  { key: "inicio", label: "Inicio", icon: <PlaceholderIcon /> },
  { key: "movimientos", label: "Movimientos", icon: <PlaceholderIcon /> },
  {
    key: "label",
    label: "Label",
    icon: <PlaceholderIcon />,
    children: Array.from({ length: 3 }).map((_, i) => ({
      key: `label-${i}`,
      label: "Label",
    })),
  },
  { key: "inversiones", label: "Inversiones", icon: <PlaceholderIcon /> },
  { key: "dolarmep", label: "Dólar MEP", icon: <PlaceholderIcon /> },
  { key: "echeq", label: "Solicitar Echeq", icon: <PlaceholderIcon /> },
  { key: "tarjetas", label: "Tarjetas", icon: <PlaceholderIcon /> },
  {
    key: "impuestos",
    label: "Impuestos y servicios",
    icon: <PlaceholderIcon />,
  },
  {
    key: "label-2",
    label: "Label",
    icon: <PlaceholderIcon />,
    children: [
      { key: "label-2-a", label: "Sub-item A" },
      { key: "label-2-b", label: "Sub-item B" },
    ],
  },
];

const footer = {
  title: "Accedé al mercado",
  subtitle: "Ir a Allaria",
  icon: <FooterIcon />,
  onClick: () => console.log("footer clicked"),
};

const meta = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    device: "desktop",
    items: baseItems.map((item) =>
      item.key === "inicio" ? { ...item, isActive: true } : item,
    ),
    footer,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const DesktopCollapsed: Story = {
  args: {
    defaultCollapsed: true,
  },
};

export const DesktopWithoutFooter: Story = {
  args: {
    footer: undefined,
  },
};

export const DesktopCustomTitle: Story = {
  args: {
    title: "Navegación",
  },
};

export const Mobile: Story = {
  args: {
    device: "mobile",
    user: {
      name: "Nombre Apellido (PF)",
      email: "ej.rodri_ana.ux@gmail.com",
      icon: <UserIcon />,
      menu: userMenu,
    },
    account: {
      label: "Cuenta (ej Almarena SA)",
      menu: accountMenu,
    },
  },
};

export const MobileWithBanners: Story = {
  args: {
    device: "mobile",
    user: {
      name: "Nombre Apellido (PF)",
      email: "ej.rodri_ana.ux@gmail.com",
      icon: <UserIcon />,
      menu: userMenu,
    },
    account: {
      label: "Cuenta (ej Almarena SA)",
      menu: accountMenu,
    },
    banners: [
      { key: "b1", label: "Banner", onClick: () => console.log("b1") },
      { key: "b2", label: "Banner", onClick: () => console.log("b2") },
    ],
  },
};

export const MobileWithoutAccount: Story = {
  args: {
    device: "mobile",
    user: {
      name: "Nombre Apellido (PF)",
      email: "ej.rodri_ana.ux@gmail.com",
      icon: <UserIcon />,
      menu: userMenu,
    },
  },
};

export const MobileStaticUser: Story = {
  args: {
    device: "mobile",
    user: {
      name: "Nombre Apellido (PF)",
      email: "ej.rodri_ana.ux@gmail.com",
      icon: <UserIcon />,
    },
  },
};
