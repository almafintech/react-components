import { forwardRef } from "react";
import styles from "./Button.module.scss";
import { Button as HeroUIButton } from "@heroui/button";
import { LoadingDots } from "../LoadingDots";
import { ButtonProps } from "./types";
import { colors } from "../styles/variables";
import { isByma } from "../utils";

/**
 * Allow users to perform an action with a single click
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      isLoading,
      className,
      variant = "primary",
      size = "desktop",
      disableRipple = true,
      disableAnimation = true,
      theme,
      ...rest
    },
    ref
  ) => {
    const isBymaTheme = isByma(theme);

    const { primary, secondary, tertiary, loadingButton, mobileButton } =
      styles;
    const { white, primary300, bymaPrimaryDefault } = colors;

    const variantsStyles = {
      primary,
      secondary,
      tertiary,
    };

    const variantsLoadingStyles = {
      primary: white,
      secondary: isBymaTheme ? bymaPrimaryDefault : primary300,
      tertiary: isBymaTheme ? bymaPrimaryDefault : primary300,
    };

    return (
      <HeroUIButton
        {...rest}
        ref={ref} // Forward the ref to the HeroUIButton component
        aria-expanded="false"
        disableAnimation={disableAnimation}
        disableRipple={disableRipple}
        className={`${isBymaTheme ? "byma" : ""} ${variantsStyles[variant]} 
        ${isLoading ? loadingButton : ""} 
        ${size === "mobile" ? mobileButton : ""} 
        ${className || ""}`}
      >
        {isLoading ? (
          <LoadingDots color={variantsLoadingStyles[variant]} />
        ) : (
          text
        )}
      </HeroUIButton>
    );
  }
);

export default Button;
