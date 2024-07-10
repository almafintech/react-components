"use client";

import { useEffect, useState } from "react";
import { Input as NextUiInput } from "@nextui-org/react";
import { InputProps } from "./types";

import HideIcon from "../../assets/images/ui/icons/ui-icon-hide-gray.svg";
import ShowIcon from "../../assets/images/ui/icons/ui-icon-show-gray.svg";
import InvalidIcon from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled.svg";
import SearchIcon from "../../assets/images/ui/icons/ui-icon-search-gray-outline.svg";

import styles from "./Input.module.scss";
import { getValue, removeMask } from "./utils";

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

  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(initialValue || props.value || "");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (typeof props.value === "string") {
      setValue(props.value as string);
    }
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let maskedValue = e.target.value;

    const unmaskedValue = removeMask(maskedValue, type);

    if (unmaskedValue.length <= (maxLength ?? Infinity)) {
      // Save unmasked value to state
      setValue(unmaskedValue);

      const event = { ...e };
      // Send unmasked value to event in onChange
      event.target.value = unmaskedValue;

      props.onChange && props.onChange(event);
    }
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
      disableAutosize
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
      onChange={handleChange}
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
        (props.type === "password" && isVisible) ||
        props.type === "search" ||
        props.type === "money" ||
        props.type === "cuit" ||
        props.type === "dni"
          ? "text"
          : props.type
      }
      errorMessage={
        isInvalid && (props.touched || touched) && <>{getErrorMessage()}</>
      }
      description={!isInvalid && description}
      // Mask the value to show
      value={
        ["money", "cuit", "dni"].includes(type) ? getValue(type, value) : value
      }
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
