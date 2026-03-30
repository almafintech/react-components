"use client";

import { Button } from "@nextui-org/button";
import { forwardRef } from "react";
import styles from "./RoundedButton.module.scss";

//icons
import { ReactComponent as DownloadIcon } from "../../assets/images/ui/icons/ui-icon-download.svg";
import { ReactComponent as DownloadIconByma } from "../../assets/images/ui/icons/ui-icon-download-byma.svg";
import { ReactComponent as ShareIcon } from "../../assets/images/ui/icons/ui-icon-share.svg";
import { ReactComponent as ShareIconByma } from "../../assets/images/ui/icons/ui-icon-share-byma.svg";
import { ReactComponent as WhatsappIcon } from "../../assets/images/ui/icons/ui-icon-whatsapp.svg";
import { ReactComponent as WhatsappIconByma } from "../../assets/images/ui/icons/ui-icon-whatsapp-byma.svg";
import { ReactComponent as WhatsappDisabledIcon } from "../../assets/images/ui/icons/ui-icon-whatsapp-disabled.svg";
import { ReactComponent as EmailIcon } from "../../assets/images/ui/icons/ui-icon-email.svg";
import { ReactComponent as EmailIconByma } from "../../assets/images/ui/icons/ui-icon-email-byma.svg";
import { ReactComponent as EmailDisabledIcon } from "../../assets/images/ui/icons/ui-icon-email-disabled.svg";
import { ReactComponent as PauseIcon } from "../../assets/images/ui/icons/pause-icon.svg";
import { ReactComponent as PauseIconByma } from "../../assets/images/ui/icons/pause-icon-byma.svg";
import { ReactComponent as PlayIcon } from "../../assets/images/ui/icons/play-icon.svg";
import { ReactComponent as PlayIconByma } from "../../assets/images/ui/icons/play-icon-byma.svg";
import { ReactComponent as TrashIcon } from "../../assets/images/ui/icons/trash-icon.svg";
import { ReactComponent as TrashIconByma } from "../../assets/images/ui/icons/trash-icon-byma.svg";
import { ReactComponent as EditIcon } from "../../assets/images/ui/icons/edit-icon.svg";
import { ReactComponent as EditIconByma } from "../../assets/images/ui/icons/edit-icon-byma.svg";
import { ReactComponent as NominalRateIcon } from "../../assets/images/ui/icons/nominal-rate-icon.svg";
import { ReactComponent as NominalRateIconByma } from "../../assets/images/ui/icons/nominal-rate-icon-byma.svg";

import { RoundedButtonProps } from "./types";
import { isByma } from "../utils";

/**
 * An icon button that allows users to perform an action with a single click
 */
const RoundedButton = forwardRef<HTMLButtonElement, RoundedButtonProps>(
  (
    { icon, isDisabled, buttonType, onClick, className, theme, ...rest },
    ref
  ) => {
    const isBymaTheme = isByma(theme);

    const { base, rectangular, empty } = styles;
    const IconComponent = () => {
      switch (icon) {
        case "download":
          return isBymaTheme ? <DownloadIconByma /> : <DownloadIcon />;
        case "share":
          return isBymaTheme ? <ShareIconByma /> : <ShareIcon />;
        case "email":
          return isDisabled ? (
            <EmailDisabledIcon />
          ) : isBymaTheme ? (
            <EmailIconByma />
          ) : (
            <EmailIcon />
          );
        case "whatsapp":
          return isDisabled ? (
            <WhatsappDisabledIcon />
          ) : isBymaTheme ? (
            <WhatsappIconByma />
          ) : (
            <WhatsappIcon />
          );
        case "edit":
          return isBymaTheme ? <EditIconByma /> : <EditIcon />;
        case "trash":
          return isBymaTheme ? <TrashIconByma /> : <TrashIcon />;
        case "pause":
          return isBymaTheme ? <PauseIconByma /> : <PauseIcon />;
        case "play":
          return isBymaTheme ? <PlayIconByma /> : <PlayIcon />;
        case "nominal-rate":
          return isBymaTheme ? <NominalRateIconByma /> : <NominalRateIcon />;
        default:
          return icon;
      }
    };

    return (
      <Button
        {...rest}
        ref={ref}
        isIconOnly
        aria-label="rounded-button"
        disableRipple={true}
        radius={buttonType === "rounded" ? "full" : "sm"}
        onClick={onClick}
        isDisabled={isDisabled}
        className={`${isBymaTheme ? "byma" : ""} ${base} ${
          buttonType === "rectangular" ? rectangular : ""
        } ${buttonType === "empty" ? empty : ""} ${className}`}
      >
        <IconComponent />
      </Button>
    );
  }
);

export default RoundedButton;
