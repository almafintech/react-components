import { ReactNode } from "react";

export interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  image?: ReactNode;
  type?: "fullpage" | "section";
primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  className?: string;
}
