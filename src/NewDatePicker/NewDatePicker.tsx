import { useEffect, useState } from "react";
import { DatePicker as HeroUiDatePicker } from "@heroui/date-picker";
import { InfoMessage } from "../InfoMessage";
import { fromDate, getLocalTimeZone } from "@internationalized/date";
import { NewDatePickerProps } from "./types";

import InvalidIcon from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled.svg";

import styles from "./NewDatePicker.module.scss";

const parseDefaultValue = (
  defaultValue: NewDatePickerProps["defaultValue"]
) => {
  if (defaultValue instanceof Date) {
    return fromDate(defaultValue, getLocalTimeZone());
  }

  return defaultValue;
};

const NewDatePicker = (props: NewDatePickerProps) => {
  const {
    className,
    hasLabel = true,
    isInvalid,
    touched: isTouched,
    isFormField,
    errorMessage,
    description,
    infoMessage,
    label,
    customInfo,
    defaultValue,
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
    error,
    icon,
    touched: touchedStyle,
    validated,
    formField,
    info: infoStyle,
    noLabel,
    calendarIcon,
    focus,
  } = styles;

  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (isTouched !== undefined) {
      setTouched(isTouched);
    }
  }, [isTouched]);

  const getErrorMessage = () => (
    <div className={error}>
      <img src={InvalidIcon} className={icon} />
      {errorMessage ?? "Valor inválido"}
    </div>
  );

  return (
    <>
      <HeroUiDatePicker
        {...props}
        granularity="day"
        defaultValue={parseDefaultValue(defaultValue)}
        labelPlacement="outside"
        variant="bordered"
        radius="sm"
        className={`${className ?? ""}`}
        classNames={{
          base: `${base} ${!hasLabel && noLabel}`,
          input: input,
          inputWrapper: `${inputWrapper} ${focused && focus} ${isInvalid === false && touched && validated} ${
            touched && touchedStyle
          }`,
          innerWrapper: innerWrapper,
          label: `${labelStyle} ${isFormField && formField} ${touched && touchedStyle}`,
          helperWrapper: helperWrapper,
          errorMessage: errorMessageStyle,
          description: descriptionStyle,
          selectorIcon: calendarIcon,
          ...props.classNames,
        }}
        onFocusChange={(isFocused) => {
          setFocused(isFocused);
        }}
        onBlur={(e) => {
          setTouched(true);
          props.onBlur && props.onBlur(e);
        }}
        errorMessage={isInvalid && touched && <>{getErrorMessage()}</>}
        description={!isInvalid && description}
        label={
          <>
            <span>{label}</span>
            <span className={infoStyle}>{!!customInfo && customInfo}</span>
          </>
        }
      />
      {infoMessage && !(isInvalid && touched) && (
        <InfoMessage
          message={infoMessage}
          className={`${helperWrapper} flex gap-2 items-center`}
        />
      )}
    </>
  );
};

export default NewDatePicker;
