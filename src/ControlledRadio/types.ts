export interface ControlledRadioProps {
  className?: string;
  label: string;
  value: string;
  name: string;
  checked: boolean;
  onChange?: (value: string) => void;
}
