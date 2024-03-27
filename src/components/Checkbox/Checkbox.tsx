import { CheckboxProps, Checkbox as NextUICheckbox } from "@nextui-org/checkbox"
import styles from "./Checkbox.module.scss"

const Checkbox = ({ children, classNames, ...rest }: CheckboxProps) => {
  const { checkboxWrapper, checkboxLabel } = styles
  return (
    <NextUICheckbox
      disableAnimation
      classNames={{
        ...classNames,
        wrapper: `${checkboxWrapper} ${classNames?.wrapper ?? ""}`,
        label: `${checkboxLabel} ${classNames?.label ?? ""}`,
      }}
      {...rest}
    >
      {children}
    </NextUICheckbox>
  )
}

export default Checkbox
