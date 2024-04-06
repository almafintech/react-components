import { ReactNode } from "react";

export interface AlertProps {
  children: string | ReactNode;
  variant: "INFO" | "ERROR" | "WARN";
  className?: string;
  // If set, alert will become a dropdown, displaying a summary initially and
  // the actual children passed once clicked open
  hasSummary?: boolean;
}
