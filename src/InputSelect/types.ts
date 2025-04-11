import { DateRange } from "../DatePicker/types";

import { SelectProps } from "@nextui-org/react";
import { Key, ReactNode } from "react";
import { WithTheme } from "..";

export type Values = string[] | string;

export interface Item extends WithTheme {
  value: string;
  label: string;
}

export interface SelectItemType extends Item {
  options?: Item[];
  downDivider?: boolean;
  selectAll?: boolean;
}

export interface SelectWithOption extends SelectItemType {
  options: Item[];
}

export type SelectType =
  | "single"
  | "multiple"
  | "single-radio"
  | "multiple-checkbox"
  | "multiple-sections-checkbox"
  | "single-radio-date-picker"
  | "single-radio-date-picker-day";

export interface NextUISelectProps
  extends Omit<
    SelectProps<SelectItemType>,
    | "labelPlacement"
    | "children"
    | "selectionMode"
    | "items"
    | "onSelectionChange"
    | "onChange"
    | "defaultSelectedKeys"
    | "errorMessage"
  > {
  confirmSelection?: boolean;
  isFormField?: boolean;
  items: SelectItemType[];
  type: SelectType;
  onChange: (keys: Key[] | Key) => void;
  defaultSelectedKeys?: Values;
  touched?: boolean;
  errorMessage?: ReactNode;
}

export interface InputSelectProps extends NextUISelectProps, WithTheme {
  locale?: string;
  onDatepickerDateChanged?: (range: DateRange) => void;
  initialDatePickerRange?: DateRange;
  minDatePickerDate?: Date;
  maxDatePickerDate?: Date;
  inputValue?: Values;
  showExternalBox?: boolean;
}
