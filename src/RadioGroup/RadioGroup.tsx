import { useEffect, useState } from "react";
import { ControlledRadio } from "../ControlledRadio";
import { RadioGroupProps } from "./types";
import styles from "./RadioGroup.module.scss";
import Message from "../Message/Message";
const RadioGroup = ({
  options,
  label,
  disabled,
  error,
  onChange,
}: RadioGroupProps) => {
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

  const handleChange = (value: string) => {
    setOptionSelected(value);
    onChange && onChange(value);
  };

  return (
    <div className={radioGroupContainer}>
      {/* LABEL */}
      {label && <label className={radioGroupLabel}>{label}</label>}

      {/* OPTONS */}
      <div className={`${optionsContainer}`}>
        {options.map(
          ({ label, value, disabled: individualDisabled }, index) => (
            <ControlledRadio
              key={index}
              checked={optionSelected === value}
              label={label}
              name={`controlledRadio${value}`}
              onChange={handleChange}
              value={value}
              disabled={disabled || individualDisabled}
            />
          )
        )}
      </div>

      {/* SHOW ERROR MESSAGE */}
      {error && <Message message={error} variant="error" />}
    </div>
  );
};

export default RadioGroup;
