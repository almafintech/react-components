import { ReactNode } from "react";
import { ButtonProps } from "../Button";

export type ToastType = "SUCCESS" | "INFO" | "WARNING" | "ERROR" | "CUSTOM";

export interface ToastMessageProps {
  /** Unique identifier for this toast container. Passed to `showToastMessage` via `containerId`. */
  messageId: string;
  /** Override the viewport width. Defaults to the design-system value (min `400px` on desktop, `100%` on mobile). */
  width?: string;
  /** When `true` the viewport is registered under `<messageId>-overPage` so it renders above modals/overlays. @default true */
  showOverPage?: boolean;
  /** Vertical placement of the toast viewport. @default "TOP" */
  position?: "TOP" | "BOTTOM";
  /** Extra class names forwarded to the Radix `Viewport` element. */
  className?: string;
}

export interface ShowToastOptions {
  /** Must match the `messageId` of the `<ToastMessage>` component you want to target. */
  containerId: string;
  /** Must match the `showOverPage` value of the target `<ToastMessage>`. @default true */
  showOverPage?: boolean;
  /**
   * Visual variant of the toast.
   * - `SUCCESS` — green checkmark icon + green timer bar.
   * - `INFO`    — blue info icon + blue timer bar.
   * - `WARNING` — amber warning icon + amber timer bar.
   * - `ERROR`   — red error icon + red timer bar.
   * - `CUSTOM`  — no preset icon; shows `icon` (or a fallback) and an optional CTA button.
   * @default "CUSTOM"
   */
  type?: ToastType;
  /** Title text rendered above the description. */
  title?: string;
  /** Show the animated countdown bar at the bottom of the toast. Only applies to typed variants (`SUCCESS`, `INFO`, `WARNING`, `ERROR`). @default true */
  timer?: boolean;
  /** Custom icon rendered in the `CUSTOM` variant. */
  icon?: ReactNode;
  /** Show the icon slot in the `CUSTOM` variant. @default true */
  showIcon?: boolean;
  /** Props for the action button rendered in the `CUSTOM` variant. `variant` is fixed to `"tertiary"`. No button is shown when omitted. */
  action?: Omit<ButtonProps, "variant" | "ref">;
  /** Hide the close button. @default false */
  hideCloseIcon?: boolean;
  /**
   * How long (ms) the toast stays visible before auto-dismissing.
   * When omitted, duration is calculated automatically based on content:
   * `4000` for single-line text, `8000` for multi-line text or content containing a link.
   */
  duration?: number;
}

export interface ToastEntry {
  id: string;
  content: ReactNode;
  options: ShowToastOptions;
}
