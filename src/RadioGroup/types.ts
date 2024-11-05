import { ChangeEvent, ReactNode, FocusEvent } from "react";
import { WithTheme } from "..";

export type SizeType = "small" | "medium" | "large";

export type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
  initialChecked?: boolean;
};

export interface RadioGroupProps extends WithTheme {
  options: RadioOption[];
  label?: ReactNode;
  disabled?: boolean;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement, Element>) => void;
  name?: string;
  value?: string;
}
