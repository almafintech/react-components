"use client";

import {
  Select as NextUiSelect,
  SelectItem,
  SelectSection,
} from "@nextui-org/select";
import styles from "./InputSelect.module.scss";
import { useState, useEffect, useRef, Key } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../Button/Button";
import ControlledRadio from "../ControlledRadio/ControlledRadio";
import { Item, SelectItemType, Values } from "./types";
import {
  selectChangeHandler,
  getRenderValue,
  valueIsSelected,
} from "./helpers";
import Checkbox from "../Checkbox/Checkbox";
import InvalidIcon from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled.svg";
import ChevronIcon from "../../assets/images/ui/icons/ui-icon-chevron-dark-down.svg";
import CalendarIcon from "../../assets/images/ui/icons/ui-icon-calendar.svg";
import DatePicker from "../DatePicker/DatePicker";
import { DateRange } from "../DatePicker/types";
import { InputSelectProps } from "./types";

const InputSelect = ({
  placeholder,
  className,
  isInvalid,
  type,
  items,
  confirmSelection,
  isFormField,
  onChange,
  defaultSelectedKeys,
  description,
  touched,
  errorMessage,
  classNames,
  locale = "es-AR",
  onDatepickerDateChanged,
  onBlur,
  isDisabled,
  initialDatePickerRange,
  minDatePickerDate,
  inputValue,
  ...rest
}: InputSelectProps) => {
  const {
    invalidSelect,
    validSelect,
    iconWrapper,
    labelCheckbox,
    confirmActions,
    confirmActionsListbox,
    confirmActionsListboxWrapper,
    listbox,
    datePickerListboxWrapper,
    itemDivider,
    section,
    checkOrRadio,
    label,
    formField,
    labelFix,
    error,
    icon,
    base,
    mainWrapper,
    trigger,
    selectorIcon,
    innerWrapper,
    valueStyle,
    popoverContent,
    errorMessageStyle,
    descriptionStyle,
    helperWrapper,
    datePicker,
    datePickerOption,
    disabledSelect,
    ...restStyles
  } = styles;

  // Useful booleans to check type
  const hasCheckbox = type.includes("checkbox");
  const hasRadio = type.includes("radio");
  const isSingle = type.includes("single");
  const isMultiple = type.includes("multiple");
  const hasDatePicker = type.includes("date-picker");
  const isDateVariant = type.includes("day");

  // Id to difference component instances
  const [componentId, setComponentId] = useState<string>();

  // Handle open and close of select
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(isOpen);

  // Select values
  const [values, setValues] = useState<Values>(defaultSelectedKeys || []);

  // To set when input is touched
  const [selectTouched, setSelectTouched] = useState(touched || false);

  // To show a date picker and hide all options
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(isDateVariant);

  // Last date range selected in the date picker
  const [datePickerRange, setDatePickerRange] = useState<DateRange | undefined>(
    initialDatePickerRange
  );

  // Date picker calendar variant shown intially when date picker was last opened
  const [datePickerInitialVariant, setDatePickerInitialVariant] = useState<
    "DAY" | "DATE" | "MONTH"
  >(isDateVariant ? "DATE" : "DAY");

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Listener for closing the select
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [componentId]);

  // Set the id to identify the component
  // This is done here for it to execute on the client and dont have discrepancies with the server
  useEffect(() => {
    setComponentId(uuidv4());
  }, []);

  // Change the values when the values are confirmed
  const handleConfirmChanges = () => {
    onChange(values);
    setIsOpen(false);
  };

  // Reset changes
  const handleResetChanges = () => {
    setValues(defaultSelectedKeys || []);
    onChange(defaultSelectedKeys || []);
    setIsOpen(false);
  };

  // Handle click for multi section checkbox
  const handleSectionClick = (options: Item[], value: string) => {
    if (hasCheckbox) {
      let newSelectedValues: string[] = [];
      // Manage the parent and child values to set
      setValues((prev) => {
        const currentValues = prev ? Array.from(prev) : [];
        const optionValues = options.map((op) => op.value);
        const parentChildValues = [...optionValues, value];

        if (currentValues.includes(value)) {
          // If the current value is already selected, remove it and its children
          newSelectedValues = currentValues.filter(
            (val) => !parentChildValues.includes(val)
          );
        } else {
          // If the current value is not selected, add it along with its children
          newSelectedValues = [...currentValues, ...parentChildValues];
        }
        // Unique values
        return [...new Set(newSelectedValues)];
      });

      if (!confirmSelection) {
        onChange(newSelectedValues.filter((val) => !!val));
      }
    }
  };

  // Handle apply button click on the date picker. Close the picker and select
  // menu, set appropiate states and set select value to "date", which tells
  // the component to render some special value based on the selected range
  // (i.e. "May", "January - June", etc.)
  const onDatePickerApply = (range: DateRange) => {
    setDatePickerRange(range);
    setValues("date");
    setIsDatePickerOpen(false);
    setIsOpen(false);
    if (onDatepickerDateChanged) onDatepickerDateChanged(range);
  };
  const onDatePickerDelete = () => {
    if (defaultSelectedKeys) {
      setValues(defaultSelectedKeys);
      onChange(defaultSelectedKeys);
    }
  };

  // Handle opening the date picker
  const openDatePicker = (variant: "DAY" | "MONTH") => {
    setDatePickerInitialVariant(variant);
    setIsDatePickerOpen(true);
  };

  // Render Checkbox, Radio or label
  const ItemContent = ({ value, label }: Item) => {
    if (hasRadio) {
      return (
        <ControlledRadio
          label={label}
          value={value}
          name={label}
          checked={valueIsSelected(value, values)}
        />
      );
    } else if (hasCheckbox) {
      return (
        <Checkbox value={value} isSelected={valueIsSelected(value, values)}>
          {label}
        </Checkbox>
      );
    } else {
      return label;
    }
  };

  const getErrorMessage = () => (
    <div className={error}>
      <img src={InvalidIcon} className={icon} />
      {errorMessage ?? "Valor inválido"}
    </div>
  );

  // Handler for inside clicks
  const handleInsideClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
    hasDatePicker && setIsDatePickerOpen(isDateVariant);
  };

  // Handler for outside clicks
  const handleOutsideClick = (event: MouseEvent) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;

    const selectOpen = isOpenRef.current;

    if (componentId && target) {
      const triggerElement = document.querySelector(
        `[data-id="${componentId}"]`
      );
      const targetDataSlot = target.getAttribute("data-slot") || "";
      const noCloseSlots = ["listbox", "heading", "base"];

      // If select is open
      if (selectOpen) {
        // Check if the click is outside the select
        if (
          triggerElement &&
          !triggerElement.contains(target) &&
          !noCloseSlots.includes(targetDataSlot)
        ) {
          // If confirmSelection set the values to the previous ones
          if (confirmSelection) {
            setValues(defaultSelectedKeys || []);
          }
          return setIsOpen((prev) => !prev);
        }
      }
    }
  };

  useEffect(() => {
    if (inputValue) {
      setValues(inputValue);
    }
  }, [inputValue]);

  return (
    <NextUiSelect
      {...rest}
      isDisabled={isDisabled}
      onClick={handleInsideClick}
      onBlur={(e: React.FocusEvent) => {
        setSelectTouched(true);
        onBlur && onBlur(e);
      }}
      disallowEmptySelection={isSingle && true}
      description={!isInvalid && description}
      errorMessage={isInvalid && selectTouched && <>{getErrorMessage()}</>}
      selectionMode={isSingle || hasDatePicker ? "single" : "multiple"}
      scrollShadowProps={{
        isEnabled: confirmSelection ? false : true,
      }}
      data-id={componentId}
      items={isDatePickerOpen ? [] : items}
      labelPlacement="outside"
      placeholder={!inputValue ? placeholder ?? " " : " "}
      className={`${className} ${
        isInvalid && selectTouched ? invalidSelect : ""
      } ${isInvalid === false && selectTouched && validSelect} ${
        isDisabled ? disabledSelect : ""
      }`}
      classNames={{
        base: `${base} ${classNames?.base}`,
        label: `${label} ${isInvalid || description ? labelFix : ""} ${
          isFormField && formField
        }`,
        mainWrapper: `${mainWrapper} ${classNames?.mainWrapper}`,
        trigger: `${trigger} ${classNames?.trigger}`,
        innerWrapper: `${innerWrapper} ${classNames?.innerWrapper}`,
        selectorIcon: `${selectorIcon} ${classNames?.selectorIcon}`,
        value: `${valueStyle} ${classNames?.value}`,
        listboxWrapper: `${
          confirmSelection
            ? confirmActionsListboxWrapper
            : restStyles.listboxWrapper
        } ${isDatePickerOpen && datePickerListboxWrapper} ${
          classNames?.listboxWrapper
        }`,
        listbox: `${listbox} ${confirmSelection ? confirmActionsListbox : ""} ${
          classNames?.listbox
        }`,
        popoverContent: `${popoverContent} ${classNames?.popoverContent} ${classNames?.popoverContent}`,
        helperWrapper: `${helperWrapper} ${classNames?.helperWrapper}`,
        description: `${descriptionStyle} ${classNames?.description}`,
        errorMessage: `${errorMessageStyle} ${classNames?.errorMessage}`,
      }}
      isOpen={isOpen}
      selectedKeys={typeof values === "string" && isSingle ? [values] : values}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        selectChangeHandler(
          e,
          items,
          type,
          values,
          setValues,
          setIsOpen,
          confirmSelection,
          setDatePickerRange
        )
      }
      onSelectionChange={(keys: any) => {
        if (!confirmSelection) {
          const keysArray = Array.from(keys).filter(Boolean) as Key[];
          if (!keysArray || !keysArray[0]) return;
          onChange(isSingle ? keysArray[0] : keysArray);
        }
      }}
      startContent={hasDatePicker && <img src={CalendarIcon} />}
      renderValue={() =>
        getRenderValue(values, items, hasDatePicker, datePickerRange)
      }
    >
      {!isDatePickerOpen &&
        items.map((item: SelectItemType) => {
          const { value, label, options, downDivider } = item;

          if (!(options && hasCheckbox && isMultiple)) {
            return (
              <SelectItem
                textValue={value}
                className={`${downDivider ? itemDivider : ""} ${
                  hasCheckbox || hasRadio ? checkOrRadio : ""
                }`}
                key={value}
                value={value}
                aria-label={label}
              >
                <ItemContent value={value} label={label} />
              </SelectItem>
            );
          } else {
            return (
              <SelectSection
                key={value}
                onClick={() => handleSectionClick(options, value)}
                className={hasCheckbox ? section : ""}
                title={
                  hasCheckbox
                    ? ((
                        <Checkbox
                          onClick={() => handleSectionClick(options, value)}
                          value={value}
                          isSelected={Array.from(values).includes(value)}
                        >
                          {label}
                        </Checkbox>
                      ) as any)
                    : label
                }
              >
                {options.map(({ value: optionValue, label: optionLabel }) => (
                  <SelectItem
                    textValue={optionValue}
                    key={optionValue}
                    value={optionValue}
                    aria-label={optionLabel}
                  >
                    <ItemContent value={optionValue} label={optionLabel} />
                  </SelectItem>
                ))}
              </SelectSection>
            );
          }
        })}

      {confirmSelection &&
        ((
          <SelectItem
            textValue="actions"
            key="actions"
            value="actions"
            className={confirmActions}
          >
            <div>
              <Button onClick={handleConfirmChanges} text="Aplicar" />
              <Button
                onClick={handleResetChanges}
                variant="secondary"
                text="Restablecer"
              />
            </div>
          </SelectItem>
        ) as any)}

      {/* Append options which open date picker in different states if select has date picker */}
      {hasDatePicker &&
        !isDatePickerOpen &&
        ((
          <SelectItem textValue="actions" key="pick-month" value="pick-month">
            <span
              onClick={() => openDatePicker("MONTH")}
              className={datePickerOption}
            >
              Mensual <img src={ChevronIcon} />
            </span>
          </SelectItem>
        ) as any)}

      {hasDatePicker &&
        !isDatePickerOpen &&
        ((
          <SelectItem textValue="actions" key="pick-day" value="pick-day">
            <span
              onClick={() => openDatePicker("DAY")}
              className={datePickerOption}
            >
              Otro período <img src={ChevronIcon} />
            </span>
          </SelectItem>
        ) as any)}

      {/* Show actual date picker if open, no other options will be shown when open */}
      {isDatePickerOpen &&
        ((
          <SelectItem
            textValue="actions"
            key="date-picker"
            value="date-picker"
            className={datePicker}
          >
            <DatePicker
              onApply={onDatePickerApply}
              onDelete={onDatePickerDelete}
              onBack={() => {
                setIsDatePickerOpen(false);
              }}
              min={minDatePickerDate}
              defaultRange={datePickerRange}
              defaultCalendarVariant={datePickerInitialVariant}
            />
          </SelectItem>
        ) as any)}
    </NextUiSelect>
  );
};

export default InputSelect;
