import type { Meta, StoryObj } from "@storybook/react";
import RoundedButton from "../RoundedButton/RoundedButton";
import FileUpload from "../../assets/images/ui/icons/ui-icon-file-plus.svg";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/RoundedButton",
  component: RoundedButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: {
      options: [
        "download",
        "share",
        "edit",
        "email",
        "whatsapp",
        "trash",
        "pause",
        "play",
        "nominal-rate",
      ],
      control: {
        type: "select",
      },
    },
    buttonType: {
      options: ["squared", "rounded", "rectangular", "empty"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof RoundedButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Download: Story = {
  args: {
    icon: "download",
    buttonType: "squared",
  },
};

export const Edit: Story = {
  args: {
    icon: "edit",
    buttonType: "squared",
  },
};

export const Share: Story = {
  args: {
    icon: "share",
    buttonType: "squared",
  },
};

export const Email: Story = {
  args: {
    icon: "email",
    buttonType: "squared",
  },
};

export const Whatsapp: Story = {
  args: {
    icon: "whatsapp",
    buttonType: "squared",
  },
};

export const Trash: Story = {
  args: {
    icon: "trash",
    buttonType: "squared",
  },
};

export const Pause: Story = {
  args: {
    icon: "pause",
    buttonType: "squared",
  },
};

export const Play: Story = {
  args: {
    icon: "pause",
    buttonType: "squared",
  },
};

export const NominalRate: Story = {
  args: {
    icon: "pause",
    buttonType: "squared",
  },
};

export const CustomIcon: Story = {
  args: {
    icon: <img src={FileUpload} />,
    buttonType: "squared",
  },
};

export const WithRectangularBackground: Story = {
  args: {
    icon: "download",
    buttonType: "rectangular",
  },
};

export const WithCircularBackground: Story = {
  args: {
    icon: "download",
    buttonType: "rounded",
  },
};

export const WithoutBackground: Story = {
  args: {
    icon: "download",
    buttonType: "empty",
  },
};

export const disabled: Story = {
  args: {
    icon: "email",
    buttonType: "squared",
    isDisabled: true
  },
};


