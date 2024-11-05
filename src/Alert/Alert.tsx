"use client";
import { useState } from "react";
import styles from "./Alert.module.scss";

import InfoIcon from "../../assets/images/ui/icons/ui-icon-info.svg";
import InfoIconByma from "../../assets/images/ui/icons/ui-icon-info-byma.svg";

import ErrorIcon from "../../assets/images/ui/icons/ui-icon-error.svg";
import ErrorIconByma from "../../assets/images/ui/icons/ui-icon-error-byma.svg";

import WarnIcon from "../../assets/images/ui/icons/ui-icon-warn.svg";
import WarnIconByma from "../../assets/images/ui/icons/ui-icon-warn-byma.svg";

import ChevronDown from "../../assets/images/ui/icons/ui-icon-chevron-down.svg";
import ChevronDownByma from "../../assets/images/ui/icons/ui-icon-chevron-down-byma.svg";

import ChevronUp from "../../assets/images/ui/icons/ui-icon-chevron-up.svg";
import ChevronUpByma from "../../assets/images/ui/icons/ui-icon-chevron-up-byma.svg";

import { AlertProps } from "./types";
import { isByma } from "../utils";

/**
 * Display brief messages for the user without interruptions
 */
const Alert = ({
  children,
  variant,
  className,
  hasSummary,
  theme,
}: AlertProps) => {
  const {
    container,
    iconStyle,
    infoBackground,
    warnBackground,
    errorBackground,
    clickable,
    summary,
  } = styles;

  const isBymaTheme = isByma(theme);

  const alertVariants = {
    INFO: {
      icon: (
        <img
          src={isBymaTheme ? InfoIconByma : InfoIcon}
          className={iconStyle}
        />
      ),
      background: infoBackground,
    },
    WARN: {
      icon: (
        <img
          src={isBymaTheme ? WarnIconByma : WarnIcon}
          className={iconStyle}
        />
      ),
      background: warnBackground,
    },
    ERROR: {
      icon: (
        <img
          src={isBymaTheme ? ErrorIconByma : ErrorIcon}
          className={iconStyle}
        />
      ),
      background: errorBackground,
    },
  };

  const { icon, background } = alertVariants[variant];

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div
      className={`${isBymaTheme ? "byma" : ""} ${container} ${background} ${hasSummary && clickable} ${
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
              <img src={isBymaTheme ? ChevronUpByma : ChevronUp} alt="" />
            ) : (
              <img src={isBymaTheme ? ChevronDownByma : ChevronDown} alt="" />
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
