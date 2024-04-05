import { CSSProperties } from "react";
import { ToastContainerProps, ToastOptions } from "react-toastify";

export interface ToastMessageProps extends ToastContainerProps {
  messageId: string;
  width?: string;
  showOverPage?: boolean;
  style?: CSSProperties;
}

export interface ShowToastOptions extends ToastOptions {
  showOverPage?: boolean;
}
