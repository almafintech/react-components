import { useState } from "react";
import { ReactComponent as ChevronDown } from "../../assets/images/ui/icons/ui-icon-chevron-down.svg";
import { Button } from "../Button";
import styles from "./Data.module.scss";
import { DataProps } from "./types";

const DataStacked = ({
  label,
  labelEndContent,
  value,
  leadingIcon,
  trailingIcon,
  endContent,
  secondaryValue,
  action,
  className,
}: DataProps) => {
  const {
    stacked,
    label: labelClass,
    labelWrapper,
    stackedFirstLine,
    stackedValueContainer,
    stackedLeadingIcon,
    stackedValue,
    stackedTrailingIcon,
    stackedSecondaryValue,
  } = styles;

  return (
    <div className={`${stacked} ${className ?? ""}`}>
      <div className={labelWrapper}>
        <span className={labelClass}>{label}</span>
        {labelEndContent}
      </div>
      <div className={stackedFirstLine}>
        <div className={stackedValueContainer}>
          {leadingIcon && (
            <span
              className={stackedLeadingIcon}
              onClick={leadingIcon.onClick}
              role={leadingIcon.onClick ? "button" : undefined}
            >
              {leadingIcon.icon}
            </span>
          )}
          <span className={stackedValue}>{value}</span>
          {trailingIcon && (
            <span
              className={stackedTrailingIcon}
              onClick={trailingIcon.onClick}
              role={trailingIcon.onClick ? "button" : undefined}
            >
              {trailingIcon.icon}
            </span>
          )}
        </div>
        {endContent}
      </div>
      {secondaryValue && (
        <span className={stackedSecondaryValue}>{secondaryValue}</span>
      )}
      {action && <Button variant="tertiary" className="!w-fit !px-0" {...action} />}
    </div>
  );
};

const DataInline = ({
  label,
  value,
  labelEndContent,
  subItems,
  emphasis = false,
  className,
  _isSubItem = false,
}: DataProps & { _isSubItem?: boolean }) => {
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
    chevronOpen,
    value: valueClass,
    emphasis: emphasisClass,
    subItemValue,
  } = styles;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`${row} ${hasSubItems ? expandable : ""} ${_isSubItem ? subItemClass : ""} ${className ?? ""}`}
        onClick={hasSubItems ? () => setIsOpen((prev) => !prev) : undefined}
        role={hasSubItems ? "button" : undefined}
        aria-expanded={hasSubItems ? isOpen : undefined}
      >
        <div className={labelWrapper}>
          <span className={labelClass}>{label}</span>
          {labelEndContent}
          {hasSubItems && (
            <ChevronDown className={`${chevron} ${isOpen ? chevronOpen : ""}`} />
          )}
        </div>
        <span
          className={`${valueClass} ${emphasis ? emphasisClass : ""} ${_isSubItem ? subItemValue : ""}`}
        >
          {value}
        </span>
      </div>
      {hasSubItems && isOpen && (
        <div className={subItemsWrapper}>
          {subItems!.map((subItem, index) => (
            <Data key={index} {...subItem} _isSubItem />
          ))}
        </div>
      )}
    </div>
  );
};

const Data = ({
  variant = "inline",
  ...props
}: DataProps & { _isSubItem?: boolean }) => {
  if (variant === "stacked") return <DataStacked {...props} />;
  return <DataInline {...props} />;
};

export default Data;
