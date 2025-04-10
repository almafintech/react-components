import { ReactNode } from "react";
import { TooltipProps as HeroUITooltipProps } from "@heroui/tooltip";

export interface TooltipProps extends HeroUITooltipProps {
  children: ReactNode;
  variant?: "blue" | "black" | "white" | "byma";
  width?: string | number;
}
