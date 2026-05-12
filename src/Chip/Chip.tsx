import type { MouseEvent } from "react";
import styles from "./Chip.module.scss";
import { ChipProps } from "./types";
import { ReactComponent as CloseIcon } from "@icons/close-dark-small.svg";

const Chip = ({
  label,
  size = "medium",
  disabled = false,
  selected = false,
  onRemove,
  onClick,
  className,
}: ChipProps) => {
  const {
    chip,
    medium,
    large,
    chipSelected,
    chipDisabled,
    chipLabel,
    closeButton,
  } = styles;

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove?.();
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div
      onClick={!disabled ? (isMobile && onRemove ? onRemove : onClick) : undefined}
      className={[
        chip,
        size === "large" ? large : medium,
        selected && !disabled ? chipSelected : "",
        disabled ? chipDisabled : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-disabled={disabled || undefined}
    >
      <span className={chipLabel}>{label}</span>
      {onRemove && (
        <button
          type="button"
          className={closeButton}
          onClick={disabled ? undefined : handleRemove}
          disabled={disabled}
          aria-label={`Eliminar ${label}`}
          tabIndex={-1}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Chip;
