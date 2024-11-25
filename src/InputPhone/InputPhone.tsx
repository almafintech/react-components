import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { InputPhoneProps } from "./types";

import ErrorIcon from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled.svg";
import ErrorIconByma from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled-byma.svg";

import "react-phone-input-2/lib/style.css";
import styles from "./InputPhone.module.scss";
import { isByma } from "../utils";
import InfoMessage from "../InfoMessage/InfoMessage";

const InputPhone = (props: InputPhoneProps) => {
  const {
    label,
    description,
    infoMessage,
    errorMessage,
    isFormField,
    inputClass,
    buttonClass,
    dropdownClass,
    country,
    onBlur,
    isValid,
    touched,
    autoFormat = false,
    name,
    theme,
    ...rest
  } = props;

  const isBymaTheme = isByma(theme);

  const {
    label: labelStyle,
    helperWrapper,
    description: descriptionStyle,
    formField,
    inputPhoneNumber,
    dropdownPhoneNumber,
    buttonPhoneNumber,
    success,
    error,
    icon,
    errorMessage: errorMessageStyle,
    containerInputClassName,
  } = styles;

  const [inputTouched, setInputTouched] = useState(touched || false);

  const shouldValidate =
    inputTouched && ((isValid === false && errorMessage) || isValid === true);

  return (
    <div className={isBymaTheme ? "byma" : ""}>
      <label className={`${labelStyle} ${isFormField ? formField : ""}`}>
        {label ?? "Teléfono"}
      </label>
      <PhoneInput
        {...rest}
        autoFormat={autoFormat}
        containerClass={containerInputClassName}
        country={country || "ar"}
        onBlur={(event, data) => {
          setInputTouched(true);
          onBlur && onBlur(event, data);
        }}
        inputClass={`${inputClass ?? ""} ${inputPhoneNumber} ${
          shouldValidate ? (isValid ? success : error) : ""
        }`}
        dropdownClass={`${dropdownClass ?? ""} ${dropdownPhoneNumber}`}
        buttonClass={`${buttonClass ?? ""} ${buttonPhoneNumber} ${
          shouldValidate ? (isValid ? success : error) : ""
        } `}
        inputProps={{ name }}
      />
      {description && (
        <div className={helperWrapper}>
          <span className={descriptionStyle}>{description}</span>
        </div>
      )}
      {infoMessage && !(shouldValidate && isValid === false) && (
        <InfoMessage
          isBymaTheme={isBymaTheme}
          message={infoMessage}
          className={helperWrapper}
        />
      )}
      {shouldValidate && isValid === false && (
        <div className={helperWrapper}>
          <img src={isBymaTheme ? ErrorIconByma : ErrorIcon} className={icon} />
          <span className={errorMessageStyle}>
            {errorMessage ?? "Valor inválido"}
          </span>
        </div>
      )}
    </div>
  );
};

export default InputPhone;
