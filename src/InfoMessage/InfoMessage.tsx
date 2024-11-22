import styles from "./InfoMessage.module.scss";

import InfoIcon from "../../assets/images/ui/alert-icons/ui-alert-icon-info.svg";
import InfoIconByma from "../../assets/images/ui/alert-icons/ui-alert-icon-info-byma.svg";
import { InfoMessageProps } from "./types";

const InfoMessage = ({ isBymaTheme, message, className }: InfoMessageProps) => {
  const { infoMessage } = styles;
  return (
    <div className={`${className ? className : ""}`}>
      <img src={isBymaTheme ? InfoIconByma : InfoIcon} />
      <span className={infoMessage}>{message}</span>
    </div>
  );
};

export default InfoMessage;
