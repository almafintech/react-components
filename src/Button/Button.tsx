import { forwardRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./Button.module.scss";
import { LoadingDots } from "../LoadingDots";
import { ButtonProps } from "./types";
import { colors } from "../styles/variables";
import { ReactComponent as Chevron } from "@arrows/chevron-white-down.svg";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      isLoading,
      className,
      variant = "primary",
      size = "medium",
      isDisabled,
      menu,
      leadingIcon,
      trailingIcon,
      ...rest
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const {
      contentContainer,
      primary,
      secondary,
      tertiary,
      loadingButton,
      smallButton,
      largeButton,
      menuButton,
      dropdownContent,
      dropdownItem,
    } = styles;
    const { white, primary300 } = colors;

    const variantStyles = { primary, secondary, tertiary };

    const loadingColors = {
      primary: white,
      secondary: `var(--primary-normal-300, ${primary300})`,
      tertiary: `var(--primary-normal-300, ${primary300})`,
    };

    const buttonStyles = [
      variantStyles[variant],
      isLoading ? loadingButton : "",
      size === "small" ? smallButton : "",
      size === "large" ? largeButton : "",
      menu ? menuButton : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const content = isLoading ? (
      <LoadingDots color={loadingColors[variant]} />
    ) : (
      <div className={contentContainer}>
        {leadingIcon}
        <p>{text}</p>
        {trailingIcon}
        {menu && !trailingIcon && <Chevron />}
      </div>
    );

    if (menu?.length) {
      return (
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger asChild>
            <button
              {...rest}
              ref={ref}
              disabled={isDisabled || isLoading}
              aria-busy={isLoading}
              className={buttonStyles}
            >
              {content}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={dropdownContent}
              sideOffset={4}
              align="start"
            >
              {menu.map((item, i) => (
                <DropdownMenu.Item
                  key={i}
                  className={dropdownItem}
                  onSelect={item.onClick}
                >
                  {item.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      );
    }

    return (
      <button
        {...rest}
        ref={ref}
        disabled={isDisabled || isLoading}
        aria-busy={isLoading}
        aria-haspopup={menu ? "menu" : undefined}
        className={buttonStyles}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
