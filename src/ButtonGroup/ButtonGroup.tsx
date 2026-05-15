import { useRef } from "react";
import Button from "../Button/Button";
import { ButtonGroupProps } from "./types";
import styles from "./ButtonGroup.module.scss";

const ButtonGroup = ({
  primary,
  secondary,
  tertiary,
  container,
  moreOptions,
  hasElevation,
  align = "right",
  layout = "horizontal",
  invertOrder,
  containerClassName: customContainerClassName,
  buttonsContainerClassName: customButtonsContainerClassName,
}: ButtonGroupProps) => {
  const primaryRef = useRef<HTMLButtonElement | null>(null);
  const secondaryRef = useRef<HTMLButtonElement | null>(null);
  const tertiaryRef = useRef<HTMLButtonElement | null>(null);

  const {
    container: containerClass,
    visibleContainer,
    mainButtonsContainer,
    moreOptionsContainer,
    moreOptionsEnd,
    elevation,
    alignLeft,
    alignCenter,
    alignRight,
    layoutVertical,
  } = styles;

  const alignClass = {
    left: alignLeft,
    center: alignCenter,
    right: alignRight,
  }[align];

  const layoutClass = layout === "vertical" ? layoutVertical : "";
  const isLeft = align === "left";

  const buttons = isLeft ? (
    <>
      {primary && <Button variant="primary" {...primary} ref={primaryRef} />}
      {secondary && (
        <Button variant="secondary" {...secondary} ref={secondaryRef} />
      )}
      {tertiary && (
        <Button variant="tertiary" {...tertiary} ref={tertiaryRef} />
      )}
    </>
  ) : (
    <>
      {tertiary && (
        <Button variant="tertiary" {...tertiary} ref={tertiaryRef} />
      )}
      {secondary && (
        <Button variant="secondary" {...secondary} ref={secondaryRef} />
      )}
      {primary && <Button variant="primary" {...primary} ref={primaryRef} />}
    </>
  );

  return (
    <div
      className={`${containerClass} ${alignClass} ${layoutClass} ${container ? visibleContainer : ""} ${hasElevation ? elevation : ""} ${customContainerClassName || ""}`}
    >
      {!isLeft && moreOptions && (
        <div className={moreOptionsContainer}>{moreOptions}</div>
      )}
      <div
        className={`${mainButtonsContainer} ${layoutClass} ${invertOrder ? styles.invertOrder : ""} ${customButtonsContainerClassName || ""}`}
      >
        {buttons}
      </div>
      {isLeft && moreOptions && (
        <div className={`${moreOptionsContainer} ${moreOptionsEnd}`}>
          {moreOptions}
        </div>
      )}
    </div>
  );
};

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
