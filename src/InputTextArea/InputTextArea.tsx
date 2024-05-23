import styles from "../Input/Input.module.scss";
import { Textarea } from "@nextui-org/input";
import { useState } from "react";
import InvalidIcon from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled.svg";
import { InputTextAreaProps } from "./types";

const InputTextArea = (props: InputTextAreaProps) => {
  const {
    base,
    input,
    inputWrapper,
    label: labelStyle,
    errorMessage: errorMessageStyle,
    error,
    icon,
    touched: touchedStyle,
    validated,
    formField,
  } = styles;

  const {
    initialValue,
    maxLength,
    errorMessage,
    isInvalid,
    isFormField,
    onChange,
    onBlur,
  } = props;

  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(initialValue ?? "");

  const onValueChange = (newValue: string) => {
    if (newValue.length <= (maxLength ?? Infinity)) setValue(newValue);

    props.onValueChange && props.onValueChange(newValue);
  };

  const getErrorMessage = () => (
    <div className={error}>
      <img src={InvalidIcon} className={icon} />
      {errorMessage ?? "Valor inválido"}
    </div>
  );

  return (
    <Textarea
      labelPlacement="outside"
      variant="bordered"
      radius="sm"
      {...props}
      classNames={{
        base: `${base}`,
        input: input,
        inputWrapper: `${inputWrapper}  ${isInvalid === false && validated} ${
          (props.touched || touched) && touchedStyle
        }`,
        label: `${labelStyle} ${isFormField && formField} ${
          (props.touched || touched) && touchedStyle
        }`,
        errorMessage: errorMessageStyle,
        ...props.classNames,
      }}
      value={props.value ?? value}
      onKeyDown={(e) => {
        props.onKeyDown && props.onKeyDown(e);
      }}
      onWheel={(e) => {
        const target = e.target as HTMLInputElement;
        target.blur();
      }}
      onChange={(e) => {
        setTouched(true);
        if (props.value && props.value?.length < Number(e.target.value))
          onChange && onChange(e);
      }}
      onBlur={(e) => {
        setTouched(true);
        onBlur && onBlur(e);
      }}
      onValueChange={onValueChange}
      errorMessage={
        isInvalid && (props.touched || touched) && <>{getErrorMessage()}</>
      }
    />
  );
};

export default InputTextArea;
