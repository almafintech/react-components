import styles from "./ControlledRadio.module.scss"

interface Props {
  className?: string
  label: string
  value: string
  name: string
  checked: boolean
  onChange?: (value: string) => void
}

const ControlledRadio = ({
  className,
  label,
  value,
  name,
  checked,
  onChange,
}: Props) => {
  const { inputRadio, radioLabel } = styles

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value)
  }

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
  )
}

export default ControlledRadio
