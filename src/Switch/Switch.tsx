import { colors } from "../styles/variables";
import { LoadingDots } from "../LoadingDots";
import { Switch as NextUiSwitch } from "@nextui-org/switch";
import { SwitchProps } from "./types";
import { isByma } from "../utils";

import styles from "./Switch.module.scss";

const Switch = ({ isLoading, theme, ...rest }: SwitchProps) => {
  const isBymaTheme = isByma(theme);

  const { wrapper, thumb, base, label } = styles;

  const { greyscale400 } = colors;

  return (
    <div className={`${isBymaTheme ? "byma" : ""}`}>
      {isLoading ? (
        <LoadingDots theme={theme} color={greyscale400} />
      ) : (
        <NextUiSwitch
          {...rest}
          classNames={{
            base: base,
            wrapper: wrapper,
            thumb: thumb,
            label: label,
          }}
        />
      )}
    </div>
  );
};

export default Switch;
