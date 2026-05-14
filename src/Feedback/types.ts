import { ButtonGroupProps } from "../ButtonGroup/types";
import React from "react";

export type FeedbackType = "INFO" | "SUCCESS" | "WARNING" | "PENDING" | "ERROR";

export interface FeedbackProps extends Omit<ButtonGroupProps, "container"> {
  /** Wraps the button group in a styled container. @default true */
  showButtonsContainer?: boolean;
  /** Visual style and icon for the feedback state. @default "INFO" */
  type?: FeedbackType;
  /** Heading text. */
  title?: string;
  /** Body text shown below the title. */
  description?: string;
  /** Optional content rendered below the description. */
  children?: React.ReactNode;
  /** Controls modal visibility. */
  isOpen: boolean;
  /** Called when the modal requests to close. */
  onClose?: () => void;
  /** Extra class name applied to the root element. */
  className?: string;
}
