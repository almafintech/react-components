import styles from "./InfoMessage.module.scss";

import { ReactComponent as InfoIcon } from "../../assets/images/ui/alert-icons/ui-alert-icon-info.svg";
import { ReactComponent as InfoIconByma } from "../../assets/images/ui/alert-icons/ui-alert-icon-info-byma.svg";
import { InfoMessageProps } from "./types";

const InfoMessage = ({ isBymaTheme, message, className }: InfoMessageProps) => {
  const { infoMessage } = styles;
  return (
    <div className={`${className ? className : ""}`}>
      {isBymaTheme ? <InfoIconByma /> : <InfoIcon width={16} />}
      <span className={infoMessage}>{message}</span>
    </div>
  );
};

export default InfoMessage;
