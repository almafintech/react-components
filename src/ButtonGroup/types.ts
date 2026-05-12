import React from "react";
import { ButtonProps } from "../Button/types";

export interface ButtonGroupProps {
  /** Props for an optional primary (main) action button. */
  primary?: ButtonProps;
  /** Props for an optional the secondary action button. */
  secondary?: ButtonProps;
  /** Props for an optional tertiary action button */
  tertiary?: ButtonProps;
  /** Wraps the group in a styled container. */
  container?: boolean;
  /** Additional actions rendered inside a dropdown or overflow menu. */
  moreOptions?: React.ReactNode;
  /** Applies a box-shadow elevation to the group. */
  hasElevation?: boolean;
  /** Horizontal alignment of the button group within its container. */
  /** @default "right" */
  align?: "left" | "center" | "right";
  /** Direction in which the buttons are arranged. */
  /** @default "horizontal" in desktop @default "vertical" in mobile */
  layout?: "horizontal" | "vertical";
  /** Reverses the order of buttons inside the main buttons container. */
  /** @default "true" in mobile */
  invertOrder?: boolean;
  containerClassName?: string;
  buttonsContainerClassName?: string;
}
