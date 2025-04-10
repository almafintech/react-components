import { Checkbox as HeroUICheckbox } from "@heroui/checkbox";
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
    <HeroUICheckbox
      disableAnimation
      classNames={{
        ...classNames,
        wrapper: `${isBymaTheme ? "byma" : ""} ${checkboxWrapper} ${classNames?.wrapper ?? ""}`,
        label: `${checkboxLabel} ${classNames?.label ?? ""}`,
      }}
      {...rest}
    >
      {children}
    </HeroUICheckbox>
  );
};

export default Checkbox;
