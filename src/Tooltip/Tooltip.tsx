
import { Tooltip as NextUiTooltip} from "@nextui-org/tooltip"
import { TooltipProps } from "./types"

import styles from "./Tooltip.module.scss"

const Tooltip = (props: TooltipProps) => {
  const {
    baseBlueVariant,
    contentBlueVariant,
    baseBlackVariant,
    contentBlackVariant,
    baseWhiteVariant,
    contentWhiteVariant,
  } = styles

  const { children, variant = "black", width } = props

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
  }

  return (
    <NextUiTooltip classNames={tooltipVariants[variant]} style={{ width }} showArrow {...props}>
      {children}
    </NextUiTooltip>
  )
}

export default Tooltip
