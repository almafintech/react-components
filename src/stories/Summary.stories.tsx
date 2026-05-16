/// <reference path="../declaration.d.ts" />
import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as InfoIcon } from "../../assets/images/ui/alert-icons/ui-alert-icon-info.svg";
import { Summary } from "../Summary";

const DEFAULT_ITEMS = [
  { label: "Especie", value: "GGAL" },
  { label: "Cantidad", value: "100" },
  { label: "Precio límite", value: "$54.670,00" },
];

const meta = {
  title: "Data Display/Summary",
  component: Summary,
  parameters: {
    layout: "centered",
  },
  args: {
    items: DEFAULT_ITEMS,
    total: { label: "Total estimado", value: "$54.670,00" },
  },
  render: (args) => (
    <div
      style={{
        width: 800,
        minHeight: 300,
        backgroundColor: "ghostwhite",
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 150px",
      }}
    >
      <Summary {...args} />
    </div>
  ),
  tags: ["autodocs"],
} satisfies Meta<typeof Summary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabelEndContent: Story = {
  args: {
    items: [
      { label: "Especie", value: "GGAL", labelEndContent: <InfoIcon /> },
      { label: "Cantidad", value: "100" },
      { label: "Precio límite", value: "$54.670,00" },
    ],
    total: { label: "Total estimado", value: "$54.670,00" },
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: "Total estimado", value: "$54.670,00" }],
    total: undefined,
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { label: "Especie", value: "GGAL" },
      { label: "Cantidad", value: "100" },
    ],
    total: { label: "Total estimado", value: "$54.670,00" },
  },
};

export const FourItems: Story = {
  args: {
    items: [
      { label: "Especie", value: "GGAL" },
      { label: "Cantidad", value: "100" },
      { label: "Precio límite", value: "$54.670,00" },
      { label: "Plazo", value: "48 hs" },
    ],
    total: { label: "Total estimado", value: "$54.670,00" },
  },
};

export const SixItems: Story = {
  args: {
    items: [
      { label: "Especie", value: "GGAL" },
      { label: "Cantidad", value: "100" },
      { label: "Precio límite", value: "$54.670,00" },
      { label: "Plazo", value: "48 hs" },
      { label: "Comisión", value: "$500,00" },
      { label: "Derechos de mercado", value: "$200,00" },
    ],
    total: { label: "Total estimado", value: "$55.370,00" },
  },
};

export const NoTotal: Story = {
  args: {
    items: DEFAULT_ITEMS,
    total: undefined,
  },
};

export const WithSubItems: Story = {
  args: {
    items: [
      {
        label: "Comisiones",
        value: "$700,00",
        subItems: [
          { label: "Comisión", value: "$500,00" },
          { label: "Derechos de mercado", value: "$200,00" },
        ],
      },
      { label: "Especie", value: "GGAL" },
      { label: "Cantidad", value: "100" },
    ],
    total: { label: "Total estimado", value: "$55.370,00" },
  },
};

export const NestedSubItems: Story = {
  args: {
    items: [
      {
        label: "Comisiones",
        value: "$700,00",
        subItems: [
          { label: "Comisión", value: "$500,00" },
          { label: "Derechos de mercado", value: "$200,00" },
        ],
      },
      {
        label: "Impuestos",
        value: "$220,00",
        subItems: [
          { label: "IVA", value: "$120,00" },
          { label: "IIBB", value: "$100,00" },
        ],
      },
      { label: "Precio límite", value: "$54.670,00" },
    ],
    total: { label: "Total estimado", value: "$55.590,00" },
  },
};
