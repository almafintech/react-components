import styles from "./Message.module.scss";
import ErrorIcon from "../../assets/images/ui/icons/ui-icon-error-exclamation-filled.svg";
import SuccessIcon from "../../assets/images/ui/icons/ui-icon-success-bg-dark.svg";
import InfoIcon from "../../assets/images/ui/icons/ui-icon-info.svg";
import { MessageProps } from "./types";

const Message = ({ message, className, variant }: MessageProps) => {
  const { messageContainer, errorStyle, successStyle, infoStyle } = styles;

  const variantStyles = {
    error: errorStyle,
    success: successStyle,
    info: infoStyle,
  };
  const variantIcon = {
    error: ErrorIcon,
    success: SuccessIcon,
    info: InfoIcon,
  };
  return (
    <div
      className={`${messageContainer} ${variantStyles[variant]} ${className}`}
    >
      <img src={variantIcon[variant]} alt={`${variantIcon[variant]} icon`} />
      <span>{message}</span>
    </div>
  );
};

export default Message;
