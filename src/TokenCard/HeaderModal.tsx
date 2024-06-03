import PadlockIcon from "../../assets/images/ui/icons/security-icon-padlock-green.svg";
import styles from "./TokenCard.module.scss";
import { HeaderModalProps } from "./types";

const HeaderModal = ({ title, subtitle, className }: HeaderModalProps) => {
  const { headerModal, subtitleStyle } = styles;
  return (
    <header className={`${headerModal} ${className ?? ""}`}>
      <img src={PadlockIcon} className="mr-4" />
      <div>
        <h2>{title}</h2>
        <h3 className={subtitleStyle}>{subtitle}</h3>
      </div>
    </header>
  );
};

export default HeaderModal;
