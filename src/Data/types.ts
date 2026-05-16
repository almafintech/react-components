import { ReactNode } from "react";
import { ButtonProps } from "../Button";

export type DataVariant = "inline" | "stacked";

export interface DataIcon {
  icon: ReactNode;
  onClick?: () => void;
}

export interface DataProps {
  /**
   * Layout variant. "inline" places label and value side by side;
   * "stacked" places them vertically.
   * @default "inline"
   */
  variant?: DataVariant;
  /**
   * Label text displayed on the left side of the row (inline) or above the value (stacked)
   */
  label: string;
  /**
   * Optional node rendered at the end of the label (e.g. an info icon with a tooltip)
   */
  labelEndContent?: ReactNode;
  /**
   * Primary value.
   * inline: displayed on the right side.
   * stacked: displayed as the first line below the label.
   */
  value: number | string | ReactNode;
  /**
   * (stacked only) Icon rendered before the value text on the first line
   */
  leadingIcon?: DataIcon;
  /**
   * (stacked only) Icon rendered after the value text on the first line
   */
  trailingIcon?: DataIcon;
  /**
   * (stacked only) Content rendered at the far right of the first line (e.g. a Tag)
   */
  endContent?: ReactNode;
  /**
   * (stacked only) Secondary line of text shown below the primary value
   */
  secondaryValue?: ReactNode | string;
  /**
   * (stacked only) Props for a tertiary Button rendered at the bottom. `variant` is fixed to "tertiary".
   */
  action?: Omit<ButtonProps, "variant" | "ref">;
  /**
   * (inline only) Nested items revealed by clicking the row. When provided a chevron is
   * shown next to the label and the row becomes a toggle.
   */
  subItems?: DataProps[];
  /**
   * (inline only) Renders the value with emphasis (semibold weight)
   */
  emphasis?: boolean;
  /**
   * Additional CSS class applied to the outermost element
   */
  className?: string;
}
