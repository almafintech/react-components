export interface ChipProps {
  /** Text content of the chip */
  label: string;
  /** Show the remove (×) button */
  removable?: boolean;
  /** Visual size of the chip */
  size?: "medium" | "large";
  /** Disabled state — non-interactive, greyed-out text */
  disabled?: boolean;
  /** Selected state — filled primary background */
  selected?: boolean;
  /** Called when the remove button is clicked */
  onRemove?: () => void;
  /** Called when the chip body is clicked */
  onClick?: () => void;
  className?: string;
}
