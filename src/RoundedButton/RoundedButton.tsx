"use client";

import { Button } from "@nextui-org/button";
import { forwardRef } from "react";
import styles from "./RoundedButton.module.scss";

//icons
import DownloadIcon from "../../assets/images/ui/icons/ui-icon-download.svg";
import DownloadIconByma from "../../assets/images/ui/icons/ui-icon-download-byma.svg";
import ShareIcon from "../../assets/images/ui/icons/ui-icon-share.svg";
import ShareIconByma from "../../assets/images/ui/icons/ui-icon-share-byma.svg";
import WhatsappIcon from "../../assets/images/ui/icons/ui-icon-whatsapp.svg";
import WhatsappIconByma from "../../assets/images/ui/icons/ui-icon-whatsapp-byma.svg";
import WhatsappDisabledIcon from "../../assets/images/ui/icons/ui-icon-whatsapp-disabled.svg";
import EmailIcon from "../../assets/images/ui/icons/ui-icon-email.svg";
import EmailIconByma from "../../assets/images/ui/icons/ui-icon-email-byma.svg";
import EmailDisabledIcon from "../../assets/images/ui/icons/ui-icon-email-disabled.svg";
import PauseIcon from "../../assets/images/ui/icons/pause-icon.svg";
import PauseIconByma from "../../assets/images/ui/icons/pause-icon-byma.svg";
import PlayIcon from "../../assets/images/ui/icons/play-icon.svg";
import PlayIconByma from "../../assets/images/ui/icons/play-icon-byma.svg";
import TrashIcon from "../../assets/images/ui/icons/trash-icon.svg";
import TrashIconByma from "../../assets/images/ui/icons/trash-icon-byma.svg";
import EditIcon from "../../assets/images/ui/icons/edit-icon.svg";
import EditIconByma from "../../assets/images/ui/icons/edit-icon-byma.svg";
import NominalRateIcon from "../../assets/images/ui/icons/nominal-rate-icon.svg";
import NominalRateIconByma from "../../assets/images/ui/icons/nominal-rate-icon-byma.svg";

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
          return <img src={isBymaTheme ? DownloadIconByma : DownloadIcon} />;
        case "share":
          return <img src={isBymaTheme ? ShareIconByma : ShareIcon} />;
        case "email":
          return isDisabled ? (
            <img src={EmailDisabledIcon} />
          ) : (
            <img src={isBymaTheme ? EmailIconByma : EmailIcon} />
          );
        case "whatsapp":
          return isDisabled ? (
            <img src={WhatsappDisabledIcon} />
          ) : (
            <img src={isBymaTheme ? WhatsappIconByma : WhatsappIcon} />
          );
        case "edit":
          return <img src={isBymaTheme ? EditIconByma : EditIcon} />;
        case "trash":
          return <img src={isBymaTheme ? TrashIconByma : TrashIcon} />;
        case "pause":
          return <img src={isBymaTheme ? PauseIconByma : PauseIcon} />;
        case "play":
          return <img src={isBymaTheme ? PlayIconByma : PlayIcon} />;
        case "nominal-rate":
          return (
            <img src={isBymaTheme ? NominalRateIconByma : NominalRateIcon} />
          );
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
