import type { Meta, StoryObj } from "@storybook/react";
import { ToastMessage, showToastMessage } from "../ToastMessage/ToastMessage";
import { Button } from "../Button";

const meta = {
  title: "Feedback & Status/Toast Message",
  component: ToastMessage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "reset",
    },
  },
} satisfies Meta<typeof ToastMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10M11.3333 6.66667L8 10L4.66667 6.66667M8 10V2"
      stroke="#001C40"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Success: Story = {
  args: { messageId: "toastSuccess" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Operación realizada con éxito.", {
              containerId: "toastSuccess",
              type: "SUCCESS",
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const Info: Story = {
  args: { messageId: "toastInfo" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Hay información importante que revisar.", {
              containerId: "toastInfo",
              type: "INFO",
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const Warning: Story = {
  args: { messageId: "toastWarning" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Verificá los datos antes de continuar.", {
              containerId: "toastWarning",
              type: "WARNING",
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const Error: Story = {
  args: { messageId: "toastError" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Ocurrió un error. Intentá de nuevo.", {
              containerId: "toastError",
              type: "ERROR",
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const Bottom: Story = {
  args: { messageId: "toastBottom", position: "BOTTOM" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Toast en posición inferior.", {
              containerId: "toastBottom",
              type: "INFO",
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const WithTitle: Story = {
  args: { messageId: "toastWithTitle" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Descripción máx 2 líneas.", {
              containerId: "toastWithTitle",
              type: "INFO",
              title: "Título de 1 línea",
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const HideIcon = {
  args: { messageId: "toastHideIcon" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Descripción máx 2 líneas.", {
              containerId: "toastHideIcon",
              type: "ERROR",
              showIcon: false,
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const CustomType: Story = {
  args: { messageId: "toastNeutral" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Descripción máx 2 líneas.", {
              containerId: "toastNeutral",
              type: "CUSTOM",
              icon: <DownloadIcon />,
              title: "Título",
              action: { text: "CTA", onClick: () => alert("CTA clicked") },
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const WithAction: Story = {
  args: { messageId: "toastSuccess" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Operación realizada con éxito.", {
              containerId: "toastSuccess",
              type: "INFO",
              action: {
                text: "Deshacer",
                onClick: () => alert("Undo clicked"),
              },
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const HideCloseIcon: Story = {
  args: { messageId: "toastHideClose" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Sin botón de cierre.", {
              containerId: "toastHideClose",
              type: "SUCCESS",
              hideCloseIcon: true,
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const HideProgressBar: Story = {
  args: { messageId: "toastNoTimer" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Sin barra de progreso.", {
              containerId: "toastNoTimer",
              type: "INFO",
              timer: false,
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const ShortDuration: Story = {
  args: { messageId: "toastShortDuration" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Se cierra en 2 segundos.", {
              containerId: "toastShortDuration",
              type: "INFO",
              duration: 2000,
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const WithLink: Story = {
  args: { messageId: "toastWithLink" },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage(
              <span>
                Revisá los términos en{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  este enlace
                </a>
                .
              </span>,
              {
                containerId: "toastWithLink",
                type: "INFO",
              },
            )
          }
        />
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  args: { messageId: "toastMobile" },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  decorators: [
    (Story: () => JSX.Element) => (
      <div>
        <Button
          text="Show toast"
          onClick={() =>
            showToastMessage("Vista para mobile.", {
              containerId: "toastMobile",
              type: "SUCCESS",
            })
          }
        />
        <Story />
      </div>
    ),
  ],
};
