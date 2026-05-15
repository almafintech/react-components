"use client";

import { forwardRef } from "react";
import styles from "./IconButton.module.scss";
import { IconButtonProps } from "./types";

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = "filled",
      size = "medium",
      icon,
      label,
      badge,
      className,
      disabled,
      children,
      ...rest
    },
    ref
  ) => {
    const {
      base,
      small,
      medium,
      large,
      filled,
      outline,
      ghost,
      labeled,
      iconWrapper,
      iconWrapperLarge,
      labelText,
      badgeEl,
    } = styles;

    const sizeClass = { small, medium, large }[size];
    const variantClass = { filled, outline, ghost }[variant];
    const isLabeled = !!label;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={[
          base,
          sizeClass,
          variantClass,
          isLabeled ? labeled : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <span className={size === "large" ? iconWrapperLarge : iconWrapper}>
          {icon}
        </span>
        {isLabeled && <span className={labelText}>{label}</span>}
        {badge !== undefined && (
          <span className={badgeEl} aria-hidden="true">
            {badge}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
