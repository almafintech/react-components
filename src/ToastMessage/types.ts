import { CSSProperties } from "react";
import { ToastContainerProps, ToastOptions } from "react-toastify";
import { WithTheme } from "..";

export interface ToastMessageProps
  extends Omit<ToastContainerProps, "theme">,
    WithTheme {
  messageId: string;
  width?: string;
  showOverPage?: boolean;
  style?: CSSProperties;
}

export interface ShowToastOptions extends ToastOptions {
  showOverPage?: boolean;
}
