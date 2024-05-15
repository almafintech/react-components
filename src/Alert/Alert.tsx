"use client";
import { useState } from "react";
import styles from "./Alert.module.scss";
import InfoIcon from "../../assets/images/ui/icons/ui-icon-info.svg";
import ErrorIcon from "../../assets/images/ui/icons/ui-icon-error.svg";
import WarnIcon from "../../assets/images/ui/icons/ui-icon-warn.svg";
import ChevronDown from "../../assets/images/ui/icons/ui-icon-chevron-down.svg";
import ChevronUp from "../../assets/images/ui/icons/ui-icon-chevron-up.svg";
import { AlertProps } from "./types";

/**
 * Display brief messages for the user without interruptions
 */
const Alert = ({ children, variant, className, hasSummary }: AlertProps) => {
  const {
    container,
    iconStyle,
    infoBackground,
    warnBackground,
    errorBackground,
    clickable,
    summary,
  } = styles;

  const alertVariants = {
    INFO: {
      icon: <img src={InfoIcon} className={iconStyle} />,
      background: infoBackground,
    },
    WARN: {
      icon: <img src={WarnIcon} className={iconStyle} />,
      background: warnBackground,
    },
    ERROR: {
      icon: <img src={ErrorIcon} className={iconStyle} />,
      background: errorBackground,
    },
  };

  const { icon, background } = alertVariants[variant];

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div
      className={`${container} ${background} ${hasSummary && clickable} ${
        className ?? ""
      }`}
      onClick={() => setIsDetailsOpen(!isDetailsOpen)}
    >
      {icon}
      {hasSummary ? (
        <div className="flex w-full justify-between items-center gap-4">
          <p className={`${!isDetailsOpen && summary}`}>{children}</p>
          <div>
            {isDetailsOpen ? (
              <img src={ChevronUp} alt="" />
            ) : (
              <img src={ChevronDown} alt="" />
            )}
          </div>
        </div>
      ) : (
        <p>{children}</p>
      )}
    </div>
  );
};

export default Alert;
