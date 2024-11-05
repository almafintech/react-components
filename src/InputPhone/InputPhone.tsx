import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { InputPhoneProps } from "./types";

import InfoIcon from "../../assets/images/ui/alert-icons/ui-alert-icon-info.svg";
import InfoIconByma from "../../assets/images/ui/alert-icons/ui-alert-icon-info-byma.svg";

import ErrorIcon from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled.svg";
import ErrorIconByma from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled-byma.svg";

import "react-phone-input-2/lib/style.css";
import styles from "./InputPhone.module.scss";
import { isByma } from "../utils";

const InputPhone = (props: InputPhoneProps) => {
  const {
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
    label,
    helperWrapper,
    description: descriptionStyle,
    infoMessage: infoMessageStyle,
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
      <label className={`${label} ${isFormField ? formField : ""}`}>
        Teléfono
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
        <div className={helperWrapper}>
          <img src={isBymaTheme ? InfoIconByma : InfoIcon} className={icon} />
          <span className={infoMessageStyle}>{infoMessage}</span>
        </div>
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
