import { Tooltip as NextUiTooltip } from "@nextui-org/tooltip";
import { TooltipProps } from "./types";

import styles from "./Tooltip.module.scss";
import { isByma } from "../utils";

const Tooltip = (props: TooltipProps) => {
  const {
    baseBlueVariant,
    contentBlueVariant,
    baseBlackVariant,
    contentBlackVariant,
    baseWhiteVariant,
    contentWhiteVariant,
    baseBymaVariant,
    contentBymaVariant,
  } = styles;

  const { children, variant = "black", width } = props;

  const tooltipVariants = {
    blue: {
      base: baseBlueVariant,
      content: contentBlueVariant,
    },
    black: {
      base: baseBlackVariant,
      content: contentBlackVariant,
    },
    white: {
      base: baseWhiteVariant,
      content: contentWhiteVariant,
    },
    byma: {
      base: baseBymaVariant,
      content: contentBymaVariant,
    },
  };

  return (
    <NextUiTooltip
      classNames={tooltipVariants[variant]}
      style={{ width }}
      showArrow
      {...props}
    >
      {children}
    </NextUiTooltip>
  );
};

export default Tooltip;
