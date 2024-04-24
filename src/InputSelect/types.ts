import { NextUISelectProps, Values } from "./interface/types";
import { DateRange } from "../DatePicker/types";

export interface InputSelectProps extends NextUISelectProps {
  locale?: string;
  onDatepickerDateChanged?: (range: DateRange) => void;
  initialDatePickerRange?: DateRange;
  minDatePickerDate?: Date;
  inputValue?: Values;
}
