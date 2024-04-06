import { ReactNode } from "react";
import { ModalProps as NextUiModalProps } from "@nextui-org/modal";

export interface ModalProps extends NextUiModalProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  centerFooter?: boolean;
  width?: string;
}
