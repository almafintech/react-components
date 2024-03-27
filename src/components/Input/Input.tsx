"use client";

import { InputProps, Input as NextUiInput } from "@nextui-org/react";
import HideIcon from "../../assets/images/ui/icons/ui-icon-hide-gray.svg";
import ShowIcon from "../../assets/images/ui/icons/ui-icon-show-gray.svg";
import InvalidIcon from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled.svg";
import SearchIcon from "../../assets/images/ui/icons/ui-icon-search-gray-outline.svg";
import styles from "./Input.module.scss";
import { ReactNode, useState } from "react";

/**
 * Extension to `InputProps`. See NextUI's `Input` documentation.
 * @prop {number} balance Number to show as remaining balance label on top-right edge.
 * @prop {string} [balanceCurrency="ARS"] Name of currency symbol which prefixes balance.
 * @prop {string} [currency="ARS"] Name of currency symbol which prefixes value when `type` is `money`.
 * @prop {ReactNode}[customInfo Element placed on top-right of input when `info` is set to `"CUSTOM"`.
 * @prop {ReactNode} errorMessage Element shown besides alert icon below input when `isInvalid` is set.
 * @prop {string} initialValue Initial value.
 * @prop {boolean} isFormField Uses form-style label if set.
 * @prop {boolean} isNumberPercentage Appends a percentage sign if set (`number` type only).
 * @prop {number} maxLength Length limit in characters.
 * @prop {"BALANCE" | "CUSTOM" } info Determines what to display on top-right section of input.
 * @prop {ReactNode} tooltip Unimplemented.
 * @prop {boolean} touched Whether input was touched or not. Set on `onChanged` calls.
 * @prop {"text" | "number" | "search" | "password" | "money"} [type="text"] Input type. `number` forces value to be a
 * 	valid float, `search` prepends a magnifying glass icon, `password` obfuscates value (user-toggelable) and `money`
 * 	prepends a currency symbol.
 */
interface Props extends InputProps {
  balance?: number;
  balanceCurrency?: string;
  currency?: string;
  customInfo?: ReactNode;
  errorMessage?: ReactNode;
  initialValue?: string;
  isFormField?: boolean;
  isNumberPercentage?: boolean;
  maxLength?: number;
  info?: "BALANCE" | "CUSTOM";
  tooltip?: ReactNode;
  touched?: boolean;
  type?: "text" | "number" | "search" | "password" | "money";
  hasLabel?: boolean;
}

/**
 * Text input component based on NextUI's `Input`
 * @returns
 */
const Input = (props: Props) => {
  const {
    initialValue,
    maxLength,
    errorMessage,
    balance,
    balanceCurrency = "ARS",
    isInvalid,
    isFormField,
    isNumberPercentage,
    label,
    endContent,
    startContent,
    type = "text",
    description,
    currency = "ARS",
    info,
    customInfo,
    hasLabel = true,
  } = props;

  const {
    base,
    input,
    inputWrapper,
    innerWrapper,
    label: labelStyle,
    helperWrapper,
    errorMessage: errorMessageStyle,
    description: descriptionStyle,
    startContent: startContentStyle,
    endContent: endContentStyle,
    error,
    icon,
    touched: touchedStyle,
    validated,
    balance: balanceStyle,
    number,
    formField,
    info: infoStyle,
    noLabel,
  } = styles;

  const thousandsSeparator = Number(1000).toLocaleString("es-AR").charAt(1);
  const decimalSeparator = Number(1.1).toLocaleString("es-AR").charAt(1);

  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(
    initialValue
      ? type === "money"
        ? initialValue?.replaceAll(".", ",")
        : initialValue
      : ""
  );
  const [touched, setTouched] = useState(false);

  const removeInputMoneyMask = (newValue: string) => {
    const floatRegex = new RegExp(`^$|^\\d+\\${decimalSeparator}?\\d?\\d?$`);
    const number = newValue.replaceAll(thousandsSeparator, "");
    if (floatRegex.exec(number)) {
      setValue(number);
      return number.replace(",", ".");
    }

    return newValue;
  };

  const onValueChange = (newValue: string) => {
    if (newValue.length < (maxLength ?? Infinity)) {
      switch (type) {
        case "number":
        case "money":
          removeInputMoneyMask(newValue);
          break;

        default:
          setValue(newValue);
      }
    }

    props.onValueChange && props.onValueChange(newValue);
  };

  const getCurrencySymbol = (locale: string, currency: string) => (
    <div className="pointer-events-none flex items-center">
      {(0)
        .toLocaleString(locale, {
          style: "currency",
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
        .replace(/\d/g, "")
        .trim()}
    </div>
  );

  const asMoney = (value: string) => {
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

  const getErrorMessage = () => (
    <div className={error}>
      <InvalidIcon className={icon} />
      {errorMessage ?? "Valor inválido"}
    </div>
  );

  const getEyeButton = () => (
    <button
      className="focus:outline-none"
      type="button"
      onClick={() => {
        setIsVisible(!isVisible);
      }}
    >
      {isVisible ? <ShowIcon /> : <HideIcon />}
    </button>
  );

  const getBalanceLabel = () => (
    <span className={balanceStyle}>
      Saldo disponible{" "}
      <span className={number}>
        {(balance ?? 0).toLocaleString("es-AR", {
          style: "currency",
          currency: balanceCurrency,
        })}
      </span>
    </span>
  );

  return (
    <NextUiInput
      labelPlacement="outside"
      variant="bordered"
      radius="sm"
      {...props}
      onKeyDown={(e) => {
        if (type === "number" && ["ArrowUp", "ArrowDown"].includes(e.key))
          e.preventDefault();
      }}
      onWheel={(e) => {
        const target = e.target as HTMLInputElement;
        target.blur();
      }}
      onChange={(e) => {
        if (type === "money")
          e.target.value = removeInputMoneyMask(e.target.value);
        setTouched(true);
        props.onChange && props.onChange(e);
      }}
      classNames={{
        base: `${base} ${!hasLabel && noLabel}`,
        input: input,
        inputWrapper: `${inputWrapper}  ${isInvalid === false && validated} ${
          (props.touched || touched) && touchedStyle
        }`,
        innerWrapper: innerWrapper,
        label: `${labelStyle} ${isFormField && formField} ${
          (props.touched || touched) && touchedStyle
        }`,
        helperWrapper: helperWrapper,
        errorMessage: errorMessageStyle,
        description: descriptionStyle,
        ...props.classNames,
      }}
      type={
        (props.type === "password" && isVisible) || props.type === "search"
          ? "text"
          : props.type
      }
      errorMessage={
        <>{isInvalid && (props.touched || touched) && getErrorMessage()}</>
      }
      description={!isInvalid && description}
      value={type === "money" ? asMoney(value) : props.value ?? value}
      onValueChange={onValueChange}
      startContent={
        <span className={startContentStyle}>
          {startContent}
          {type === "search" && <SearchIcon className={icon} />}
          {type === "money" &&
            (props.value || value) &&
            getCurrencySymbol("es-AR", currency)}
        </span>
      }
      endContent={
        <span className={endContentStyle}>
          {endContent}
          {type === "number" && isNumberPercentage && "%"}
          {type === "password" && getEyeButton()}
        </span>
      }
      label={
        <>
          <span>{label}</span>
          <span className={infoStyle}>
            {info === "BALANCE" && balance ? (
              getBalanceLabel()
            ) : info === "CUSTOM" && !!customInfo ? (
              customInfo
            ) : (
              <></>
            )}
          </span>
        </>
      }
    />
  );
};

export default Input;
