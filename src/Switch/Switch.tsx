import { colors } from "../styles/variables";
import { LoadingDots } from "../LoadingDots";
import { Switch as NextUiSwitch } from "@nextui-org/switch";
import { SwitchProps } from "./types";
import styles from "./Switch.module.scss";

const Switch = ({ isLoading, ...rest }: SwitchProps) => {
  const { wrapper, thumb, base, label } = styles;

  const { greyscale400 } = colors;

  return (
    <>
      {isLoading ? (
        <LoadingDots color={greyscale400} />
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
    </>
  );
};

export default Switch;
