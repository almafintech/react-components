import type { Meta, StoryObj } from "@storybook/react";
import Table from "../Table/Table";
import {ColumnAlignment} from "../Table/types";

const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
      sorteable: false,
    },
    {
      key: "status",
      label: "STATUS",
      sorteable: false,
    },
]

const centeredColumns = [
  {
    key: "name",
    label: "NAME",
    align: "center" as ColumnAlignment
  },
  {
    key: "role",
    label: "ROLE",
    sorteable: false,
    align: "center" as ColumnAlignment
  },
  {
    key: "status",
    label: "STATUS",
    sorteable: false,
    align: "center" as ColumnAlignment
  },
]

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  }
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
            <p className="greenText">Active</p>
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
            <p className="greenText">Active</p>
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
            <p className="redText">Inactive</p>
          </div>
        ),
      },
    ],
    columns: columns,
    selectionMode: "single"
  },
};

export const WithSelectedRow: Story = {
  args: {
    ...Default.args,
    selectedRowKey:  "1"
  },
};

export const WithMultipleSelection: Story = {
  args: {
    ...Default.args,
    selectionMode: "multiple"
  },
};

export const WithNoSelection: Story = {
  args: {
    ...Default.args,
    selectionMode: "none"
  },
};

export const WithCenterAlign: Story = {
  args: {
    ...Default.args,
    columns: centeredColumns
  },
};