import styles from "./Message.module.scss";

import { ReactComponent as ErrorIcon } from "../../assets/images/ui/icons/ui-icon-error-exclamation-filled.svg";
import { ReactComponent as SuccessIcon } from "../../assets/images/ui/icons/ui-icon-success-bg-dark.svg";
import { ReactComponent as InfoIcon } from "../../assets/images/ui/icons/ui-icon-info.svg";

import { MessageProps } from "./types";

const Message = ({ message, className, variant }: MessageProps) => {
  const { messageContainer, errorStyle, successStyle, infoStyle } = styles;

  const variantStyles = {
    error: errorStyle,
    success: successStyle,
    info: infoStyle,
  };
  const variantIcon = {
    error: <ErrorIcon />,
    success: <SuccessIcon />,
    info: <InfoIcon />,
  };

  return (
    <div className={`${messageContainer} ${variantStyles[variant]} ${className}`}>
      {variantIcon[variant]}
      <span>{message}</span>
    </div>
  );
};

export default Message;
