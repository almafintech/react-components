"use client";

import { useState } from "react";
import { Input as NextUiInput } from "@nextui-org/react";
import { InputProps } from "./types";

import HideIcon from "../../assets/images/ui/icons/ui-icon-hide-gray.svg";
import ShowIcon from "../../assets/images/ui/icons/ui-icon-show-gray.svg";
import InvalidIcon from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled.svg";
import SearchIcon from "../../assets/images/ui/icons/ui-icon-search-gray-outline.svg";

import styles from "./Input.module.scss";

/**
 * Text input component based on NextUI's `Input`
 */
const Input = (props: InputProps) => {
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
      <img src={InvalidIcon} className={icon} />
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
      {isVisible ? <img src={ShowIcon} /> : <img src={HideIcon} />}
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
        props.onKeyDown && props.onKeyDown(e);
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
      onBlur={(e) => {
        setTouched(true);
        props.onBlur && props.onBlur(e);
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
        isInvalid && (props.touched || touched) && <>{getErrorMessage()}</>
      }
      description={!isInvalid && description}
      value={type === "money" ? asMoney(value) : props.value ?? value}
      onValueChange={onValueChange}
      startContent={
        <span className={startContentStyle}>
          {startContent}
          {type === "search" && <img src={SearchIcon} className={icon} />}
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
