import { ReactNode } from "react";

export interface AlertProps {
  /**
   * The content to display in the button
   */
  children: string | ReactNode;
  /**
   * The alert appearance style
   */
  variant: "INFO" | "ERROR" | "WARN";
  /**
   * Custom styles
   */
  className?: string;
  /**
   * A summary of the children is shown initially and all of it once clicked.
   */
  hasSummary?: boolean;
}
