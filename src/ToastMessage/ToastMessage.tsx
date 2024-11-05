import { ReactNode } from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import "./ToastMessage.scss";
import "react-toastify/dist/ReactToastify.css";
import { ShowToastOptions, ToastMessageProps } from "./types";
import { isByma } from "../utils";

export const ToastMessage = (props: ToastMessageProps) => {
  const {
    messageId,
    width,
    showOverPage = true,
    style,
    theme,
    className,
    ...rest
  } = props;

  const isBymaTheme = isByma(theme);

  return (
    <ToastContainer
      className={`${isBymaTheme ? "byma" : ""} ${className ?? ""}`}
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

export const showToastMessage = (
  content: ReactNode,
  options: ShowToastOptions
) => {
  const { showOverPage = true, ...rest } = options;

  toast(content, {
    ...rest,
    containerId: showOverPage
      ? `${options.containerId}-overPage`
      : options.containerId,
  });
};
