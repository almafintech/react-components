import type { MouseEvent } from "react";
import styles from "./Chip.module.scss";
import { ChipProps } from "./types";

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const Chip = ({
  label,
  removable = false,
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

  return (
    <div
      className={[
        chip,
        size === "large" ? large : medium,
        selected && !disabled ? chipSelected : "",
        disabled ? chipDisabled : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={!disabled ? onClick : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
      aria-pressed={onClick ? selected : undefined}
    >
      <span className={chipLabel}>{label}</span>
      {removable && (
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
