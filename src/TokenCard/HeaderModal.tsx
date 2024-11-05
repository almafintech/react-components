import PadlockIcon from "../../assets/images/ui/icons/security-icon-padlock-green.svg";
import PadlockIconByma from "../../assets/images/ui/icons/security-icon-padlock-green-byma.svg";

import { isByma } from "../utils";
import { HeaderModalProps } from "./types";

import styles from "./TokenCard.module.scss";

const HeaderModal = ({
  title,
  subtitle,
  className,
  theme,
}: HeaderModalProps) => {
  const { headerModal, subtitleStyle } = styles;

  const isBymaTheme = isByma(theme);

  return (
    <header className={`${headerModal} ${className ?? ""}`}>
      <img
        src={`${isBymaTheme ? PadlockIconByma : PadlockIcon}`}
        className="mr-4"
      />
      <div>
        <h2>{title}</h2>
        <h3 className={subtitleStyle}>{subtitle}</h3>
      </div>
    </header>
  );
};

export default HeaderModal;
