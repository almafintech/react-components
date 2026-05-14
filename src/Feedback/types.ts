import { ReactNode } from "react";

export type FeedbackType = "Info" | "Success" | "Warning" | "Pending" | "Error";

export interface FeedbackProps {
  type?: FeedbackType;
  title?: string;
  description?: string;
  hasDescription?: boolean;
  hasNestedContent?: boolean;
  children?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
}
