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
    viewport: {
      defaultViewport: "reset",
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: <EmptyState1 />,
    title: "Título",
    description: "Descripción de máximo 2 líneas",
    primaryAction: { text: "Acción principal" },
    secondaryAction: { text: "Acción secundaria" },
  },
};

export const WithoutDescription: Story = {
  args: {
    ...Default.args,
    description: undefined,
  },
};

export const WithoutImage: Story = {
  args: {
    ...Default.args,
    image: undefined,
  },
};

export const SectionType: Story = {
  args: {
    ...Default.args,
    primaryAction: { text: "Acción principal" },
    type: "section",
  },
};

export const SectionTypeWithSecondaryAction: Story = {
  args: {
    ...Default.args,
    type: "section",
    primaryAction: { text: "Acción principal" },
    secondaryAction: { text: "Acción secundaria" },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    ...Default.args,
  },
};

export const Custom: Story = {
  args: {
    ...Default.args,
    className: "custom-empty-state",
  },
};
