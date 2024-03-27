import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  SelectItemType,
  SelectType,
  SelectWithOption,
  Values,
  Item,
} from "./interface/types";
import { DateRange, getLongMonthNames } from "../DatePicker/helpers";

export const flattenItemOptions = (items: SelectItemType[]) => {
  return items.reduce<Item[]>((acc, item) => {
    // Add the current item without options to the accumulator
    const itemWithoutOptions = { ...item };
    delete itemWithoutOptions.options;
    acc.push(itemWithoutOptions);

    // If the item has options, add them to the accumulator
    if (item.options) {
      item.options.forEach((option) => {
        acc.push(option);
      });
    }
    return acc;
  }, []);
};

export const selectChangeHandler = (
  e: ChangeEvent<HTMLSelectElement>,
  items: SelectItemType[],
  type: SelectType,
  values: Values,
  setValues: Dispatch<SetStateAction<Values>>,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  confirmSelection: boolean | undefined,
  setDatePickerRange?: Dispatch<SetStateAction<DateRange | undefined>>
) => {
  const targetValue = e.target.value;

  // SINGLE
  if (type.includes("single") && !type.includes("date-picker")) {
    // Set the value if it's not the actions item
    if (targetValue !== "actions") {
      if (!(type.includes("radio") && !targetValue)) {
        setValues(targetValue);
        if (!confirmSelection) {
          setIsOpen(false);
        }
      }
    }
  } else if (type.includes("date-picker")) {
    if (
      targetValue !== "pick-day" &&
      targetValue !== "pick-month" &&
      targetValue !== "date-picker"
    ) {
      setValues(targetValue);
      setDatePickerRange && setDatePickerRange([undefined, undefined]);
    }
  } else {
    // MULTIPLE

    // Split the selected values and filter out the actions item
    let valuesArray = targetValue.split(",").filter((val) => val !== "actions");
    const itemsArray = items || [];

    // Check if selectAll value is found
    const allOptionValue =
      itemsArray.find((item) => item.selectAll)?.value || "";

    // Handle selectAll option selection
    if (allOptionValue && valuesArray.includes(allOptionValue)) {
      // If selectAll is selected, set all values
      return setValues(getAllValues(itemsArray));
    } else if (
      Array.isArray(values) &&
      allOptionValue &&
      values.includes(allOptionValue)
    ) {
      // If selectAll was previously selected and now it's not, clear all selections
      return setValues([]);
    }

    valuesArray = handleValuesWithOptions(valuesArray, itemsArray);

    // Unique values
    setValues([...new Set(valuesArray)]);
  }
};

// Function to get all values, including those from options
const getAllValues = (items: SelectItemType[]) => {
  return items.flatMap((item) =>
    item.options
      ? [item.value, ...item.options.map((option) => option.value)]
      : item.value
  );
};

// Function to select or unselect parent and child options
const handleValuesWithOptions = (
  valuesArray: string[],
  itemsArray: SelectItemType[]
) => {
  // Filter items that have options
  const itemsWithOptions = itemsArray.filter(
    (item) => item.options
  ) as SelectWithOption[];

  // Iterate through items with options
  for (let item of itemsWithOptions) {
    // Get options values
    const optionsValues = item.options.map((option) => option.value);
    // Check if any option of the item is selected
    const hasSelectedOptions = optionsValues.some((value) =>
      valuesArray.includes(value)
    );

    if (hasSelectedOptions) {
      // Check if all options of the item are selected
      const allOptionsSelected = optionsValues.every((value) =>
        valuesArray.includes(value)
      );

      // If all options are selected, add the item's value to the selection
      // Otherwise, remove the item's value from the selection
      if (allOptionsSelected) {
        valuesArray.push(item.value);
      } else {
        valuesArray = valuesArray.filter((val) => val !== item.value);
      }
    }
  }

  return valuesArray;
};

export const getRenderValue = (
  values: Values,
  items: SelectItemType[],
  hasDatePicker?: boolean,
  datePickerRange?: DateRange,
  locale?: string
) => {
  // When the date picker's apply button is clicked, the value is set to "date".
  // In this case, decide what value to render based on the range that was
  // selected, such as "January", "February - June", etc.
  if (
    typeof values === "string" &&
    values === "date" &&
    hasDatePicker &&
    datePickerRange
  ) {
    const sameYear =
      datePickerRange[0]?.getFullYear() === datePickerRange[1]?.getFullYear();
    const sameMonth =
      datePickerRange[0]?.getMonth() === datePickerRange[1]?.getMonth();
    const sameDay =
      datePickerRange[0]?.getDate() === datePickerRange[1]?.getDate();
    const months = datePickerRange.map(
      (date) => getLongMonthNames(locale ?? "es-AR")[date?.getMonth() ?? 0]
    );

    if (sameYear) {
      if (sameDay)
        return `${datePickerRange[0]?.getDate()} de ${
          months[0]
        } de ${datePickerRange[0]?.getUTCFullYear()}`;
      else {
        // if (sameMonth) return `${months[0]} ${datePickerRange[0]?.getDate()} - ${datePickerRange[1]?.getDate()}`
        if (sameMonth) return months[0];
        else return `${months[0]} - ${months[1]}`;
      }
    } else {
      return `${months[0]} ${datePickerRange[0]?.getFullYear()} - ${
        months[1]
      } ${datePickerRange[1]?.getFullYear()}`;
    }
  } else {
    // Flatten the items array to get all options on the same depth
    const flattenedItems: SelectItemType[] = flattenItemOptions(items);

    // Handle the case for multiple selections
    if (Array.isArray(values)) {
      // Filter the flattened items to only include those whose value is in the selected values
      const selectedValues = flattenedItems.filter((item) =>
        values.includes(item.value)
      );
      const allOptionSelected = selectedValues.some((item) => item.selectAll);

      if (allOptionSelected) {
        return "Todas";
      }

      // If less than 3 items are selected, concatenate their labels
      if (selectedValues.length < 3) {
        return selectedValues
          .map(
            (item, index) =>
              `${item.label}${
                selectedValues.length > 1 && index !== selectedValues.length - 1
                  ? ", "
                  : ""
              }`
          )
          .join("");
      } else {
        // If 3 or more items are selected, return a generic label
        return "Personalizado";
      }
    } else {
      // Handle single selection - find the label of the selected item or return an empty string if not found
      return flattenedItems.find((item) => item.value === values)?.label ?? "";
    }
  }
};

export const valueIsSelected = (value: string, values: Values) => {
  return Array.isArray(values)
    ? Array.from(values).includes(value)
    : value === values;
};
