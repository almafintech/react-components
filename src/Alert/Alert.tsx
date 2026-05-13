"use client";
import { useState } from "react";
import styles from "./Alert.module.scss";

import { ReactComponent as InfoIcon } from "../../assets/images/ui/icons/ui-icon-info.svg";
import { ReactComponent as ErrorIcon } from "../../assets/images/ui/icons/ui-icon-error.svg";
import { ReactComponent as WarnIcon } from "../../assets/images/ui/icons/ui-icon-warn.svg";
import { ReactComponent as ChevronDown } from "../../assets/images/ui/icons/ui-icon-chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../assets/images/ui/icons/ui-icon-chevron-up.svg";

import { AlertProps } from "./types";

/**
 * Display brief messages for the user without interruptions
 */
const Alert = ({
  title,
  children,
  variant = "INFO",
  className,
  hasSummary,
  link,
  description,
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
    linkText,
    dataContainer,
    titleText,
    descriptionText,
  } = styles;

  const alertVariants = {
    INFO: {
      icon: (
        <InfoIcon
          className={iconStyle}
          style={title ? { top: "0.25rem" } : {}}
        />
      ),
      background: infoBackground,
    },
    WARN: {
      icon: (
        <WarnIcon
          className={iconStyle}
          style={title ? { top: "0.25rem" } : {}}
        />
      ),
      background: warnBackground,
    },
    ERROR: {
      icon: (
        <ErrorIcon
          className={iconStyle}
          style={title ? { top: "0.25rem" } : {}}
        />
      ),
      background: errorBackground,
    },
  };

  const { icon, background } = alertVariants[variant];

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  if (children)
    return (
      <div
        className={`${container} ${background} ${hasSummary && clickable} ${className ?? ""}`}
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
      >
        {icon}
        {hasSummary ? (
          <div>
            <p className={`${!isDetailsOpen ? summary : ""} flex-1`}>
              {children}
            </p>
            <div className="flex items-center gap-1">
              <p className={linkText}>{isDetailsOpen ? "Ver menos" : "Ver más"}</p>
              {isDetailsOpen ? (
                <ChevronUp className={chevron} />
              ) : (
                <ChevronDown className={chevron} />
              )}
            </div>
          </div>
        ) : (
          <p>{children}</p>
        )}
      </div>
    );

  return (
    <div
      className={`${container} ${background} ${hasSummary && clickable} ${className ?? ""}`}
      onClick={() => setIsDetailsOpen(!isDetailsOpen)}
    >
      <div className="flex gap-4">
        {icon}
        <div className={dataContainer}>
          {title && <p className={titleText}>{title}</p>}
          {description && <p className={descriptionText}>{description}</p>}
          {link && (
            <a
              className={linkText}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
