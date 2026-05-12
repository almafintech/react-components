export interface ChipProps {
  /** Text content of the chip */
  label: string;
  /** Called when the remove button is clicked or when the chip is clicked in mobile */
  onRemove?: () => void;
  /** Called when the chip body is clicked */
  onClick?: () => void;
  /** Visual size of the chip */
  /** @default "medium" */
  size?: "medium" | "large";
  /** Disabled state — non-interactive, greyed-out text */
  disabled?: boolean;
  /** Selected state — filled primary background */
  selected?: boolean;
  className?: string;
}
