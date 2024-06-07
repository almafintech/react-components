import { InputType } from "./types";

export const thousandsSeparator = Number(1000)
  .toLocaleString("es-AR")
  .charAt(1);
export const decimalSeparator = Number(1.1).toLocaleString("es-AR").charAt(1);

export const asMoney = (value: string) => {
  const [whole, decimal] = value
    .replaceAll(thousandsSeparator, "")
    .split(decimalSeparator, 2);

  if (!whole) return value;
  const wholeNumber = Number.parseInt(whole);
  return isNaN(wholeNumber)
    ? value
    : wholeNumber.toLocaleString("es-AR") +
        (decimal !== undefined ? decimalSeparator : "") +
        (decimal ? decimal : "");
};

const asCuit = (value: string) => {
  const valueWithMask =
    value.length >= 11
      ? value.slice(0, 2) + "-" + value.slice(2, 10) + "-" + value.slice(10, 11)
      : value.slice(0, 2) + "-" + value.slice(2, 10);

  if (valueWithMask.endsWith("-")) {
    return valueWithMask.slice(0, -1);
  } else {
    return valueWithMask;
  }
};

const asDni = (value: string) => {
  const valueWithMask =
    value.length >= 3
      ? value.slice(0, 2) + "." + value.slice(2, 5) + "." + value.slice(5)
      : value.slice(0, 2);

  if (valueWithMask.endsWith(".")) {
    return valueWithMask.slice(0, -1);
  } else {
    return valueWithMask;
  }
};

export const getValue = (type: InputType, value: string) => {
  let renderValue = "";
  switch (type) {
    case "money":
      renderValue = asMoney(value);
      break;
    case "dni":
      renderValue = asDni(value);
      break;
    case "cuit":
      renderValue = asCuit(value);
      break;
    default:
      break;
  }
  return renderValue;
};
