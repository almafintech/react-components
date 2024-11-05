import { ChangeEvent, FocusEvent } from "react";
import { WithTheme } from "..";

export interface ControlledRadioProps extends WithTheme {
  /**
   *  To style ControlledRadio
   */
  className?: string;
  /**
   *  The ControlledRadio's label
   */
  label: string;
  /**
   *  The ControlledRadio's value
   */
  value: string;
  /**
   *  The ControlledRadio's name
   */
  name: string;
  /**
   *  To select one item
   */
  checked: boolean;
  /**
   *  Handler called when the ControlledRadio's item selected changes.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   *  Disabled option.
   */
  disabled?: boolean;
  /**
   *  Handler called when the ControlledRadio's item loses focus.
   */
  onBlur?: (event: FocusEvent<HTMLInputElement, Element>) => void;
}
