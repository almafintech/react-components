import { CSSProperties, ReactNode } from "react";
import {
  ToastContainer,
  ToastContainerProps,
  Slide,
  ToastOptions,
  toast,
} from "react-toastify";
import "./ToastMessage.scss";
import "react-toastify/dist/ReactToastify.css";

interface ToastMessageProps extends ToastContainerProps {
  messageId: string;
  width?: string;
  showOverPage?: boolean;
  style?: CSSProperties;
}

export const ToastMessage = (props: ToastMessageProps) => {
  const { messageId, width, showOverPage = true, style, ...rest } = props;

  return (
    <ToastContainer
      position="top-right"
      containerId={showOverPage ? `${messageId}-overPage` : messageId}
      transition={Slide}
      limit={1}
      closeOnClick
      closeButton={false}
      draggable={false}
      autoClose={5000}
      style={{ width: width || "auto", ...style }}
      {...rest}
    />
  );
};

interface ShowToasOptions extends ToastOptions {
  showOverPage?: boolean;
}

export const showToastMessage = (
  content: ReactNode,
  options: ShowToasOptions
) => {
  const { showOverPage = true, ...rest } = options;

  toast(content, {
    ...rest,
    containerId: showOverPage
      ? `${options.containerId}-overPage`
      : options.containerId,
  });
};
