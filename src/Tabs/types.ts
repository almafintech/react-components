import { Key } from "react";
import { TabsProps as NextTabsProps } from "@heroui/tabs";
import { WithTheme } from "..";

type TabOption = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

export interface TabsProps extends NextTabsProps<TabOption>, WithTheme {
  handleChange?: (key: Key) => void;
  colorVariant?: "light_blue" | "dark_blue" | "normal";
}
