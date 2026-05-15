import { ReactNode } from "react";
import { ButtonProps } from "../Button/types";

export interface EmptyStateProps {
  /** Main heading displayed in the empty state. */
  title: string;
  /** Supporting text shown below the title. */
  description?: string;
  /** Illustration or icon rendered above the title. */
  image?: ReactNode;
  /** Layout variant: `fullpage` centers content in the viewport; `section` fits within a container. */
  /** @default "fullpage" */
  type?: "fullpage" | "section";
  /** Primary call-to-action button props. */
  primaryAction?: Omit<ButtonProps, "variant">;
  /** Secondary call-to-action button props. */
  secondaryAction?: Omit<ButtonProps, "variant">;
  /** Additional class name applied to the root element. */
  className?: string;
}
