import { DatePickerProps } from "@heroui/date-picker";
import { ReactNode } from "react";

export interface NewDatePickerProps
  extends Omit<DatePickerProps, "defaultValue"> {
  hasLabel?: boolean;
  touched?: boolean;
  isFormField?: boolean;
  errorMessage?: ReactNode;
  infoMessage?: ReactNode;
  customInfo?: ReactNode;
  // To allow passing a date as defaultValue
  defaultValue?: DatePickerProps["defaultValue"] | Date;
}
