import { useState, useEffect } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { TooltipProps } from "./types";
import styles from "./Tooltip.module.scss";

const {
  trigger,
  triggerDisabled,
  content: contentClass,
  light,
  dark,
  lightArrow,
  darkArrow,
  medium,
  small,
} = styles;

const variantClass = { light, dark };
const arrowClass = { light: lightArrow, dark: darkArrow };
const sizeClass = { medium, small };

const Tooltip = ({
  children,
  content,
  variant = "light",
  width,
  placement = "top",
  align = "center",
  offset = 4,
  delay = 0,
  disabled = false,
  size = "medium",
  open,
  defaultOpen,
  onOpenChange,
  showOnClick = false,
  contentClassName,
  arrowClassName,
}: TooltipProps) => {
  const [clickOpen, setClickOpen] = useState(false);

  useEffect(() => {
    if (!showOnClick) return;
    const close = () => setClickOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [showOnClick]);

  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root
        open={!disabled && showOnClick ? clickOpen : open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger
          asChild
          className={disabled ? triggerDisabled : trigger}
          onClick={
            showOnClick
              ? (e) => {
                  e.stopPropagation();
                  setClickOpen((prev) => !prev);
                }
              : undefined
          }
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={`${contentClass} ${variantClass[variant]} ${sizeClass[size]} ${contentClassName ? `${contentClassName}` : ""}`}
            style={{ width }}
            side={placement}
            align={align}
            sideOffset={offset}
          >
            {content}
            <TooltipPrimitive.Arrow
              className={`${arrowClass[variant]} ${arrowClassName ? `${arrowClassName}` : ""}`}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
