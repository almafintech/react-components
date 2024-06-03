import type { Meta, StoryObj } from "@storybook/react";
import TokenCard from "../TokenCard/TokenCard";

const meta = {
  title: "Components/TokenCard",
  component: TokenCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof TokenCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Validá tu dirección de mail",
    subtitle: "El código es válido durante 24 horas",
    children: `Ingresá el token que enviamos a pepito@gmail.com`,
    autoSendToken: true,
    lastSendToken: 120,
    onAuthorize: () =>
      new Promise((resolve) => {
        resolve({ success: true });
      }),
    onResend: () => console.log("resend"),
    onSuccess: () =>
      new Promise((resolve) => {
        resolve({ success: true });
      }),
  },
};

export const withoutAutosend: Story = {
  args: {
    title: "Validá tu dirección de mail",
    subtitle: "El código es válido durante 24 horas",
    children: `Ingresá el token que enviamos a pepito@gmail.com`,
    autoSendToken: false,
    lastSendToken: 120,
    onAuthorize: () =>
      new Promise((resolve) => {
        resolve({ success: true });
      }),
    onResend: () => console.log("resend"),
    onSuccess: () =>
      new Promise((resolve) => {
        resolve({ success: true });
      }),
  },
};

export const authorizeError: Story = {
  args: {
    title: "Validá tu dirección de mail",
    subtitle: "El código es válido durante 24 horas",
    children: `Ingresá el token que enviamos a pepito@gmail.com`,
    autoSendToken: true,
    lastSendToken: 120,
    onAuthorize: () =>
      new Promise((resolve) => {
        resolve({ success: false, error: true });
      }),
    onResend: () => console.log("resend"),
    onSuccess: () =>
      new Promise((resolve) => {
        resolve({ success: true });
      }),
  },
};

export const customErrorMessage: Story = {
  args: {
    title: "Validá tu dirección de mail",
    subtitle: "El código es válido durante 24 horas",
    children: `Ingresá el token que enviamos a pepito@gmail.com`,
    autoSendToken: true,
    lastSendToken: 120,
    onAuthorize: () =>
      new Promise((resolve) => {
        resolve({ success: false, message: "custom error" });
      }),
    onResend: () => console.log("resend"),
    onSuccess: () =>
      new Promise((resolve) => {
        resolve({ success: true });
      }),
  },
};
