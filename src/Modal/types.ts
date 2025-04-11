import { ReactNode } from "react";
import { ModalProps as NextUiModalProps } from "@nextui-org/modal";
import { WithTheme } from "..";

export interface ModalProps extends NextUiModalProps, WithTheme {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  centerFooter?: boolean;
  width?: string;
}
