import { WithTheme } from "..";

export type DateRange = [Date | undefined, Date | undefined];

export interface DatePickerProps extends WithTheme {
  /**
   * The locale date format
   */
  locale?: string;
  /**
   * The default range of the DatePicker
   */
  defaultRange?: DateRange;
  /**
   * To  to ensure the value is after a specific date.
   */
  min?: Date;
  /**
   * To  to ensure the value is before a specific date.
   */
  max?: Date;
  /**
   * Handler called when the DatePicker's value changes.
   */
  onApply?: (date: DateRange) => void;
  /**
   * Handler called when the DatePicker's value is deleted.
   */
  onDelete?: () => void;
  /**
   * Handler called when the DatePicker's has a back arrow.
   */
  onBack?: () => void;
  /**
   * To set default value when onDelete handler is called.
   */
  restoreDefaultOnDelete?: boolean;
  /**
   * The variant of the DatePicker's value to choose
   */
  defaultCalendarVariant?: "DAY" | "MONTH" | "DATE";
  /**
   * To style dropdowns in DatePicker
   */
  dropdownClassName?: string;
  /**
   * To style menu in DatePicker
   */
  menuClassName?: string;
  /**
   * To style header in DatePicker
   */
  headerClassName?: string;
  /**
   * To style calendar in DatePicker
   */
  calendarClassName?: string;
  /**
   * To style footer in DatePicker
   */
  footerClassName?: string;
}
