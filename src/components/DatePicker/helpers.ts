import { DateRange } from "./types";

export const isRangeFinal = (range: DateRange) =>
  range[0] && range[1] && range[0] <= range[1];

export const getCurrentYear = () => new Date().getFullYear();

export const getCurrentMonth = () => new Date().getMonth();

export const getCurrentDay = () => new Date().getDate();

// Localized month names
export const getLongMonthNames = (locale: string) =>
  Array.from(Array(12).keys()).map((month) => {
    const name = new Date(0, month, 1).toLocaleString(locale, {
      month: "long",
    });
    return name.charAt(0).toUpperCase() + name.slice(1);
  });

// Short, localized month names
export const getShortMonthNames = (locale: string) =>
  Array.from(Array(12).keys()).map((month) =>
    new Date(0, month, 1).toLocaleString(locale, { month: "short" })
  );

// Check date equality, ignoring their time
export const sameDate = (
  a: Date | undefined,
  b: Date | undefined,
  ignoreDay?: boolean
) =>
  a &&
  b &&
  new Date(
    a?.getFullYear(),
    a?.getMonth(),
    ignoreDay ? 1 : a?.getDate()
  )?.getTime() ==
    new Date(
      b?.getFullYear(),
      b?.getMonth(),
      ignoreDay ? 1 : b?.getDate()
    )?.getTime();
