import {
  TooltipProps as RadixTooltipRootProps,
  TooltipProviderProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipPortalProps,
  TooltipArrowProps,
} from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

type RadixTooltipAllProps = RadixTooltipRootProps &
  TooltipProviderProps &
  TooltipTriggerProps &
  TooltipContentProps &
  TooltipPortalProps &
  TooltipArrowProps;

export type TooltipPlacement = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";
export type TooltipVariant = "light" | "dark";
export type TooltipSize = "medium" | "small";

export interface AlmafintechTooltipProps {
  /** The element that triggers the tooltip. */
  children: ReactNode;
  /** Content displayed inside the tooltip bubble. */
  content: ReactNode;
  /**
   * Visual style of the tooltip.
   * @default "light"
   */
  variant?: TooltipVariant;
  /** Fixed width of the tooltip bubble (e.g. `200` or `"12rem"`). */
  width?: string | number;
  /**
   * Side of the trigger where the tooltip appears.
   * @default "top"
   */
  placement?: TooltipPlacement;
  /**
   * Alignment of the tooltip content relative to the trigger along the placement axis.
   * @default "center"
   */
  align?: TooltipAlign;
  /**
   * Distance in pixels between the tooltip and its trigger.
   * @default 4
   */
  offset?: number;
  /**
   * Delay in milliseconds before the tooltip opens.
   * @default 0
   */
  delay?: number;
  /**
   * When `true`, the tooltip is never shown regardless of user interaction.
   * @default false
   */
  disabled?: boolean;
  /** Controlled open state. Use together with `onOpenChange` for full control. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Callback fired when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Size of the tooltip bubble, controlling padding and font size.
   * @default "medium"
   */
  size?: TooltipSize;
  /**
   * When `true`, the tooltip opens and closes on click instead of hover.
   * @default false
   */
  showOnClick?: boolean;
  /** custom style for the tooltip content bubble. */
  contentClassName?: string;
  /**
   * Extra class name merged onto the tooltip arrow SVG.
   * To change the stroke color, also target the `polygon` child: `.your-class polygon { stroke: ... }`.
   */
  arrowClassName?: string;
}

export type TooltipProps = AlmafintechTooltipProps &
  Omit<RadixTooltipAllProps, keyof AlmafintechTooltipProps>;
