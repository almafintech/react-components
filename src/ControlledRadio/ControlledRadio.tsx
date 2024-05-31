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
    onChange && onChange(event.target.value);
  };

  return (
    <label className={`${radioLabel} ${disabled ? labelDisabled : ""}`}>
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={handleChange}
        className={`${inputRadio} ${className ?? ""}`}
        disabled={disabled}
        onBlur={(e) => onBlur && onBlur(e.target.value)}
      />
      {label}
    </label>
  );
};

export default ControlledRadio;
