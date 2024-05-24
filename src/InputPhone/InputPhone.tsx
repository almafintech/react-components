import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { InputPhoneProps } from "./types";

import ErrorIcon from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled.svg";

import "react-phone-input-2/lib/style.css";
import styles from "./InputPhone.module.scss";

const InputPhone = (props: InputPhoneProps) => {
  const {
    description,
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
    ...rest
  } = props;

  const {
    label,
    helperWrapper,
    description: descriptionStyle,
    formField,
    inputPhoneNumber,
    dropdownPhoneNumber,
    buttonPhoneNumber,
    success,
    error,
    error: errorWrapper,
    icon,
    errorMessage: errorMessageStyle,
  } = styles;

  const [inputTouched, setInputTouched] = useState(touched || false);

  const shouldValidate = inputTouched && isValid !== undefined;

  return (
    <div>
      <label className={`${label} ${isFormField ? formField : ""}`}>
        Teléfono
      </label>
      <PhoneInput
        {...rest}
        autoFormat={autoFormat}
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
      {shouldValidate && isValid === false && (
        <div className={`${errorWrapper} ${helperWrapper}`}>
          <img src={ErrorIcon} className={icon} />
          <span className={errorMessageStyle}>
            {errorMessage ?? "Valor inválido"}
          </span>
        </div>
      )}
    </div>
  );
};

export default InputPhone;
