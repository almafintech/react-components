"use client";

import { Button } from "@nextui-org/button";
import { forwardRef } from "react";
import styles from "./RoundedButton.module.scss";

//icons
import DownloadIcon from "../../assets/images/ui/icons/ui-icon-download.svg";
import ShareIcon from "../../assets/images/ui/icons/ui-icon-share.svg";
import WhatsappIcon from "../../assets/images/ui/icons/ui-icon-whatsapp.svg";
import WhatsappDisabledIcon from "../../assets/images/ui/icons/ui-icon-whatsapp-disabled.svg";
import EmailIcon from "../../assets/images/ui/icons/ui-icon-email.svg";
import EmailDisabledIcon from "../../assets/images/ui/icons/ui-icon-email-disabled.svg";
import PauseIcon from "../../assets/images/ui/icons/pause-icon.svg";
import PlayIcon from "../../assets/images/ui/icons/play-icon.svg";
import TrashIcon from "../../assets/images/ui/icons/trash-icon.svg";
import EditIcon from "../../assets/images/ui/icons/edit-icon.svg";
import NominalRateIcon from "../../assets/images/ui/icons/nominal-rate-icon.svg";
import { RoundedButtonProps } from "./types";

/**
 * An icon button that allows users to perform an action with a single click
 */
const RoundedButton = forwardRef<HTMLButtonElement, RoundedButtonProps>(
  ({ icon, isDisabled, buttonType, onClick, className, ...rest }, ref) => {
    const { base, rectangular, empty } = styles;
    const IconComponent = () => {
      switch (icon) {
        case "download":
          return <img src={DownloadIcon} />;
        case "share":
          return <img src={ShareIcon} />;
        case "email":
          return isDisabled ? (
            <img src={EmailDisabledIcon} />
          ) : (
            <img src={EmailIcon} />
          );
        case "whatsapp":
          return isDisabled ? (
            <img src={WhatsappDisabledIcon} />
          ) : (
            <img src={WhatsappIcon} />
          );
        case "edit":
          return <img src={EditIcon} />;
        case "trash":
          return <img src={TrashIcon} />;
        case "pause":
          return <img src={PauseIcon} />;
        case "play":
          return <img src={PlayIcon} />;
        case "nominal-rate":
          return <img src={NominalRateIcon} />;
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
        className={`${base} ${
          buttonType === "rectangular" ? rectangular : ""
        } ${buttonType === "empty" ? empty : ""} ${className}`}
      >
        <IconComponent />
      </Button>
    );
  }
);

export default RoundedButton;
