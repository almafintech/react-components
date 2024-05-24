export interface ControlledRadioProps {
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
  onChange?: (value: string) => void;
}
