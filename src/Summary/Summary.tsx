import { useState } from "react";
import { ReactComponent as ChevronDown } from "../../assets/images/ui/icons/ui-icon-chevron-down.svg";
import styles from "./Summary.module.scss";
import { SummaryItem, SummaryProps } from "./types";

const SummaryRow = ({
  label,
  value,
  labelEndContent,
  subItems,
  className,
  isTotal = false,
  isSubItem = false,
}: SummaryItem & { isTotal?: boolean; isSubItem?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = !!subItems?.length;

  const {
    row,
    expandable,
    subItem: subItemClass,
    subItemsWrapper,
    labelWrapper,
    label: labelClass,
    chevron,
    value: valueClass,
    totalValue,
    subItemValue,
  } = styles;

  return (
    <>
      <div
        className={`${row} ${hasSubItems ? expandable : ""} ${isSubItem ? subItemClass : ""} ${className ?? ""}`}
        onClick={hasSubItems ? () => setIsOpen((prev) => !prev) : undefined}
        role={hasSubItems ? "button" : undefined}
        aria-expanded={hasSubItems ? isOpen : undefined}
      >
        <div className={labelWrapper}>
          <span className={labelClass}>{label}</span>
          {labelEndContent}
          {hasSubItems && (
            <ChevronDown
              className={`${chevron} ${isOpen ? styles.chevronOpen : ""}`}
            />
          )}
        </div>
        <span className={`${valueClass} ${isTotal ? totalValue : ""} ${isSubItem ? subItemValue : ""}`}>
          {value}
        </span>
      </div>
      {hasSubItems && isOpen && (
        <div className={subItemsWrapper}>
          {subItems!.map((subItem, index) => (
            <SummaryRow key={index} {...subItem} isSubItem />
          ))}
        </div>
      )}
    </>
  );
};

const Summary = ({ items, total, className }: SummaryProps) => {
  const { container, divider } = styles;

  return (
    <div className={`${container} ${className ?? ""}`}>
      {items.map((item, index) => (
        <SummaryRow key={index} {...item} isTotal={items.length === 1 && !total} />
      ))}
      {total && (
        <>
          <hr className={divider} />
          <SummaryRow {...total} isTotal />
        </>
      )}
    </div>
  );
};

export default Summary;
