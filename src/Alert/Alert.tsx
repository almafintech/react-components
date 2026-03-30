"use client";
import { useState } from "react";
import styles from "./Alert.module.scss";

import { ReactComponent as InfoIcon } from "../../assets/images/ui/icons/ui-icon-info.svg";
import { ReactComponent as InfoIconByma } from "../../assets/images/ui/icons/ui-icon-info-byma.svg";

import { ReactComponent as ErrorIcon } from "../../assets/images/ui/icons/ui-icon-error.svg";
import { ReactComponent as ErrorIconByma } from "../../assets/images/ui/icons/ui-icon-error-byma.svg";

import { ReactComponent as WarnIcon } from "../../assets/images/ui/icons/ui-icon-warn.svg";
import { ReactComponent as WarnIconByma } from "../../assets/images/ui/icons/ui-icon-warn-byma.svg";

import { ReactComponent as ChevronDown } from "../../assets/images/ui/icons/ui-icon-chevron-down.svg";
import { ReactComponent as ChevronDownByma } from "../../assets/images/ui/icons/ui-icon-chevron-down-byma.svg";

import { ReactComponent as ChevronUp } from "../../assets/images/ui/icons/ui-icon-chevron-up.svg";
import { ReactComponent as ChevronUpByma } from "../../assets/images/ui/icons/ui-icon-chevron-up-byma.svg";

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
    chevron,
  } = styles;

  const isBymaTheme = isByma(theme);

  const alertVariants = {
    INFO: {
      icon: isBymaTheme ? (
        <InfoIconByma className={iconStyle} />
      ) : (
        <InfoIcon className={iconStyle} />
      ),
      background: infoBackground,
    },
    WARN: {
      icon: isBymaTheme ? (
        <WarnIconByma className={iconStyle} />
      ) : (
        <WarnIcon className={iconStyle} />
      ),
      background: warnBackground,
    },
    ERROR: {
      icon: isBymaTheme ? (
        <ErrorIconByma className={iconStyle} />
      ) : (
        <ErrorIcon className={iconStyle} />
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
        <div className="flex w-full justify-between items-start gap-4">
          <p className={`${!isDetailsOpen ? summary : ""} flex-1`}>{children}</p>
          <div>
            {isDetailsOpen ? (
              isBymaTheme ? <ChevronUpByma className={chevron} /> : <ChevronUp className={chevron} />
            ) : (
              isBymaTheme ? <ChevronDownByma className={chevron} /> : <ChevronDown className={chevron} />
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
