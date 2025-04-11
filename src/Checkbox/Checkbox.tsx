import { Checkbox as NextUICheckbox } from "@nextui-org/checkbox";
import { CheckboxProps } from "./types";
import { isByma } from "../utils";
import styles from "./Checkbox.module.scss";

/**
 * Allow users to to mark one individual item as selected
 */
const Checkbox = ({ children, classNames, theme, ...rest }: CheckboxProps) => {
  const isBymaTheme = isByma(theme);

  const { checkboxWrapper, checkboxLabel } = styles;

  return (
    <NextUICheckbox
      disableAnimation
      classNames={{
        ...classNames,
        wrapper: `${isBymaTheme ? "byma" : ""} ${checkboxWrapper} ${classNames?.wrapper ?? ""}`,
        label: `${checkboxLabel} ${classNames?.label ?? ""}`,
      }}
      {...rest}
    >
      {children}
    </NextUICheckbox>
  );
};

export default Checkbox;
