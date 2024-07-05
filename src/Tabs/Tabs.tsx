import { Tabs as NextUiTabs, Tab } from "@nextui-org/tabs";
import { TabsProps } from "./types";
import styles from "./Tabs.module.scss";

const Tabs = ({
  colorVariant = "light_blue",
  handleChange,
  ...rest
}: TabsProps) => {
  const { cursor, cursorDark, ...restStyles } = styles;
  return (
    <NextUiTabs
      {...rest}
      onSelectionChange={handleChange ? (key) => handleChange(key) : undefined}
      aria-label="Tabs"
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
