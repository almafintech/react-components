import type { Meta, StoryObj } from "@storybook/react";
import Alert from "../Alert/Alert";

const meta = {
  title: "Feedback & Status/Alert (Message Box)",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    description: "Este es un mensaje de información",
    variant: "INFO",
    hasSummary: false,
  },
};

export const Warn: Story = {
  args: {
    description: "Este es un mensaje de advertencia",
    variant: "WARN",
    hasSummary: false,
  },
};

export const Error: Story = {
  args: {
    description: "Este es un mensaje de error",
    variant: "ERROR",
    hasSummary: false,
  },
};

export const Title: Story = {
  args: {
    variant: "INFO",
    hasSummary: false,
    title: "Agregá hasta 3 personas",
    description: 
      "Cada persona recibirá un mail para finalizar el proceso de apertura",
  },
};

export const Link: Story = {
  args: {
    ...Title.args,
    link: {
      text: "Conocé más sobre el proceso",
      url: "https://youtube.com/watch?v=dQw4w9WgXcQ&themeRefresh=1",
    },
  },
};

export const Summary: Story = {
  args: {
    children: (
      // "Agregá hasta 3 personas. Cada persona recibirá un mail para finalizar el proceso de apertura de la cuenta. Recordá: Cada mail que ingreses se vinculará permanentemente al cotitular correspondiente. Aconsejamos que sean correos personales y con acceso directo, ya que no podrán desvincularse."
      <div className="flex flex-col">
        <p>
          <b>Agregá hasta 3 personas.</b>
        </p>
        <p>
          Cada persona recibirá un mail para finalizar el proceso de apertura de
          la cuenta.
        </p>
        <br />
        <p>
          <i>
            Recordá: Cada mail que ingreses se vinculará permanentemente al
            cotitular correspondiente. Aconsejamos que sean correos personales y
            con acceso directo, ya que no podrán desvincularse.
          </i>
        </p>
      </div>
    ),
    variant: "INFO",
    hasSummary: true,
  },
};

export const Custom: Story = {
  args: {
    children: "Este es un mensaje especial",
    variant: "INFO",
    className: "customAlert",
  },
};
