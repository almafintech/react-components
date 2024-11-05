import { Tabs as NextUiTabs, Tab } from "@nextui-org/tabs";
import { TabsProps } from "./types";
import styles from "./Tabs.module.scss";
import { isByma } from "../utils";

const Tabs = ({
  colorVariant = "light_blue",
  handleChange,
  theme,
  ...rest
}: TabsProps) => {
  const { cursor, cursorDark, ...restStyles } = styles;

  const isBymaTheme = isByma(theme);

  return (
    <NextUiTabs
      {...rest}
      onSelectionChange={handleChange ? (key) => handleChange(key) : undefined}
      aria-label="Tabs"
      className={`${isBymaTheme ? "byma" : ""}`}
      classNames={{
        ...restStyles,
        cursor: colorVariant === "light_blue" ? cursor : cursorDark,
      }}
    >
      {(item) => (
        <Tab data-hover-unselected="false" key={item.id} title={item.label}>
          {item.content}
        </Tab>
      )}
    </NextUiTabs>
  );
};

export default Tabs;
