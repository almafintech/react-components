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

const RoundedButton = forwardRef<HTMLButtonElement, RoundedButtonProps>(
  ({ icon, isDisabled, buttonType, onClick, className, ...rest }, ref) => {
    const { base, rectangular, empty } = styles;
    const IconComponent = () => {
      switch (icon) {
        case "download":
          return <DownloadIcon />;
        case "share":
          return <ShareIcon />;
        case "email":
          return isDisabled ? <EmailDisabledIcon /> : <EmailIcon />;
        case "whatsapp":
          return isDisabled ? <WhatsappDisabledIcon /> : <WhatsappIcon />;
        case "edit":
          return <EditIcon />;
        case "trash":
          return <TrashIcon />;
        case "pause":
          return <PauseIcon />;
        case "play":
          return <PlayIcon />;
        case "nominal-rate":
          return <NominalRateIcon />;
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
