import { ControlledRadioProps } from "./types";
import styles from "./ControlledRadio.module.scss";

/**
 *  Allow users to select a single item
 */
const ControlledRadio = ({
  className,
  label,
  value,
  name,
  checked,
  onChange,
  disabled,
  onBlur,
}: ControlledRadioProps) => {
  const { inputRadio, radioLabel, labelDisabled } = styles;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(event);
  };

  return (
    <label className={`${radioLabel} ${disabled ? labelDisabled : ""}`}>
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        className={`${inputRadio} ${className ?? ""}`}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {label}
    </label>
  );
};

export default ControlledRadio;
