import { Key } from "react"
import { TabsProps as NextTabsProps } from "@nextui-org/tabs"

type TabOption = {
    id: string
    label: string
    content?: React.ReactNode
}
  
export interface TabsProps extends NextTabsProps<TabOption> {
    handleChange?: (key: Key) => void
    colorVariant?: "light_blue" | "dark_blue"
}