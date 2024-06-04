import { InputType } from "./types";

export const thousandsSeparator = Number(1000).toLocaleString("es-AR").charAt(1);
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

const asCuit = (value: string) =>
  value.slice(0, 2) + "-" + value.slice(2, 10) + "-" + value.slice(10);

const asDni = (value: string) =>
  value.slice(0, 2) + "." + value.slice(2, 5) + "." + value.slice(5);

export const getInitialValue = (type: InputType, initialValue?: string) => {
  let value = "";
  if (initialValue) {
    switch (type) {
      case "money":
        value = initialValue?.replaceAll(".", ",");
        break;
      case "dni":
        value = asDni(initialValue);
        break;
      case "cuit":
        value = asCuit(initialValue);
        break;
      default:
        value = initialValue;
        break;
    }
  }
  return value;
};
