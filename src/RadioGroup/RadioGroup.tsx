import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { ControlledRadio } from "../ControlledRadio";
import { RadioGroupProps } from "./types";
import styles from "./RadioGroup.module.scss";
import Message from "../Message/Message";
import { isByma } from "../utils";

const RadioGroup = ({
  options,
  label,
  disabled,
  error,
  onChange,
  onBlur,
  name,
  value,
  theme,
}: RadioGroupProps) => {
  const isBymaTheme = isByma(theme);

  const { radioGroupContainer, radioGroupLabel, optionsContainer } = styles;
  const [optionSelected, setOptionSelected] = useState<string>("");

  useEffect(() => {
    const optionWithInitialChecked = options.find(
      ({ initialChecked }) => initialChecked
    );
    if (optionWithInitialChecked) {
      setOptionSelected(optionWithInitialChecked.value);
    }
  }, [options]);

  useEffect(() => {
    setOptionSelected(value ?? "");
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptionSelected(event.target.value);
    onChange && onChange(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
    onBlur && onBlur(event);
  };

  return (
    <div className={`${isBymaTheme ? "byma" : ""}  ${radioGroupContainer}`}>
      {/* LABEL */}
      {label && <label className={radioGroupLabel}>{label}</label>}

      {/* OPTONS */}
      <div className={`${optionsContainer}`}>
        {options.map(
          ({ label, value, disabled: individualDisabled }, index) => (
            <ControlledRadio
              theme={theme}
              key={index}
              checked={optionSelected === value}
              label={label}
              name={name ?? `controlledRadio${value}`}
              value={value}
              disabled={disabled || individualDisabled}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )
        )}
      </div>

      {/* SHOW ERROR MESSAGE */}
      {error && <Message theme={theme} message={error} variant="error" />}
    </div>
  );
};

export default RadioGroup;
