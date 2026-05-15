import { ReactNode } from "react";

export type TagVariant = "success" | "error" | "warning" | "info" | "inactive" | "custom";

export interface TagProps {
  /** Text displayed inside the tag. */
  label: string;
  /** Visual style of the tag. @default "success" */
  variant?: TagVariant;
  /** Icon rendered before the label. */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: ReactNode;
  /**
   * Additional class names. When `variant="custom"` no preset colors are
   * applied, so this prop has full control over appearance.
   */
  className?: string;
}
