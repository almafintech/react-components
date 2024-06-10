import { InputType } from "./types";

// Define the thousands separator for the "es-AR" locale
export const thousandsSeparator = Number(1000)
  .toLocaleString("es-AR")
  .charAt(1);

// Define the decimal separator for the "es-AR" locale
export const decimalSeparator = Number(1.1).toLocaleString("es-AR").charAt(1);

/**
 * Remove formatting mask from a given value based on the type of the value
 * @param {string} value - The value from which the mask should be removed
 * @param {string} type - The type of the value (e.g., "money", "cuit", "dni")
 * @returns {string} - The value with the mask removed
 */
export const removeMask = (value: string, type: string) => {
  switch (type) {
    case "money":
      return value
        .replaceAll(thousandsSeparator, "")
        .replace(decimalSeparator, ".")
        .replace(/(\.\d{2})\d+/, "$1");
    case "cuit":
      return value.replaceAll("-", "").replaceAll(/\D/g, "").slice(0, 11);
    case "dni":
      return value.replaceAll(".", "").replaceAll(/\D/g, "").slice(0, 8);
    default:
      return value;
  }
};

/**
 * Convert a string value to a money format
 * @param {string} value - The value to be converted to money format
 * @returns {string} - The value in money format
 */
const asMoney = (value: string) => {
  let [whole, decimal] = value.split(".", 2);

  if (!whole) return value;
  const wholeNumber = Number.parseInt(whole);
  return isNaN(wholeNumber)
    ? value
    : wholeNumber.toLocaleString("es-AR") +
        (decimal !== undefined ? decimalSeparator : "") +
        (decimal ? decimal : "");
};

/**
 * Convert a string value to a CUIT format
 * @param {string} value - The value to be converted to CUIT format
 * @returns {string} - The value in CUIT format
 */
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

/**
 * Convert a string value to a DNI format
 * @param {string} value - The value to be converted to DNI format
 * @returns {string} - The value in DNI format
 */
const asDni = (value: string) => {
  // Allow 7 or 8 digits
  let valueWithMask = value;

  if (value.length >= 2 && value.length <= 7) {
    valueWithMask = `${value.slice(0, 1)}.${value.slice(1, 4)}.${value.slice(4, 7)}`;
  } else if (value.length >= 3 && value.length > 7) {
    valueWithMask = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}`;
  }

  if (valueWithMask.endsWith(".")) {
    return valueWithMask.slice(0, -1);
  } else {
    return valueWithMask;
  }
};

/**
 * Get the formatted value based on the type of the input
 * @param {InputType} type - The type of the input (e.g., "money", "cuit", "dni")
 * @param {string} value - The value to be formatted
 * @returns {string} - The formatted value
 */
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
