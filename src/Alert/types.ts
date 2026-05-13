import { ReactNode } from "react";

export interface AlertProps {
  /**
   * The alert appearance style
   * @default "INFO"
   */
  variant?: "INFO" | "ERROR" | "WARN";
  /**
   * The title of the alert, shown in bold at the top of the alert.
   */
  title?: string;
  /**
   * The content to display in the button
   */
  children?: string | ReactNode;
  /**
   * Custom styles
   */
  className?: string;
  /**
   * A more detailed description of the alert.
   */
  description?: string;
  /**
   * A summary of the children is shown initially and all of it once clicked.
   */
  hasSummary?: boolean;
  /**
   * Clickable link text displayed below the content.
   */
  link?: {
    text: string;
    url: string;
  };
}
