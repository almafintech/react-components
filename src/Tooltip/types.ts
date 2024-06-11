import { ReactNode } from "react";
import { TooltipProps as NextUiTooltipProps } from "@nextui-org/tooltip";

export interface TooltipProps extends NextUiTooltipProps {
  children: ReactNode;
  variant?: "blue" | "black" | "white";
  width?: string | number;
}
