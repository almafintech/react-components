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
}: ControlledRadioProps) => {
  const { inputRadio, radioLabel } = styles;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };

  return (
    <label className={radioLabel}>
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={handleChange}
        className={`${inputRadio} ${className ?? ""}`}
      />
      {label}
    </label>
  );
};

export default ControlledRadio;
