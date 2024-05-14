"use client";
import { useState } from "react";
import styles from "./DatePicker.module.scss";
import Button from "../Button/Button";
import Calendar from "./ui/Calendar";
import Select from "../InputSelect/InputSelect";
import BackIcon from "../../assets/images/ui/icons/ui-icon-chevron-left.svg";
import {
  getCurrentYear,
  getCurrentMonth,
  getCurrentDay,
  getLongMonthNames,
  isRangeFinal,
} from "./helpers";
import { DatePickerProps, DateRange } from "./types";

/**
 *  Allow users to select a date or a range of dates
 */
const DatePicker = (props: DatePickerProps) => {
  const {
    locale = "es-AR",
    defaultRange,
    min = new Date(getCurrentYear() - 4, getCurrentMonth(), getCurrentDay()),
    max = new Date(getCurrentYear() + 2, getCurrentMonth(), getCurrentDay()),
    onApply,
    onDelete,
    onBack,
    restoreDefaultOnDelete,
    defaultCalendarVariant = "DAY",
    menuClassName,
    headerClassName,
    calendarClassName,
    footerClassName,
  } = props;

  const {
    menu: menuStyle,
    header,
    select,
    selectBase,
    selectTrigger,
    selectInnerWrapper,
    selectValue,
    years,
    months,
    iconButton,
  } = styles;

  const setInitialRange = () => {
    if (defaultRange) {
      if (defaultCalendarVariant === "MONTH") {
        defaultRange[0]?.setDate(1);
        defaultRange[1]?.setDate(1);
      }
      return defaultRange;
    } else return [undefined, undefined] as DateRange;
  };

  const [range, setRange] = useState<DateRange>(setInitialRange());
  const [calendarYear, setCalendarYear] = useState(
    Math.max(getCurrentYear(), min.getFullYear())
  );
  const [calendarMonth, setCalendarMonth] = useState(
    Math.max(getCurrentMonth(), min.getMonth())
  );
  const calendarVariant = defaultCalendarVariant;

  const yearPicker = (
    <Select
      aria-label="Year"
      items={Array.from(
        Array(max.getFullYear() + 1 - min.getFullYear()).keys()
      ).map((_, i) => {
        return {
          label: (min.getFullYear() + i).toString(),
          value: (min.getFullYear() + i).toString(),
        };
      })}
      defaultSelectedKeys={[getCurrentYear().toString()]}
      onChange={(key) =>
        !Array.isArray(key) &&
        setCalendarYear(Number.parseInt(key.toString()) ?? 0)
      }
      type={"single"}
      classNames={{
        base: selectBase,
        trigger: selectTrigger,
        innerWrapper: selectInnerWrapper,
        value: selectValue,
      }}
      className={`${select} ${years}`}
    />
  );

  const monthPicker = (
    <Select
      aria-label="Month"
      items={getLongMonthNames(locale).map((name, i) => {
        return { label: name, value: i.toString() };
      })}
      defaultSelectedKeys={[getCurrentMonth().toString()]}
      onChange={(key) =>
        !Array.isArray(key) &&
        setCalendarMonth(Number.parseInt(key.toString()) ?? 0)
      }
      type={"single"}
      classNames={{
        trigger: selectTrigger,
        innerWrapper: selectInnerWrapper,
        value: selectValue,
      }}
      className={`${select} ${months}`}
    />
  );

  return (
    <div className={`${menuStyle} ${menuClassName}`}>
      <div className={`${header} ${headerClassName}`}>
        <div className="flex gap-1 flex-grow">
          {onBack && calendarVariant !== "DATE" && (
            <div className={iconButton} onClick={() => onBack && onBack()}>
              <img src={BackIcon} />
            </div>
          )}
          {["DAY", "DATE"].includes(calendarVariant) && monthPicker}
        </div>
        {yearPicker}
      </div>

      <Calendar
        variant={calendarVariant}
        locale={locale}
        calendarYear={calendarYear}
        calendarMonth={calendarMonth}
        min={min}
        max={max}
        range={range}
        setRange={setRange}
        className={calendarClassName}
      />

      <div
        className={`${footerClassName} flex gap-3 flex-wrap w-full justify-evenly`}
      >
        <Button
          text="Aplicar"
          variant="primary"
          isDisabled={!isRangeFinal(range)}
          onClick={() => onApply && isRangeFinal(range) && onApply(range)}
        />

        {defaultCalendarVariant !== "DATE" && (
          <Button
            text="Borrar"
            variant="tertiary"
            onClick={() => {
              setRange(
                restoreDefaultOnDelete && defaultRange
                  ? defaultRange
                  : [undefined, undefined]
              );
              onDelete && onDelete();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DatePicker;
