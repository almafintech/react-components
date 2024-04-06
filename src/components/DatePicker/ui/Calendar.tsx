"use client";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "../DatePicker.module.scss";
import { getShortMonthNames, sameDate } from "../helpers";
import { DateRange } from "../types";

interface Props {
  variant: "DAY" | "MONTH" | "DATE";
  locale?: string;
  calendarYear: number;
  calendarMonth: number;
  min?: Date;
  max?: Date;
  range: DateRange;
  setRange: Dispatch<SetStateAction<DateRange>>;
  className?: string;
}

const Calendar = (props: Props) => {
  const {
    variant = "DAY",
    locale = "es-AR",
    calendarYear,
    calendarMonth,
    min,
    max,
    range,
    setRange,
    className: calendarClassName,
  } = props;

  const {
    calendar,
    monthly,
    daily,
    month: monthStyle,
    day: dayStyle,
    today,
    lastHovered,
    unselectable,
    selected,
    padding,
    final,
    start,
    end,
  } = styles;

  const [hovered, setHovered] = useState<Date | undefined>(undefined);

  // Localized weekday initials
  const weekdayInitials = Array.from(Array(7).keys()).map((day) =>
    new Date(0, 0, day).toLocaleString(locale, { weekday: "short" }).slice(0, 1)
  );

  // Every day in a specific month
  const getDaysInMonth = (month: number) => {
    const lastDayInMonth = new Date(calendarYear, month + 1, 0).getDate();
    return Array.from({ length: lastDayInMonth }, (_, i) => i + 1);
  };

  // - Set date n as lower bound if unset or date n is older than current lower bound
  // - Set date n as upper bound if unset and lower bound is already set
  // - Discard range and set date n as new lower bound if both bounds already set
  const setRangeBounds = (n: Date) => {
    if (variant === "DATE") setRange([n, n]);
    else if (
      range[0] === undefined ||
      (range[0] !== undefined && range[1] !== undefined) ||
      n < range[0]
    )
      setRange([n, undefined]);
    else setRange([range[0], n]);
  };

  const isInRange = (n: Date, a: Date | undefined, b: Date | undefined) =>
    a !== undefined && b !== undefined && n >= a && n <= b;

  // Ddays before the first one of the month that pad out a calendar
  const getMonthPrefix = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? [] : getDaysInMonth(month - 1).slice(-firstDay);
  };

  // Days after the last one of the month that pad out a calendar
  const getMonthSuffix = (month: number, year: number) => {
    const lastDay = new Date(year, month + 1, 0).getDay();
    return getDaysInMonth(month).slice(0, 6 - lastDay);
  };

  const Cell = ({
    date,
    name,
    isMonth,
    className,
  }: {
    date: Date;
    name: string;
    isMonth?: boolean;
    className?: string;
  }) => {
    const todayDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    const isSelectable = (!min || date > min) && (!max || date <= max);
    const isLastHovered = sameDate(date, hovered, isMonth);
    const isToday = sameDate(date, todayDate, isMonth);
    const isSelected =
      isSelectable &&
      (range[1]
        ? isInRange(date, ...range)
        : isInRange(date, range[0], hovered));
    const isStart = isSelectable && sameDate(date, range[0], isMonth);
    const isEnd =
      isSelectable &&
      (sameDate(date, range[1], isMonth) ||
        (range[1] === undefined &&
          isInRange(date, range[0], hovered) &&
          sameDate(date, hovered, isMonth)));

    return (
      <div
        className={`${className} ${isToday && today} ${
          isLastHovered && lastHovered
        } ${!isSelectable && unselectable} ${isSelected && selected} ${
          isInRange(date, ...range) && final
        } ${isStart && start} ${isEnd && end}`}
        onClick={() => isSelectable && setRangeBounds(date)}
        onMouseOver={() => isSelectable && !isLastHovered && setHovered(date)}
      >
        {name.toUpperCase()}
      </div>
    );
  };

  const DayCalendar = () => (
    <div className={`${calendar} ${daily} ${calendarClassName}`}>
      {weekdayInitials.map((name, i) => (
        <div className={`${dayStyle} ${unselectable}`} key={i}>
          {name.toUpperCase()}
        </div>
      ))}

      {getMonthPrefix(calendarMonth, calendarYear).map((name, i) => {
        const date = new Date(
          calendarYear,
          calendarMonth,
          -(getMonthPrefix(calendarMonth, calendarYear).length - i - 1)
        );
        return (
          <Cell
            date={date}
            key={date.toString()}
            name={name.toString()}
            className={`${dayStyle} ${padding}`}
          />
        );
      })}

      {getDaysInMonth(calendarMonth).map((name) => {
        const date = new Date(calendarYear, calendarMonth, name);
        return (
          <Cell
            date={date}
            key={date.toString()}
            name={name.toString()}
            className={dayStyle}
          />
        );
      })}

      {getMonthSuffix(calendarMonth, calendarYear).map((name) => {
        const date = new Date(calendarYear, calendarMonth + 1, name);
        return (
          <Cell
            date={date}
            key={date.toString()}
            name={name.toString()}
            className={`${dayStyle} ${padding}`}
          />
        );
      })}
    </div>
  );

  const MonthCalendar = () => (
    <div className={`${calendar} ${monthly} ${calendarClassName}`}>
      {getShortMonthNames(locale).map((name, i) => {
        const date =
          range[0] && !range[1]
            ? new Date(calendarYear, i + 1, 0)
            : new Date(calendarYear, i, 1);
        return (
          <Cell
            key={name}
            date={date}
            name={name.toString()}
            className={monthStyle}
            isMonth
          />
        );
      })}
    </div>
  );

  return ["DAY", "DATE"].includes(variant) ? (
    <DayCalendar />
  ) : (
    <MonthCalendar />
  );
};

export default Calendar;
