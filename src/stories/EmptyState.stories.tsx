import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "../EmptyState";
// @ts-ignore — space in folder name prevents TS wildcard resolution, SVGR handles this at build time
import { ReactComponent as EmptyState1 } from "../../assets/images/emptyState/emptyState1.svg";

const meta = {
  title: "Feedback & Status/Empty State",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: <EmptyState1 />,
    title: "Título",
    description: "Descripción de máximo 2 líneas",
    primaryAction: { label: "Acción principal" },
  },
};

export const WithSecondaryAction: Story = {
  args: {
    ...Default.args,
    secondaryAction: { label: "Acción secundaria" },
  },
};

export const WithoutDescription: Story = {
  args: {
    ...Default.args,
    description: undefined,
  },
};

export const WithoutActions: Story = {
  args: {
    title: "Título",
    description: "Descripción de máximo 2 líneas",
  },
};

export const SectionType: Story = {
  args: {
    ...Default.args,
    type: "section",
  },
};

export const NoImage: Story = {
  args: {
    ...Default.args,
    image: undefined,
  },
};
