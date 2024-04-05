export type DateRange = [Date | undefined, Date | undefined];

export interface DatePickerProps {
  locale?: string;
  defaultRange?: DateRange;
  min?: Date;
  max?: Date;
  onApply?: (date: DateRange) => void;
  onDelete?: () => void;
  onBack?: () => void;
  restoreDefaultOnDelete?: boolean;
  defaultCalendarVariant?: "DAY" | "MONTH" | "DATE";
  dropdownClassName?: string;
  menuClassName?: string;
  headerClassName?: string;
  calendarClassName?: string;
  footerClassName?: string;
}
