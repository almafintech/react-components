import { Tabs as HeroUITabs, Tab } from "@heroui/tabs";
import { TabsProps } from "./types";
import styles from "./Tabs.module.scss";
import { isByma } from "../utils";

const Tabs = ({
  colorVariant = "light_blue",
  handleChange,
  theme,
  variant,
  ...rest
}: TabsProps) => {
  const {
    cursor,
    cursorDark,
    cursorUnderlined,
    tabContent,
    tabContentUnderlined,
    ...restStyles
  } = styles;

  const isBymaTheme = isByma(theme);

  return (
    <HeroUITabs
      {...rest}
      onSelectionChange={handleChange ? (key) => handleChange(key) : undefined}
      aria-label="Tabs"
      variant={variant}
      className={`${isBymaTheme ? "byma" : ""}`}
      classNames={{
        ...restStyles,
        tabContent:
          variant === "underlined" ? tabContentUnderlined : tabContent,
        cursor:
          variant === "underlined"
            ? cursorUnderlined
            : colorVariant === "light_blue"
              ? cursor
              : cursorDark,
      }}
    >
      {(item) => (
        <Tab data-hover-unselected="false" key={item.id} title={item.label}>
          {item.content}
        </Tab>
      )}
    </HeroUITabs>
  );
};

export default Tabs;
