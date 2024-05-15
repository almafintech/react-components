import type { Meta, StoryObj } from "@storybook/react";
import Table from "../Table/Table";

const columns = [
  {
    key: "name",
    label: "Nombre",
  },
  {
    key: "role",
    label: "Rol",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: [
      {
        key: "1",
        name: "Tony Reichert",
        role: "CEO",
        status: (
          <div className="flexContainer">
            <div className="dot green"></div>
            <p className="greenText">Activo</p>
          </div>
        ),
      },
      {
        key: "2",
        name: "Zoey Lang",
        role: "Technical Lead",
        status: (
          <div className="flexContainer">
            <div className="dot green"></div>
            <p className="greenText">Activo</p>
          </div>
        ),
      },
      {
        key: "3",
        name: "Jane Fisher",
        role: "Senior Developer",
        status: (
          <div className="flexContainer">
            <div className="dot red"></div>
            <p className="redText">Inactivo</p>
          </div>
        ),
      },
    ],
    columns: columns,
    selectionMode: "single",
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    rows: [],
    emptyContent: <span className="text-sm">Aún no hay contenido</span>,
  },
};

export const MultipleSelection: Story = {
  args: {
    ...Default.args,
    selectionMode: "multiple",
  },
};

export const MultipleSelectionWithoutCheckbox: Story = {
  args: {
    ...Default.args,
    selectionMode: "multiple",
    showSelectionCheckboxes: false,
  },
};

export const WithHiddenHeader: Story = {
  args: {
    ...Default.args,
    hideHeader: true,
  },
};

export const WithSelectedRow: Story = {
  args: {
    ...Default.args,
    selectedRowKey: "1",
  },
};

export const WithNoSelection: Story = {
  args: {
    ...Default.args,
    selectionMode: "none",
  },
};

export const WithTopContent: Story = {
  args: {
    ...Default.args,
    topContent: <h1>Tabla de empleados</h1>,
    topContentPlacement: "outside",
  },
};

export const WithBottomContent: Story = {
  args: {
    ...Default.args,
    bottomContent: (
      <span className="text-xs">Última actualización: Hace 20 minutos</span>
    ),
    bottomContentPlacement: "outside",
  },
};
