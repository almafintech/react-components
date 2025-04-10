import { Tooltip as HeroUITooltip } from "@heroui/tooltip";
import { TooltipProps } from "./types";

import styles from "./Tooltip.module.scss";

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
    <HeroUITooltip
      classNames={tooltipVariants[variant]}
      style={{ width }}
      showArrow
      {...props}
    >
      {children}
    </HeroUITooltip>
  );
};

export default Tooltip;
