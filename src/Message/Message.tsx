import styles from "./Message.module.scss";

import ErrorIcon from "../../assets/images/ui/icons/ui-icon-error-exclamation-filled.svg";
import ErrorIconByma from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled-byma.svg";

import SuccessIcon from "../../assets/images/ui/icons/ui-icon-success-bg-dark.svg";
import SuccessIconByma from "../../assets/images/ui/icons/ui-icon-success-bg-dark-byma.svg";

import InfoIcon from "../../assets/images/ui/icons/ui-icon-info.svg";
import InfoIconByma from "../../assets/images/ui/alert-icons/ui-alert-icon-info-byma.svg";

import { MessageProps } from "./types";
import { isByma } from "../utils";

const Message = ({ message, className, variant, theme }: MessageProps) => {
  const { messageContainer, errorStyle, successStyle, infoStyle } = styles;

  const isBymaTheme = isByma(theme);

  const variantStyles = {
    error: errorStyle,
    success: successStyle,
    info: infoStyle,
  };
  const variantIcon = {
    error: isBymaTheme ? ErrorIconByma : ErrorIcon,
    success: isBymaTheme ? SuccessIconByma : SuccessIcon,
    info: isBymaTheme ? InfoIconByma : InfoIcon,
  };

  return (
    <div
      className={`${isBymaTheme ? "byma" : ""} ${messageContainer} ${variantStyles[variant]} ${className}`}
    >
      <img src={variantIcon[variant]} alt={`${variantIcon[variant]} icon`} />
      <span>{message}</span>
    </div>
  );
};

export default Message;
