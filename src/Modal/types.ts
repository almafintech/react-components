import { ReactNode } from "react";
import { ModalProps as HeroUIModalProps } from "@heroui/modal";
import { WithTheme } from "..";

export interface ModalProps extends HeroUIModalProps, WithTheme {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  centerFooter?: boolean;
  width?: string;
}
